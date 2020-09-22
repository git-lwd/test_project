const router = require('koa-router')()
const multer = require('koa-multer');
const path = require('path')
const fs = require('fs')

//递归创建文件目录
var checkDirExist = (filePath, suc) => {
    var pathArr = filePath.split("\\");
    let _path = "";
    for (var i = 0; i < pathArr.length; i++) {
        _path += (i == 0 ? `${pathArr[i]}` : `/${pathArr[i]}`);
        if (!fs.existsSync(_path)) {
            fs.mkdirSync(_path);
        }
    }
    if (suc) {
        suc();
    }
}

//上传配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        var date = new Date();
        let filePath = "E:/upload/img/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        filePath = path.relative(__dirname, filePath);
        checkDirExist(filePath, () => {
            cb(null, filePath)
        })
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
        let url = ctx.req.file.path.split('upload')[1].replace(/\\/g, '/')
        ctx.body = {
            code:0,
            path: url,
            message:'上传成功'
        }
    } catch (error) {
        ctx.throw(500, error)
        next()
    }
})

module.exports = router