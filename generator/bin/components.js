const fs = require('fs-extra')
const path = require('path')

module.exports = function (api) {
    let from = path.join(__dirname, '../lib/autoComponents.js')
    let to = path.join( api.resolve('./src/assets/js/autoComponents.js'))

    fs.copySync(from, to)
}