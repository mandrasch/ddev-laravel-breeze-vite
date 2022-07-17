# ddev-laravel-breeze-vite

Work in Progress, vite meets DDEV meets new official Laravel integration

```
ddev start
ddev exec npm install
ddev exec npm run dev 
# paste https://ddev-laravel-breeze-vite.ddev.site:3000 into public/hot
```

**Important:** Visit `login/`-page (https://ddev-laravel-breeze-vite.ddev.site/login), vite is not loaded on index page `/`:

```bash
ddev launch /login
```

## Current state

- `public/hot` must be overwritten with `https://ddev-laravel-breeze-vite.ddev.site:3000` after running vite, maybe a PR to laravel/vite-plugin is needed (to have something like `DEV_SERVER_URL` https://laravel-vite.dev/guide/essentials/development.html#using-http-over-tls)
    - Submitted as feature request to laravel/vite-plugin: https://github.com/laravel/vite-plugin/issues/83

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
```

Added `.ddev/docker-compose.vite.yaml` and run `ddev restart`:

```yaml
version: '3.6'
services:
  web:
    expose:
      - '3000'
    environment:
      - HTTP_EXPOSE=${DDEV_ROUTER_HTTP_PORT}:80,${DDEV_MAILHOG_PORT}:8025,3001:3000
      - HTTPS_EXPOSE=${DDEV_ROUTER_HTTPS_PORT}:80,${DDEV_MAILHOG_HTTPS_PORT}:8025,3000:3000
      # HTTPS 5133 -> 5133, HTTP 5134->5133,
      # see https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/
```

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
    server: {
        // respond to all network requests
        host: '0.0.0.0',
        // we need a strict port to match on PHP side, vite otherwise tries different ports if 3000 is used
        strictPort: true,
        port: 3000
    },
});
```

## Discussions / background

- https://my-ddev-lab.mandrasch.eu/tutorials/cms-and-frameworks/laravel.html#breeze 
- https://discord.com/channels/664580571770388500/993996599506259978 
- https://github.com/torenware/ddev-viteserve/issues/2
- https://github.com/iammati/vite-ddev
- https://github.com/torenware/ddev-viteserve
- https://github.com/nystudio107/craft-vite/ (uses `ports` which is not recommended) via https://craftquest.io/courses/ddev-and-craft-cms-quick-start-guide/43674

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
