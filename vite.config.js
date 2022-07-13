import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
        ]),
    ],
     /*server:{
        host: 'ddev-laravel-breeze-vite.ddev.site',
        port:3001,
        https:true,
       hmr:{
            port: 443,
            protocol: "wss",
            host: 'ddev-laravel-breeze-vite.ddev.site'
        }
    }*/
});
