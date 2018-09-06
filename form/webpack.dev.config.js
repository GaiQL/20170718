const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');  //无法被浏览器识别，但是loaders编译过后可以变成浏览器可识别的。在Node环境中可以直接运行
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//开发环境
const config = {
  mode:'development',//'production',
  entry: './entry.js',
  // entry:[
  //   'react-hot-loader/patch',//配置 react-hot-loader 第二步，上一步配置babel，下一步修改入口文件。
  //   './hotIndex.js'
  // ],
  // 修改 entry
  // entry: [
  //   // 写在入口文件之前
  //   "webpack-dev-server/client?http://0.0.0.0:3000",
  //   "webpack/hot/only-dev-server",
  //   // 这里是你的入口文件
  //   "./index.js",
  // ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath:'/',
    // 添加 chunkFilename
    chunkFilename: '[name]-[id].js',
    /*
      name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。

      .[chunkhash:5]. 是文件的 hash 码，这里只使用前五位。
    */
  },
  //纠错
  // devtool: 'source-map',   //生产环境下使用
  devtool: 'eval',      //开发环境
  //运行webpack-dev-server要npm i webpack-cli -D;
  devServer:{
    contentBase:'./bulid',//建立服务，将build目录下的文件作为可访问文件
    historyApiFallback:true, //配置后再router的BrowserRouter下带自路由访问可以访问到文件
    port:'8000',
    inline:true,
    //使用Node.js方式是没有inline这个参数的
    compress: true,
    hot:true
    /*
      在命令行中添加--inline命令
      在webpack.config.js中添加devServer:{inline:true},
      页面监听到改动自动刷新
    */
  },
  //监听配置,想要提升webapck-dev-server的监听更改速度，但是实际上并没有用.....
  watchOptions: {
    aggregateTimeout: 300,
    ignored:/node_modules/
    // poll: 1000
  },
  module: {
   rules: [
     // {
     //    test: /\.bundle\.js$/,
     //    loader: 'bundle-loader',
     //    options: {
     //      lazy: true ,
     //      name: '[name]'
     //    }
     // },
     {
        test:/\.(png|jpg|gif)$/,
        loaders:[
        //小于8k的图片编译为base64，大于10k的图片使用file-loader
        'url-loader?limit=8192&name:img/[name]-[hash:5].[ext]',
        //图片压缩
        'image-webpack-loader'
        ]
      },
     {
        test:/\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
     },
     {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
     },
     {
        test: /\.vue$/,
        use: ['vue-loader']
     },
     {
       test: /\.mp4$/,
       use: ['file-loader']
     }
   ]
  },
  plugins: [
    // new CleanWebpackPlugin(['build']),  //打包前清理文件;
    new webpack.BannerPlugin('版权所有，哈哈哈哈哈哈哈哈哈哈哈哈哈'),
    new UglifyJSPlugin({
       sourceMap: true
    }),//压缩
    new HtmlWebpackPlugin({
      template:'./template.html'
    }),//创建html页面  https://www.cnblogs.com/wonyun/p/6030090.html 详解配置设置模板，输出位置，多个HTML页面
    new webpack.NamedModulesPlugin(),
    //热更新时，模块名字更加友好
    new webpack.HotModuleReplacementPlugin(),
    //热更新，启动后别再命令行中添加 --hot  要不然会报maximum call stack size exceeded错误(栈溢出)；
    // new ManifestPlugin()
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}


module.exports = config;

/*

    当使用webpack-dev-server --hot --inline命令时，在每次修改文件，是将文件打包
　　保存在内存中并没有写在磁盘里(默认是根据webpack.config.js打包文件，通过--config xxxx.js修改)，这种打包得到的文件
　　和项目根目录中的index.html位于同一级（但是你看不到，因为
　　它在内存中并没有在磁盘里）。使用webpack命令将打包后的文件保存在磁盘中

*/

//  热模块替换原地爆炸！！！！！！！！！先去学近代史了.....明天继续
//  react-hot-loader这东西不是过时了吗，作者Dan都不维护了，他的github都说用react-transform代替  这他妈...
