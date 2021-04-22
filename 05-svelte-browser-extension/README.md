# Svelte Browser Extension

References:
* Article: [Build a browser extension with Svelte](https://github.com/d-lowl/chrome-extension-svelte-boilerplate)
* Article: [How to build your next Chrome extension with Svelte](https://maurogarcia.dev/maurogarcia.dev/posts/how-to-build-your-next-chrome-extension-with-svelte/)
* Template: [d-lowl/chrome-extension-svelte-boilerplate](https://dev.to/khangnd/build-a-browser-extension-with-svelte-3135)

## Summary
### 1. Create your Svelte app
```
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

### 2. Update rollup.config.js

Update the config so that we have two Svelte apps for `popup.js` and `options.js`, instead of
a single main app.

Also add entries to copy `content.js` and `background.js` to the build folder.

### 3. Update the public folder

The `manifest.json` will specify the content and background scripts in the `public/build/` folder.

Note that I created index.html which redirects to `popup.html` just for development.

### 4. Testing

...

### Notes

Using `npm run dev`:
* The **development server** is not useful because web-extension functionality cannot be used on a traditional webpage.
* The **autoreload** allows us to avoid using commend `npm run build` all the time, however, the `livereload.js` script will be copied over to the extension. We must use `npm run build` when we want to create a clean build.
* We still need to click the 'reload' button in the browser debug tools.

