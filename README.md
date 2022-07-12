# ddev-laravel-breeze-vite

WIP, experimental demo repo for https://github.com/torenware/ddev-viteserve

## How was this created?

```bash
# Install Laravel via DDEV composer
ddev config --project-type=laravel --docroot=public --create-docroot && \
  ddev start && \
  ddev composer create --prefer-dist laravel/laravel && \
  ddev exec "cat .env.example | sed  -E 's/DB_(HOST|DATABASE|USERNAME|PASSWORD)=(.*)/DB_\1=db/g' > .env" && \
  ddev exec 'sed -i "s#APP_URL=.*#APP_URL=${DDEV_PRIMARY_URL}#g" .env' && \
  ddev exec "php artisan key:generate"

# Install breeze starter kit
ddev composer require laravel/breeze --dev && \
  ddev artisan breeze:install && \
  ddev artisan migrate && \
  ddev exec npm install

# Vite integration via https://github.com/torenware/ddev-viteserve
# Thanks very much to @torenware!
ddev get torenware/ddev-viteserve
```

Changed VITE_PROJECT_DIR=frontend to VITE_PROJECT_DIR=./ in .ddev/docker-compose.viteserve.yaml:

```yaml
    environment:
      # Set the vite-enabled js project here:
      - VITE_PROJECT_DIR=./
```

Run `ddev restart` afterwards. 

Change port, host, https in vite.config.js:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
        ]),
    ],
    /* ADDED: */
    server: {
        https: true,
        hmr : {
            host: 'ddev-laravel-breeze-vite.ddev.site'
        },
        port: 3001
    },
});
```

**IMPORTANT:** There was a bug in [laravel-vite-plugin](https://www.npmjs.com/package/laravel-vite-plugin), which did not use hmr.host for the blade @vite template. Update to [v.0.3](https://github.com/laravel/vite-plugin/releases/tag/v0.3.0) with

```bash
ddev exec npm install laravel-vite-plugin@latest
```

Start `vite-serve`:

```bash
ddev vite-serve start
```

**Important:** Visit `login/`-page (https://ddev-laravel-breeze-vite.ddev.site/login), vite is not loaded on index page `/`:

```bash
ddev launch /login
```

Now `https://ddev-laravel-breeze-vite.ddev.site:3001/@vite/client` is included correctly, but it gives for my local setup:

```
502: Unresponsive/broken ddev back-end site.
This is the ddev-router container: The back-end webserver at the URL you specified is not responding. You may want to use "ddev restart" to restart the site.
```

## Notes / questions

- [ ] How can we just use npm (instead of pnpm?)
- [ ] How can we check the vite logs for errors?

## Discussions / background

- https://my-ddev-lab.mandrasch.eu/tutorials/cms-and-frameworks/laravel.html#breeze 
- https://discord.com/channels/664580571770388500/993996599506259978 

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
