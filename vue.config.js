const webpack = require('webpack');
const express = require('express');
const apiRoutes = express.Router();
const app = express()
app.use('/api',apiRoutes)

var emotionJosn = require('./src/assets/js/emotion.json')

module.exports = {
    lintOnSave: false,//EsLint各种提示
    publicPath: process.env.NODE_ENV === 'production' ?
        './' :
        '/',
    outputDir: 'web',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]

    },
    devServer:{
        before(app) {
            app.get('/api/emotionJosn', (req, res) => {
                res.json({
                    errno: 0, // 这里是你的json内容
                    data: emotionJosn
                })
            })
        }
    }
}