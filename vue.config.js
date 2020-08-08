// vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map' // 在开发环境 打开 source-map 方便调试
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.js',
      removeElectronJunk: false,
      nodeIntegration: true, // 开启弄得支持
      externals: ['ffi-napi', 'ref-napi'],
      builderOptions: {
        compression: 'maximum', // 最小打包方式
        asar: true, // 对代码进行打包加密
        appId: "com.example.app", // 程序AppId
        productName: 'aDemo', // 安装包名称
        copyright: 'Copyright © 2019', //  版权信息
        directories: {
          // output: './dist' // 程序打包输出目录 默认是 dist_electron
        },
        mac: { // mac平台打包配置
          icon: 'public/icons/icon.icns', // mac图标路径
          target: [
            'dmg', 'zip'
          ],
          type: 'distribution'
        },
        win: { // win平台打包配置
          icon: './public/icon.ico',
          target: [
            { // 使用nsis打包安装包
              target: 'nsis',
              arch: [
                'x64',
                // 'ia32'
              ]
            },
            // { // 打包成 zip压缩包
            //   target: 'zip',
            //   arch: ['x64', 'ia32']
            // },
            // { // 打包成绿色便携版
            //   target: 'portable',
            //   arch: ['x64', 'ia32']
            // }
          ]
        },
        linux: { // linux打包配置
          icon: 'public/icons',
          category: 'Network',
          target: [
            'deb', 'snap', 'AppImage'
          ]
        },
        nsis: { // 安装包配置 主要应用在win包
          oneClick: true, // 是否一键安装 为true的话 打包安装包会默认安装在用户文件夹
          installerIcon: './public/icon.ico',// 安装图标
          uninstallerIcon: './public/icon.ico',//卸载图标
          installerHeaderIcon: './public/icon.ico', // 安装时头部图标
          shortcutName: 'demo' // 快捷方式图标名称
        },
        extraResources: { // 外部文件打包
          from: 'resources/',
          to: './' // 表示把项目目录的 resources 打包的时候迁移到 程序安装目录的 resources下面
        }
      }
    }
  }
}