const { promisify } = require('util')
module.exports.clone = async function(repo, desc) {
    const download = promisify(require('download-git-repo')) // 从Github克隆代码
    const ora = require('ora') // 进度条效果
    const process = ora(`下载......${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed()
}