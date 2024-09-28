#[diplomat::bridge]
pub mod ffi {
    const DATA: &[u8] = &[1, 2, 3, 4, 5, 6];

    #[allow(unused)]
    #[diplomat::opaque]
    pub struct SliceGetter();

    impl SliceGetter {
        pub fn get_slice<'a>() -> &'a [u8] {
            DATA
        }
    }
}
