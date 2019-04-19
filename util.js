// 删除空白字符
export const stripSpaceCharacter = (str: string): string => {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}
