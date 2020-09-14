
//扫描当前目录，导入路由
var fs = require('fs')
module.exports = function (app) {
    fs.readdirSync(__dirname)
        .filter(item => item.endsWith('.js'))
        .forEach(f => {
            if (f !== 'router.js') {
                var router = require(__dirname + '/' + f)
                app.use(router.routes())
            }
        })
}
