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

Laravel Breeze overwrite previous changes, add `.server` again for DDEV:

```js
    server: {
        // respond to all network requests (same as '0.0.0.0')
        host: true,
        // we need a strict port to match on PHP side
        strictPort: true,
        port: 5173,
        hmr: {
            // TODO: Is this the best way to achieve that? 🤔
            // Force the Vite client to connect via SSL
            // This will also force a "https://" URL in the hot file
            protocol: 'wss',
            // The host where the Vite dev server can be accessed
            // This will also force this host to be written to the hot file
            host: `${process.env.DDEV_HOSTNAME}`,
        }
    },
```

## Further resources

- https://github.com/mandrasch/ddev-laravel-vite/
- See also https://github.com/tyler36/lara10-base-demo
- Connect with the DDEV community on [Discord](https://discord.gg/hCZFfAMc5k)

More experiments and info about DDEV + vite: https://my-ddev-lab.mandrasch.eu/

Thanks to the DDEV maintainers and DDEV open source community! 💚
