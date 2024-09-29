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

Optionally run `tsc`. Then running node (v19) from the `js/` path

```sh
node index.js
```

yields

```
file:///{PATH}/js/api/SliceGetter.mjs:45
            return new diplomatRuntime.DiplomatSlicePrimitive.getSlice(wasm, diplomatReceive.buffer, "u8", aEdges);
                   ^

TypeError: diplomatRuntime.DiplomatSlicePrimitive.getSlice is not a constructor
    at SliceGetter.getSlice (file:///{PATH}/js/api/SliceGetter.mjs:45:20)
    at file:///{{PATH}/js/index.js:2:25

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
).getValue();
```

fixes this
