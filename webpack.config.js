//一个常见的Webpack配置文件
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {
	devtool: 'eval-source-map',	//配置生成Source Maps，选择合适的选项
	entry:  __dirname + "/app/main.js",	//已多次提及的唯一入口文件
	output: {
		path: __dirname + "/public",	//打包后的文件存放的地方
		filename: "[name]-[hash].js"	//打包后输出文件的文件名
	},
	module: {
		loaders: [
			{	// npm install --save-dev json-loader  安装插件
				loader: "json",	//在配置文件里添加JSON loader
				test: /\.json$/
			},
			{	// npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
		        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
		        test: /\.js$/,
		        exclude: /node_modules/,
		        query: {
		        	presets: ['es2015', 'react']
		        }
      		},
      		{	// npm install --save-dev style-loader css-loader
      			loader: 'style!css?modules',
      			test: /\.css$/
      		},
      		{
      			loader: ExtractTextPlugin.extract('style', 'css?modules!postcss'),//添加对样式表的处理
		        test: /\.css$/
		    }

		]
	},
	postcss: [
		require('autoprefixer')
	],
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("[name]-[hash].css")
	],
	devServer: {	// npm install --save-dev webpack-dev-server 安装插件
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    colors: true,//终端中输出结果为彩色
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	}
}
