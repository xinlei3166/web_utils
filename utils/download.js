const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const download = async (href, name) => {
  const a = document.createElement('a')
  a.download = name
  a.href = href
  a.click()
  await delay(100)
  a.remove()
}

// 批量下载文件
export default async (files, options = { hrefKey: 'href', nameKey: 'name' }) => {
  const { hrefKey, nameKey } = options
  for (const [index, file] of files.entries()) {
    await delay(index * 1000)
    await download(file[hrefKey], file[nameKey])
  }
}
