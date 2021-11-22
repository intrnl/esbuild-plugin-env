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
