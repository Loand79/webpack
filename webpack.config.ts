import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
    port: number
}

export default (env: EnvVariables) => {

    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: {
            prod: path.resolve(__dirname, 'src', 'index.tsx'),
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'bundle'),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        devServer: isDev ? {
            port: env.port ?? 2121,
            open: true,

        } : undefined,
        devtool: isDev && "inline-source-map",
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack configuration',
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            isDev && new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        ].filter(Boolean)
    }
    return config;
};