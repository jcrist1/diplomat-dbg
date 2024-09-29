/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function Tok_create(): number;
export function Tok_destroy(a: number): void;
export function diplomat_init(): void;
export function diplomat_simple_write(a: number, b: number, c: number): void;
export function diplomat_buffer_write_create(a: number): number;
export function diplomat_buffer_write_get_bytes(a: number): number;
export function diplomat_buffer_write_len(a: number): number;
export function diplomat_buffer_write_destroy(a: number): void;
export function diplomat_alloc(a: number, b: number): number;
export function diplomat_free(a: number, b: number, c: number): void;
export function diplomat_is_str(a: number, b: number): number;
