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

```
