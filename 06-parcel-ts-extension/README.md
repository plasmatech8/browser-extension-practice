# Parcel ts extension

Tutorial article: [Modern Web Extension Development with TypeScript](https://areknawo.com/modern-web-extension-development-with-typescript/)

Parcel bundler: https://parceljs.org/


Parcel could be really good because it is simple and convenient!
* Autoreloads with dev mode command `parcel <files> ...`
* Builds with build command `parcel build <files> ...`
* Automatically handles TypeScript, SCSS, etc, from the html files.
* Allows node_modules imports

Although, for browser extensions, you will still need to build and refresh in the debug.

To look into:
* snowpack
* webextension-polyfill

## Notes

`parcel-plugin-web-ext-tool` can be installed to allow parcel to integrate with web-ext.

Although, I am currently using parcel v1 which is no longer maintained. (note v2 is in alpha)

Also, parcel appears to be creating non-terminating processes for my machine for some reason.

Command:
```
npx parcel popup.html content.ts background.ts  manifest.json --no-source-maps
```

I think I might try Webpack or Snowpack alongside Web-Ext instead.

It does work though, with live-refresh and all.