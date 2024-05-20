# ddev-laravel-breeze-vite

**This repository is based on https://github.com/mandrasch/ddev-laravel-vite**

Local URL: https://ddev-laravel-breeze-vite.ddev.site

## How was this created?

1. Followed steps of https://github.com/mandrasch/ddev-laravel-vite#how-was-this-created 

2. Run Laravel migrations

Following https://laravel.com/docs/10.x/starter-kits documentation, we first need to run migrations:

```bash
ddev artisan migrate
```

3. Install Laravel breeze

```bash
ddev composer require laravel/breeze --dev
ddev artisan breeze:install
# choose blade stack, yes to dark mode, no unit tests by now
ddev artisan migrate
ddev npm install
ddev npm run dev

# Open: https://ddev-laravel-breeze-vite.ddev.site
```

4. Edit `vite.config.js`

Laravel Breeze overwrite previous changes, add changes again for DDEV:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    server: {
        // respond to all network requests
        host: '0.0.0.0',
        port: port,
        strictPort: true,
        // Defines the origin of the generated asset URLs during development,
        // this will also be used for the public/hot file (Vite devserver URL)
        origin: origin
    }
});
```

## Further resources

- https://github.com/mandrasch/ddev-laravel-vite/
- See also https://github.com/tyler36/lara10-base-demo
- Connect with the DDEV community on [Discord](https://discord.gg/hCZFfAMc5k)

More experiments and info about DDEV + vite: https://my-ddev-lab.mandrasch.eu/

Thanks to the DDEV maintainers and DDEV open source community! 💚
