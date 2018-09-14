const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');  //无法被浏览器识别，但是loaders编译过后可以变成浏览器可识别的。在Node环境中可以直接运行
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const config = {
  mode:'production',
  entry: './entry.js',
  output: {
    filename: '[name]@[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath:'./',
    chunkFilename: '[name]@[chunkhash].js',
  },
  devtool: 'inline-source-map',
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
      // {
      //       test:/\.css$/,
      //       use:ExtractTextPlugin.extract({
      //           fallback:'style-loader',
      //           use:{
      //             loader: 'css-loader',
      //             options: {
      //               minimize:true
      //             }
      //           }
      //           // publicPath:'../' //解决css背景图的路径问题
      //       })
      // },
      {
        test: /\.scss$/,
        use:ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
            use: [
              'css-loader',
              // 'style-loader',
              {
                loader: 'postcss-loader',
                options: {
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
        test: /\.(vue)$/,
        use: ['vue-loader']
     },
     {
       test: /\.mp4$/,
       use: ['file-loader']
     }
   ]
  },
  plugins: [
    new CleanWebpackPlugin(['build/*']),
    new webpack.BannerPlugin('版权所有，哈哈哈哈哈哈哈哈哈哈哈哈哈'),
    new UglifyJSPlugin({
       sourceMap: true,
       uglifyOptions: {
         compress: {
           drop_console: true
         }
       }
    }),
    new HtmlWebpackPlugin({
      template:'./template.html'
    }),
    new VueLoaderPlugin(),
    new ExtractTextPlugin( "css/[name]@[chunkhash].css" ),
    // new PurifyCssWebpack({   //消除 css 冗余代码
    //     paths:glob.sync(path.join(__dirname,'/*.html'))
    // }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}

module.exports = config;
