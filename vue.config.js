/* 配置别名的相关信息 固定的文件名字 不可以更改*/
module.exports = {
    configureWebpack: {  
        resolve: {
            alias: {
                '@': 'src',
                'common': '@common',
                'assets': 'assets',
                'components': 'components',
                'network': 'network',
                'views': 'views'
            }
        }
    }
}