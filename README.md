Expose environment variables to esbuild through `process.env`.

## dotenv support

`.env` files are supported and the plugin will load these files from current
working directory:

```
.env
.env.local
.env.[mode]
.env.[mode].local
```

Plugin defaults to `development` mode by default, configurable via `NODE_ENV`
variable, or through `mode` in the plugin's configuration.

## Filtering environment variables

By default, the plugin will inject all environment variables, but you can set
a filter to only inject what you need.

```js
env({
  // Only inject environment variables starting with `APP_`
  filter: (key) => key.startsWith('APP_'),
});

env({
  // Only inject environment variables from dotenv files
  filter: (key, filename) => filename,
});
``` 
