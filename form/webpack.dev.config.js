const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');  //无法被浏览器识别，但是loaders编译过后可以变成浏览器可识别的。在Node环境中可以直接运行
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//开发环境
const config = {
  mode:'development',
  entry: './entry.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath:'/',
    chunkFilename: '[name]-[id].js',
  },
  devtool: 'eval',
  //运行webpack-dev-server要npm i webpack-cli -D;
  devServer:{
    contentBase:'./bulid',//建立服务，将build目录下的文件作为可访问文件
    historyApiFallback:true, //配置后再router的BrowserRouter下带自路由访问可以访问到文件
    port:'8000',
    inline:true,
    //使用Node.js方式是没有inline这个参数的
    compress: true,
    hot:true
  },
  //监听配置,想要提升webapck-dev-server的监听更改速度，但是实际上并没有用.....
  watchOptions: {
    aggregateTimeout: 300,
    ignored:/node_modules/
    // poll: 1000
  },
  module: {
   rules: [
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
        use:ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:'css-loader',
            // publicPath:'../' //解决css背景图的路径问题
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                }
              }
            },
            'sass-loader'
          ]
        })
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
    }),
    new HtmlWebpackPlugin({
      template:'./template.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new ExtractTextPlugin("css/styles.css")
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}


module.exports = config;
