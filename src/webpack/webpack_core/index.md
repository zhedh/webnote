# Webpack 核心概念

webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

webpack 核心概念包含一下几点：

- entry（入口）
- output（输出）
- loader（加载器）
- plugin（插件）
- mode（模式）
- browser compatibility（浏览器兼容性）
- environment（环境）

## entry（入口起点）

entry（入口）配置属性支持多种类型：

- **字符串**：表示单个入口文件的路径。
- **数组**：表示多个入口文件。
- **对象**：可以包含多个入口点，每个入口点都有自己的键和值。
- **对象形式的高级用法**：支持更复杂的结构，例如嵌套对象或函数。

### 基础配置

#### 字符串配置

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
}
```

#### 数组配置

```js
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
}
```

#### 对象配置

```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
}
```

### 高级配置

#### 函数配置

**动态入口**

app 入口点的路径是通过一个函数动态返回的，根据不同的条件或环境变量来确定实际的入口文件。

```js
module.exports = {
  entry: {
    app: () => {
      // 动态决定入口文件
      return path.resolve(__dirname, 'src', 'app.js')
    },
    // ...
  },
}
```

**异步加载模块**

asyncModules 入口点使用了动态 import 语法，允许模块异步加载。

```js
module.exports = {
  entry: {
    app: './src/app.js',
    styles: './src/styles.css',
    // 异步加载模块
    asyncModules: () => import('./src/asyncModules.js'),
  },
}
```

**条件性入口**

conditional 入口点根据环境变量 SOME_FLAG 的值来决定是否包含入口文件。

```js
module.exports = {
  entry: {
    app: './src/app.js',
    styles: './src/styles.css',
    // 异步加载模块
    asyncModules: () => import('./src/asyncModules.js'),
  },
}
```

#### 对象属性配置

对象配置属性：

- import：启动时需加载的模块。
- dependOn：当前入口所依赖的入口。它们必须在该入口被加载前被加载。
- alias：入口别名。为入口点指定别名，这可以在其他地方引用该入口时使用。
- priority：入口优先级。值越大优先级越高，webpack 先加载优先级高的模块。
- plugins：入口插件。为入口指定所需要的插件。
- runtime：运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。

配置参考示例：

**共享依赖入口**

```js
module.exports = {
  entry: {
    app: {
      import: './src/app.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
}
```

**分离第三方库**

```js
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: ['react', 'react-dom'],
  },
}
```

**入口别名**

```js
module.exports = {
  entry: {
    app: {
      import: './src/app.js',
      // 为入口指定别名
      alias: 'main-app',
    },
  },
}
```

**入口优先级**

```js
module.exports = {
  entry: {
    app: {
      import: './src/app.js',
      // 设置入口的优先级
      priority: 10,
    },
    other: {
      import: './src/other.js',
      priority: 5,
    },
  },
}
```

**入口插件**

```js
module.exports = {
  entry: {
    app: {
      import: './src/app.js',
      // 为入口指定插件
      plugins: [new MyCustomPlugin()],
    },
  },
}
```

## output（输出）

可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。

### 常用配置属性说明

- filename：指定输出文件的名称。
- path：指定输入文件的目录，必须是绝对路径。
- publicPath：指定资源的公共路径，即在 HTML 文件中引用这些资源时的路径。
- chunkFilename：指定额外的 chunk 文件的名称模板。通常用于代码分割时生成的文件。
- library：当使用 output.library 时，Webpack 会导出一个全局变量，该变量可以被浏览器脚本访问。
- libraryTarget：指定库的目标类型。例如，var 会将库导出为全局变量。
- clean：设置为 true 时，Webpack 会在每次构建前清理输出目录。
- crossOriginLoading：设置跨域加载的行为。例如，设置为 anonymous 时，资源将以匿名方式加载。
- devtoolModuleFilenameTemplate：当使用 source map 时，此选项允许自定义源文件的路径。
- globalObject：指定全局对象的名称，通常用于 Node.js 环境。

```js
const path = require('path')

module.exports = {
  output: {
    // [name]占位符，它会被替换为入口点的名称
    filename: '[name].bundle.js',

    // 指定输出文件的目录
    path: path.resolve(__dirname, 'dist'),

    // 指定资源公众路径
    publicPath: '/assets/',

    // 指定额外的chunk文件的名称
    chunkFilename: '[id].chunk.js',

    // 指定JS导出的包的全局变量，打包库、框架时使用
    library: 'MyLibrary',

    // 指定库的目标类型，打包库、框架时使用
    libraryTarget: 'var',

    // 设置为anonymous时，资源将以匿名方式加载。
    crossOriginLoading: 'anonymous',

    // 指定全局对象的名称，通常用于Node.js环境。
    globalObject: 'this',
  },
}
```

## loader（加载器）

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

### loader 使用

应用程序中，有两种使用 loader 的方式：

- 配置方式（推荐）：在 webpack.config.js 文件中指定 loader。
- 内联方式：在每个 import 语句中显式指定 loader。

#### 配置方式使用 loader

module.rules 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。

注意：loader 在配置中从下到上（或从右到左）取值执行；下面的示例中从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
}
```

#### 内联方式使用 loader

不推荐使用，不展示讲解

```js
import Styles from 'style-loader!css-loader?modules!./styles.css'
```

### loader 工作原理

Loaders 本质上是 Node.js 模块，它们接收源文件的内容作为输入，并返回转换后的结果。这个过程可以通过同步或异步的方式完成。Loaders 可以链式调用，每个 Loader 处理特定的转换任务，最终将源文件转换为 JavaScript 模块。

### loader 特性

- loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何操作。
- loader 可以通过 options 对象配置（仍然支持使用 query 参数来设置选项，但是这种方式已被废弃）。
- 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

## plugin（插件）

Webpack Plugins 是 Webpack 构建系统中的扩展点，它们可以在构建过程中执行各种任务，如打包优化、资源管理和环境变量注入等。

插件目的在于解决 loader 无法实现的其他事。

### 插件剖析

webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象。

```js
const pluginName = 'TestWebpackPlugin'

class TestWebpackPlugin {
  config = {}

  constructor(config) {
    this.config = config
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建正在启动！')
      console.log('参数：', this.config)
    })
  }
}

module.exports = TestWebpackPlugin
```

### 插件使用

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入一个 new 实例。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') // 访问内置的插件
const path = require('path')

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
}
```

示例中：ProgressPlugin 用于自定义编译过程中的进度报告，HtmlWebpackPlugin 将生成一个 HTML 文件，并在其中使用 script 引入一个名为 my-first-webpack.bundle.js 的 JS 文件。

### 常用插件

- HtmlWebpackPlugin：自动生成 HTML 文件，并将打包后的 JavaScript 文件注入到这些 HTML 文件中。
- MiniCssExtractPlugin：将 CSS 提取到单独的文件中，而不是在 JavaScript 中以 <style\> 标签的形式存在。
- UglifyJsPlugin：压缩 JavaScript 文件，移除无用的代码，减少文件大小。
- TerserPlugin：替代 UglifyJsPlugin 的压缩工具，提供更好的压缩效果和性能。
- DefinePlugin：允许创建预定义的全局常量，这些常量可以在编译时被替换。
- CopyWebpackPlugin：复制单个文件或整个目录到构建目录。
- CleanWebpackPlugin：在每次构建之前清除输出目录。
- ProgressPlugin：显示构建进度。
- HotModuleReplacementPlugin：启用模块热替换（HMR），允许在不刷新页面的情况下更新模块。

## mode（模式）

提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。

> string = 'production': 'none' | 'development' | 'production'

### 用法

配置形式：

```js
module.exports = {
  mode: 'development',
}
```

命令形式：

```bash
webpack --mode=development
```

### 参数选项说明

- development: 开发模式，启用快速反馈循环和优化的开发体验。
- production: 生产模式，启用最佳实践的生产构建，包括代码分割、压缩和其他优化措施。
- none: 不设置任何模式，Webpack 将不会应用任何与模式相关的优化。

如果不设置 mode，Webpack 会默认使用 production 模式。然而，为了确保正确的优化和警告信息，建议显式设置 mode。

## browser compatibility（浏览器兼容性）

Webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。webpack 的 import() 和 require.ensure() 需要 Promise。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 提前加载 polyfill。

## environment（环境）

Webpack 5 运行于 Node.js v10.13.0+ 的版本。
