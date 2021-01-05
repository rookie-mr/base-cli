const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone, spawn } = require('./download')

module.exports = async name => {
    clear()
    const data = await figlet('Welcome !')
    log(data)

    // clone
    log(`创建项目：${name}`)
    await clone('github:rookie-mr/base-cli', name)
    log(`√创建成功！`)

    // 自动安装依赖 Windows系统下需执行npm.cmd
    log(`安装依赖`)
    await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${name}` })
    log(`√安装完成！`)
}