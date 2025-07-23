import { fileURLToPath } from 'url';
import { resolve, join, dirname } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: join(__dirname, './src/ts/index.ts'),
    target: 'web',
    output: {
        filename: './static/js/expense-report.bundle.js',
        path: resolve(__dirname, './dist'),
        clean: true,
    },
    devServer: {
        compress: true,
        port: 3000,
        open: true,
        client: {
            overlay: false,
        },
        watchFiles: ['src/**/*'],
    },
    plugins: [
        new ESLintPlugin({
            context: './src/ts',
        }),
        new CopyPlugin({
            patterns: [{ from: './src/static', to: './static' }],
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            minify: true,
        }),
    ],
    optimization: {
        minimizer: ['...', new CssMinimizerPlugin()],
        minimize: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: 'defaults' }]],
                    },
                },
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
};
