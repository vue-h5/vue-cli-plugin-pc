const fs = require('fs')
const vueConfig = require('./bin/vue.config.js')
const components = require('./bin/components')
const eslint = require('./bin/eslint')

module.exports = (api, opts, rootOpts) => {
    // 扩展依赖
    api.extendPackage(() => {
        const result = {
            dependencies: {},
            devDependencies: {}
        }

        if (opts.addSvgSprite) {
            result.devDependencies['svg-sprite-loader'] = '^4.1.3'
        }

        return result
    })

    api.onCreateComplete(async () => {
        const mainFile = api.resolve('./src/main.js')

        let mainContent = fs.readFileSync(mainFile, {encoding: 'utf-8'})
        const lines = mainContent.split(/\r?\n/g).reverse()
        const lastImportIndex = lines.findIndex(line => line.match(/^import/))

        if (opts.addSvgSprite) {
            lines[lastImportIndex] += `\nimport './assets/icons'; // svg-icon`
        }

        if (opts.addAutoComponents) {
            components(api)
            lines[lastImportIndex] += `\nimport './assets/js/autoComponents';`
        }

        mainContent = lines.reverse().join('\n')
        fs.writeFileSync(mainFile, mainContent, {encoding: 'utf-8'})

        vueConfig(api, opts)
        await eslint(api, opts)
    })

    if (opts.addSvgSprite) {
        api.render('./template/SVGSprite', {
            ...opts
        })
    }
}