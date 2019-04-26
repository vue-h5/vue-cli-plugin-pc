<template>
    <svg><use :xlink:href="iconName"/></svg>
</template>

<script>
export default {
    name: 'svg-icon-com',
    props: {
        // icon 接受在 assets/icon/svg 中的文件名
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName () {
            return `#svg-icon-${this.icon}`
        }
    }
}
</script>
