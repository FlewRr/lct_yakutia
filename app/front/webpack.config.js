const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require ('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require ('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
  const confObj = {
    splitChunks: {
      chunks: 'all' // все повторы выносит отдельно и подключает за раз 
    }
  };

  if (isProd) {
    confObj.minimizer = [ // вызываем наши плагины 
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ];
  }

  return(confObj);
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './js/main.js',
    upload: './js/upload.js',
    result: './js/result.js'
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: `./js/${filename('js')}`
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'app'),
    },

    historyApiFallback: true, 
    open: 'firefox', 
    compress: true, 
    port: 3000,
  },

  optimization: optimization(),

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        collapseWhitespace: isProd
      }
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/upload.html'),
      filename: 'upload.html',
      chunks: ['upload'],
      minify: {
        collapseWhitespace: isProd
      }
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/result.html'),
      filename: 'result.html',
      chunks: ['result'],
      minify: {
        collapseWhitespace: isProd
      }
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'js/prediction.json', to: 'js' },
      ],
    })
  ],

  devtool: isProd ? false : 'source-map',

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `./img/${filename('[ext]')}`
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}]
      }
    ]
  }

}
