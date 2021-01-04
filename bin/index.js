#!/usr/bin/env node
const program = require('commander')
program.version(require('../package.json').version)

program
    .command('init <name>')
    .description('init project ')
    .action(name => { // 执行命令后需要做什么
        console.log('init ' + name)
        require('../lib/init')(name)
    })

program.parse(process.argv)