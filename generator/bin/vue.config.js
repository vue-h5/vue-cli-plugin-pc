const fs = require('fs')
const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const prettier = require('prettier')

const SVG_code = `
    config.module
        .rule('svg')
        .exclude.add(path.join(__dirname, './src/assets/icons'))
        .end()

    config.module
        .rule('icons')
        .test(/\\.svg$/)
        .include.add(path.join(__dirname, './src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
        symbolId: 'svg-icon-[name]'
        })
    `

module.exports = function (api, opts) {
    const configPath = api.resolve('./vue.config.js')
    const hasConfig = fs.existsSync(configPath)

    let VueConfigInner = ''
    let vueConfigAST = ''
    let hasSVGSprite = false
    let chainWebpack = {}

    // 有配置 vue.config.js
    if (hasConfig) {
        VueConfigInner = fs.readFileSync(configPath, { encoding: 'utf-8' })
        vueConfigAST = parse.parse(VueConfigInner)
    } else {
        const vueConfigTem = `// https://cli.vuejs.org/zh/config/
        /* eslint-disable no-undef */
        const path = require("path")

        module.exports = {
            productionSourceMap: false,
            chainWebpack: config => {}
        }`

        vueConfigAST = parse.parse(vueConfigTem)
    }

    traverse(vueConfigAST, {
        ObjectProperty (path) {
            if (path.node.key.name === 'chainWebpack') {
                // path.node.value.body.body.push(SVG_AST)
                chainWebpack = path
            }
        },
        StringLiteral (path) {
            if (path.node.value === 'svg-sprite-loader') {
                hasSVGSprite = true
            }
        }
    })

    // 如果没有配置svg-sprite时
    if (!hasSVGSprite) {
        let SVG_AST = parse.parse(SVG_code)
        chainWebpack.node.value.body.body.push(SVG_AST)
    }

    // 优化代码效果
    const prettierCode = prettier.format(generate(vueConfigAST, {
        retainLines: true,
        concise: false
    }).code, {
        semi: false,
        parser: "babel"
    })

    // 输出
    fs.writeFileSync(configPath, prettierCode, {encoding: 'utf-8'})
}