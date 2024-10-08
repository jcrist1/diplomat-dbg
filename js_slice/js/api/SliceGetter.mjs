// generated by diplomat-tool
import wasm from "./diplomat-wasm.mjs";
import * as diplomatRuntime from "./diplomat-runtime.mjs";

const SliceGetter_box_destroy_registry = new FinalizationRegistry((ptr) => {
    wasm.SliceGetter_destroy(ptr);
});

export class SliceGetter {
    // Internal ptr reference:
    #ptr = null;

    // Lifetimes are only to keep dependencies alive.
    // Since JS won't garbage collect until there are no incoming edges.
    #selfEdge = [];
    
    constructor(symbol, ptr, selfEdge) {
        if (symbol !== diplomatRuntime.internalConstructor) {
            console.error("SliceGetter is an Opaque type. You cannot call its constructor.");
            return;
        }
        
        this.#ptr = ptr;
        this.#selfEdge = selfEdge;
        
        // Are we being borrowed? If not, we can register.
        if (this.#selfEdge.length === 0) {
            SliceGetter_box_destroy_registry.register(this, this.#ptr);
        }
    }

    get ffiValue() {
        return this.#ptr;
    }

    static getSlice() {
        const diplomatReceive = new diplomatRuntime.DiplomatReceiveBuf(wasm, 8, 4, false);
        
        // This lifetime edge depends on lifetimes 'a
        let aEdges = [];
        
        const result = wasm.SliceGetter_get_slice(diplomatReceive.buffer);
    
        try {
            return new diplomatRuntime.DiplomatSlicePrimitive.getSlice(wasm, diplomatReceive.buffer, "u8", aEdges);
        }
        
        finally {
            diplomatReceive.free();
        }
    }
}