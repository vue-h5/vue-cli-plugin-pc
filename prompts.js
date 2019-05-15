module.exports = [
    {
        name: 'addSvgSprite',
        type: 'confirm',
        message: '添加SVGSprite组件？',
        default: true
    },
    {
        name: 'addAutoComponents',
        type: 'confirm',
        message: '添加自动注册组件功能吗？',
        default: true
    },
    {
        name: 'useVuePrettier',
        type: 'confirm',
        message: '想要使用我们的@vue/prettier功能吗？',
        default: false
    }
]