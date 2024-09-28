# README

To generate the bindings (using a diplomat-tool version built from the commit in the dependencies)

```sh
diplomat-tool js js/api/
```

build the wasm module

```sh
cargo build --release --target wasm32-unknown-unknown
```

copy the wasm module to the `js/api/` directory

```
cp target/wasm32-unknown-unknown/dbg2.wasm js/api/
```

I'm not great with node config, so I need to figure out the ts config better as I needed to manually adjust the import in `index.js`

```js
import { SliceGetter } from "./api/SliceGetter";
```

to

```js
import { SliceGetter } from "./api/SliceGetter.mjs";
```

Running node (v19) from the `js/` path

```sh
node index.js
```

yields

```
file:///Users/cristina/workspace/rust/tmp/dbg2/js/api/SliceGetter.mjs:45
            return new diplomatRuntime.DiplomatSlicePrimitive.getSlice(wasm, diplomatReceive.buffer, "u8", aEdges);
                   ^

TypeError: diplomatRuntime.DiplomatSlicePrimitive.getSlice is not a constructor
    at SliceGetter.getSlice (file:///Users/cristina/workspace/rust/tmp/dbg2/js/api/SliceGetter.mjs:45:20)
    at file:///Users/cristina/workspace/rust/tmp/dbg2/js/index.js:2:25

Node.js v19.9.0
```

Changing the line in ``

```js
return new diplomatRuntime.DiplomatSlicePrimitive.getSlice(
  wasm,
  diplomatReceive.buffer,
  "u8",
  aEdges,
);
```

to

```js
return new diplomatRuntime.DiplomatSlicePrimitive(
  wasm,
  diplomatReceive.buffer,
  "u8",
  aEdges,
).buffer;
```

fixes this
