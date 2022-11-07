import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EnvironmentPlugin from 'vite-plugin-environment';
import WebpackIconfontPluginNodejs from 'webpack-iconfont-plugin-nodejs';
import config from './src/config/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		EnvironmentPlugin({
			IS_DEV: config.isDev,
			Proxy_Path: config.APIProxyPath
		}),
		new WebpackIconfontPluginNodejs({
            cssPrefix: 'icon',
            svgs: path.join(__dirname, 'src/assets/icons/*.svg'),
            fontsOutput: path.join(__dirname, 'src/assets/icon-fonts/'),
            cssOutput: path.join(__dirname, 'src/assets/icon-fonts/icon-font.css'),
            formats: ['woff', 'woff2']
        }),
	],
	css: {
        devSourcemap: config.isDev
    },
	server: config.server,
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
