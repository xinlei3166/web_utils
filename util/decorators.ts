import { refreshToken } from '@/utils/token'
import Vue from 'vue'
import router from '@/router'

export function checkToken() {
    return function inner(target, key, descriptor) {
        const method = descriptor.value
        descriptor.value = async (...args) => {
            const coro = args[0]    // 异步函数
            const coroArgs = args.slice(1)  // 异步函数参数
            let data = await coro(...coroArgs)    // 获取数据
            if (data) {
                switch (data.code) {
                    case 'AccessTokenExpires':
                        const ret = await refreshToken()
                        if (ret) {
                            data = await coro(...coroArgs)
                            return method.apply(target, [data])
                        } else {
                            Vue.prototype.$Message.error({content: '登录信息已过期，请重新登录', duration: 2})
                            router.push('/login')
                        }
                        break
                    case 'TokenFormatError':
                        Vue.prototype.$Message.error({content: '身份状态失效', duration: 2})
                        router.push('/login')
                        break
                    default:
                        return method.apply(target, [data])
                }
            }
        }
        return descriptor;
    }
}

const CheckToken2 = () => {
    return (target: any, name: any, descriptor: any) => {
        let method = descriptor.value
        descriptor.value = async (...arg:any) => {
            let res = await method(...arg)
            if (res.code.includes('ACCESS_TOKEN_EXPIRES')) { // token失效
                let refreshData = await refreshToken()
                if (refreshData.code === 'SUCCESS') { // 成功获取新的token
                    let token = Store.state.token
                    token.access_token = refreshData.data.access_token
                    Store.commit('changeToken', token)
                    return method.apply(target, arg) // 再次执行
                } else {
                    Message.error('重新登录')
                    router.push('/login')
                    return false
                }
            } else { // 如果没失效 直接返回结果
                return res
            }
        }
        return descriptor
    }
};

