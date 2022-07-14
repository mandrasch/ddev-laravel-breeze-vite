import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
        ]),
    ],
    server: {
        // respond to all network requests
        host: '0.0.0.0',
        // we need a strict port to match on PHP side, vite otherwise tries different ports if 3000 is used
        strictPort: true,
        port: 3000
    },
});
