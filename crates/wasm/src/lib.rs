use algorithm_core::{AlgorithmId, AlgorithmRequest, example_request, generate_trace};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate_trace_from_request(request: JsValue) -> Result<JsValue, JsValue> {
    let request: AlgorithmRequest = serde_wasm_bindgen::from_value(request)
        .map_err(|error| JsValue::from_str(&format!("Invalid request: {error}")))?;

    let trace = generate_trace(request).map_err(|error| JsValue::from_str(error.message()))?;

    serde_wasm_bindgen::to_value(&trace)
        .map_err(|error| JsValue::from_str(&format!("Could not serialize trace: {error}")))
}

#[wasm_bindgen]
pub fn example_request_for(algorithm: &str) -> Result<JsValue, JsValue> {
    let algorithm = match algorithm {
        "quicksort" => AlgorithmId::Quicksort,
        "bfs" => AlgorithmId::Bfs,
        "dfs" => AlgorithmId::Dfs,
        "dijkstra" => AlgorithmId::Dijkstra,
        "primMst" => AlgorithmId::PrimMst,
        "kmp" => AlgorithmId::Kmp,
        "levenshtein" => AlgorithmId::Levenshtein,
        other => {
            return Err(JsValue::from_str(&format!(
                "Unknown algorithm id '{other}'."
            )));
        }
    };

    serde_wasm_bindgen::to_value(&example_request(algorithm)).map_err(|error| {
        JsValue::from_str(&format!("Could not serialize example request: {error}"))
    })
}
