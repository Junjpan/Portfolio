const path=require('path');
const HtmlWebPackPlugin=require('html-webpack-plugin');


module.exports={
    entry:{main:'./src/index.js'},
    output:{
          filename:'[name].[contentHash].js',
          path:path.resolve(__dirname,'build')
    },
    plugins:[new HtmlWebPackPlugin({
        template:'./src/index.html',
        filename:'index.html' //the filename value is the name of the minified HTML that will be generated in the dist folder
    })],
    module:{
        rules:[
            {
                test:/\.(js|jxs)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.s[ac]ss$/i,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    }
};

    