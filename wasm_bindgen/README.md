# README

To generate the bindings (using a diplomat-tool version built from the commit in the dependencies)

```sh
diplomat-tool js js/api/
```

build the wasm module

```sh
cargo build --release --target wasm32-unknown-unknown -p dbg
```

copy the wasm module to the `js/api/` directory

```
cp ../target/wasm32-unknown-unknown/dbg.wasm js/api/
```

Running node (v19) from the `js/` path

```sh
node index.js
```

yields

```
node:internal/process/esm_loader:100
    internalBinding('errors').triggerUncaughtException(
                              ^

[TypeError: WebAssembly.instantiate(): Import #0 module="__wbindgen_placeholder__" error: module is not an object or function]

Node.js v19.9.0
```

This is because a dependency requires `wasm_bindgen`.

To fix this run `wasm-bindgen js/api/dbg.wasm --out-dir js/api/` to generate a modified wasm file, then change `js/diplomat.config.mjs`
from

```js
export default {
  wasm_path: new URL("./api/dbg.wasm", import.meta.url),
};
```

to

```js
export default {
  wasm_path: new URL("./api/dbg_bg.wasm", import.meta.url),
};
```

Then change `imports` in `js/api/diplomat-wasm.mjs` from

```js
const imports = {
  env: {
    diplomat_console_debug_js(ptr, len) {
      console.debug(readString8(wasm, ptr, len));
    },
    diplomat_console_error_js(ptr, len) {
      console.error(readString8(wasm, ptr, len));
    },
    diplomat_console_info_js(ptr, len) {
      console.info(readString8(wasm, ptr, len));
    },
    diplomat_console_log_js(ptr, len) {
      console.log(readString8(wasm, ptr, len));
    },
    diplomat_console_warn_js(ptr, len) {
      console.warn(readString8(wasm, ptr, len));
    },
    diplomat_throw_error_js(ptr, len) {
      throw new Error(readString8(wasm, ptr, len));
    },
  },
};
```

to

```js
const imports = {
  "./dbg_bg.js": dbg_bg,
  env: {
    diplomat_console_debug_js(ptr, len) {
      console.debug(readString8(wasm, ptr, len));
    },
    diplomat_console_error_js(ptr, len) {
      console.error(readString8(wasm, ptr, len));
    },
    diplomat_console_info_js(ptr, len) {
      console.info(readString8(wasm, ptr, len));
    },
    diplomat_console_log_js(ptr, len) {
      console.log(readString8(wasm, ptr, len));
    },
    diplomat_console_warn_js(ptr, len) {
      console.warn(readString8(wasm, ptr, len));
    },
    diplomat_throw_error_js(ptr, len) {
      throw new Error(readString8(wasm, ptr, len));
    },
  },
};
```

Now running `node index.js` from the `js` directory should work.
