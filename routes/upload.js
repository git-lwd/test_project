const router = require('koa-router')()
const multer = require('koa-multer');
const path = require('path')
class UploadRoutes {
    static initRoutes() {
        var storage = multer.diskStorage({
            //文件保存路径
            destination: function (req, file, cb) {
                let filepath = path.join(__dirname, '../public/uploads/');

                cb(null, filepath)  //注意路径必须存在
            },
            //修改文件名称
            filename: function (req, file, cb) {
                var fileFormat = (file.originalname).split(".");
                cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        })
        //加载配置
        var upload = multer({ storage: storage })
        router.post('/upload', upload.single('file'), async (ctx, next) => {
            console.log(ctx)
            try {
                ctx.body = {
                    filepath: ctx.req.file.filename,//返回文件名
                }
            } catch (error) {
                ctx.throw(500, error)
                next()
            }
        })
        return router
    }
}

module.exports = UploadRoutes.initRoutes()