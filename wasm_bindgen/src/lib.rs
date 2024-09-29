#[diplomat::bridge]
pub mod ffi {
    use tokenizers::Tokenizer;
    const TOKENIZER_BYTES: &[u8] = include_bytes!("tokenizer.json");

    #[allow(unused)]
    #[diplomat::opaque]
    pub struct Tok(Tokenizer);

    impl Tok {
        pub fn create() -> Box<Tok> {
            Box::new(Tok(Tokenizer::from_bytes(TOKENIZER_BYTES).expect(
                "Failed to decode tokenizer from json packed in library",
            )))
        }
    }
}
