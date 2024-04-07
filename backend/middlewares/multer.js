const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const alias = Math.random()
        cb(null, `img${alias}` + ext)
    }
})


const upload = multer({storage: storage})

module.exports = upload;