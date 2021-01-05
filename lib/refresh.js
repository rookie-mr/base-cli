const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))

module.exports = async () => {
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== '') // 排除
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }))
    
        // 生成路由定义
        compile({list}, './src/router.js', './template/router.js.hbs')

        // 生成菜单
        compile({list}, './src/App.vue', './template/App.vue.hbs')

        /**
         * 模板编译
         * @param {*} meta 数据定义
         * @param {*} filePath 
         * @param {*} templatePath 
         */
        function compile(meta, filePath, templatePath) {
            if (fs.existsSync(templatePath)) {
                const content = fs.readFileSync(templatePath).toString()
                const result = handlebars.compile(content)(meta)
                fs.writeFileSync(filePath, result)
                log(`${filePath} 创建成功`)
            }
        }
}