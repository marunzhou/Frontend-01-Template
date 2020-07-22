const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './main.js',
    mode: 'development',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [[
                            "@babel/plugin-transform-react-jsx",
                            {pragma:"createElement"}
                        ]]
                    }
                }
            },
            {
                test: /\.view$/,
                use:{
                    loader: require.resolve("./myloader3.js")
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html', 
        }), 
    ],
    devServer: {
        //设置基本结构
        // contentBase: path.resolve(__dirname, './dist'),
        contentBase: path.resolve(__dirname, './'),//这个很关键他是决定打开文件之后从那个页面座位主页面
        // contentBase: path.resolve(__dirname, './dist.test/dist'),//这个很关键他是决定打开文件之后从那个页面座位主页面
        host: 'localhost',//服务器IP地址,可以是localhost 
        // host: "172.16.20.89",
        // /index.html?business=money-1&appkey=51cc229c05144632b96f73231e48127f&supportPc=1&uid=82888736227A1BD1F5B2F1174D194707&activityid=20259&supportPc=1#
        // port:9003,
        open: true,// 自动打开浏览器
        hot: true ,// 开启热更新 
        watchContentBase: true
      } 
}