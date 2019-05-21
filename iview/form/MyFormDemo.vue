<template>
    <MyForm :labelWidth="labelWidth" :items="items" :form="form" :rules="rules" @on-submit="onSubmit"></MyForm>
</template>

<script>
    import Vue from 'vue'
    import Component from "vue-class-component";
    import MyForm from '@/components/form/MyForm'

    @Component({
        components: {MyForm}
    })
    export default class MyFormDemo extends Vue {

        labelWidth = 150;
        itemWidth = '45%';

        items = [
            {
                itemType: 'Input',   // Input Or Select Or DatetimePicker...
                itemWidth: this.itemWidth,    // formitem宽度
                prop: 'name',   // prop and v-model
                label: '用户姓名',
                type: 'text',   // itemType为Input时，需定义此字段
                placeholder: '',
            },
            {
                itemType: 'Input',
                itemWidth: this.itemWidth,
                prop: 'name',
                label: '用户类型',
                type: 'text',
                placeholder: '',
            },
            {
                itemType: 'Select',
                itemWidth: this.itemWidth,    // 表单标签宽度
                prop: 'status',
                label: '用户标识',
                placeholder: '',
                multiple: false, // itemType为Select时，需定义此字段
                options: [
                    {name: '普通', value: 1},
                    {name: '黄金', value: 0},
                    {name: '钻石', value: 2}
                ], // itemType为Select时，需定义此字段
            },
            {
                itemType: 'Input',
                itemWidth: this.itemWidth,
                prop: 'name',
                label: '用户电话',
                type: 'text',
                placeholder: '',
            },
            {
                itemType: 'Input',
                itemWidth: this.itemWidth,
                prop: 'name',
                label: '用户手机号',
                type: 'text',
                placeholder: '',
            },
            {
                itemType: 'Input',
                itemWidth: '90%',
                prop: 'name',
                label: '文章标题',
                type: 'text',
                placeholder: '',
            },
            {
                itemType: 'Input',
                itemWidth: '90%',
                prop: 'name',
                label: '文章内容',
                type: 'textarea',
                placeholder: '',
            },
        ];

        form = {
            name: "",
            serial: null,
            status: 1
        };

        rules = {
            name: [
                {required: true, message: "用户名不能为空", trigger: "blur"},
            ],
            password: [
                {required: true, message: "密码不能为空", trigger: "blur"},
                {type: "string", min: 6, max: 20, message: "密码最小长度为6, 最大长度为20", trigger: "blur"},
            ],
            phone: [
                {
                    validator: (rule, value, callback) => {
                        if (value !== "") {
                            const reg = /^1[356789]\d{9}/;
                            if (!reg.test(value)) {
                                callback(new Error("请输入11位合法手机号"));
                            }
                            callback()
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur"
                }
            ],
            email: [
                {
                    validator: (rule, value, callback) => {
                        if (value !== "") {
                            const reg = /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
                            if (!reg.test(value)) {
                                callback(new Error("请输入正确的邮箱地址"));
                            }
                            callback()
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur"
                }
            ]
        };

        onSubmit(boolean) {
            console.log(boolean)
        }
    }
</script>

<style lang="stylus" scoped>
    >>> .ivu-tooltip:hover
        .ivu-icon
            color #2d8cf0 !important
    >>> .ivu-modal-body
        padding 0 16px
    .menu
        margin-bottom 10px
</style>

