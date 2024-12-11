import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

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
            prod: path.resolve(__dirname, 'src', 'index.ts'),
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'bundle'),
            clean: true,
        },
        module: {
            rules: [
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
        ].filter(Boolean)
    }
    return config;
};