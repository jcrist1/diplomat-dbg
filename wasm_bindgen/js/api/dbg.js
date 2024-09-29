
import * as wasm from "./dbg_bg.wasm";
import { __wbg_set_wasm } from "./dbg_bg.js";
__wbg_set_wasm(wasm);
export * from "./dbg_bg.js";
