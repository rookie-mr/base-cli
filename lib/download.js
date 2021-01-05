const { promisify } = require('util')
module.exports.clone = async function (repo, desc) {
    const download = promisify(require('download-git-repo')) // 从Github克隆代码
    const ora = require('ora') // 进度条效果
    const process = ora(`下载：${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed()
}

module.exports.spawn = async (...args) => { // 创建子进程并将子进程输出到主进程，安装项目依赖
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}