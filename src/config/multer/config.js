const multer = require('multer')
const { TYPES_IMAGES, TYPES_DOCS } = require('./fileTypes')
const { FIELDS_NAMES } = require('./fieldsNames')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (FIELDS_NAMES.includes(file.fieldname) && TYPES_IMAGES.includes(file.mimetype)) {
      cb(null, './public/assets/img/products')
    }
    if (FIELDS_NAMES.includes(file.fieldname) && TYPES_DOCS.includes(file.mimetype)) {
      cb(null, './public/assets/files/products')
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname.replace(/\s+/g, ''))
  },
})

const upload = multer({ storage: storage })

module.exports = { upload }
