# vue-cli-plugin-pc

[toc]

## 功能
- 添加自动注册组件功能
- 添加 svg sprite 功能

## 使用
```bash
# 创建你的项目
vue create project

# 对项目添加 vue-cli-plugin-pc 的配置
vue add pc
```

## 自动注册组件功能
在插件安装完成后，项目的 **assets/js/** 下会添加 **autoComponents.js**，此js的功能是帮助你自动对 **src/components/**下的组件进行全局注册。

然后我们可以在我们的项目中直接使用组件。

此时，需要注意的是组件的生成规范，以下是一个常用组件的目录结构
```bash
-- svgIcon
    |-- index.vue 这是组件的入口
    |-- readme.md 添加组件使用文档
```

### index.vue 模板：
```html
<template>
    <svg><use :xlink:href="iconName"/></svg>
</template>

<script>
export default {
    // 组件名,建议：目录名-com:
    name: 'svg-icon-com',
    props: {
        // ...
    },
    data () {
        return { //... }
    }
}
</script>
```

### 组件调用规则：
依照文件夹的名称来使用，**文件夹以驼峰命名**；使用时，以 `-` 分隔
```html
<!-- svgIcon -->
<svg-icon />

<!-- SvgIcon -->
<svg-icon />

<!-- svgIcon2 -->
<svg-icon2 />

<!-- mycomponents -->
<mycomponents></mycomponents>
```

> 注意：如果页面无法找到自动的组件，可以将项目重启一下。

## SVG Sprite
在你添加了插件之后，插件会在你以下目录中添加相应的文件
```bash
-- src 
  |-- assets
  |   |-- icons `New` 添加图标目录
  |        |-- svg 图标库，将你需要使用的图标都放在这
  |        |-- index.js SVG Sprite 脚本
  |-- components 
      |-- svgIcon `New` 图标组件
```

1. 将你需要的 SVG 图标添加到 **src/assets/icons/svg** 目前中
2. 在页面中使用 `svgIcon`组件来处理图标
```html
<template>
    <svg-icon icon="search"/>
</template>
```