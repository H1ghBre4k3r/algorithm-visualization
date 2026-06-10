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
        "insertionSort" => AlgorithmId::InsertionSort,
        "bubbleSort" => AlgorithmId::BubbleSort,
        "cocktailShakerSort" => AlgorithmId::CocktailShakerSort,
        "oddEvenSort" => AlgorithmId::OddEvenSort,
        "pancakeSort" => AlgorithmId::PancakeSort,
        "quickselect" => AlgorithmId::Quickselect,
        "bitonicSort" => AlgorithmId::BitonicSort,
        "selectionSort" => AlgorithmId::SelectionSort,
        "shellSort" => AlgorithmId::ShellSort,
        "countingSort" => AlgorithmId::CountingSort,
        "radixSort" => AlgorithmId::RadixSort,
        "bucketSort" => AlgorithmId::BucketSort,
        "combSort" => AlgorithmId::CombSort,
        "mergesort" => AlgorithmId::Mergesort,
        "timsort" => AlgorithmId::Timsort,
        "heapSort" => AlgorithmId::HeapSort,
        "bfs" => AlgorithmId::Bfs,
        "dfs" => AlgorithmId::Dfs,
        "dijkstra" => AlgorithmId::Dijkstra,
        "bellmanFord" => AlgorithmId::BellmanFord,
        "aStar" => AlgorithmId::AStar,
        "primMst" => AlgorithmId::PrimMst,
        "kruskal" => AlgorithmId::Kruskal,
        "topologicalSort" => AlgorithmId::TopologicalSort,
        "kmp" => AlgorithmId::Kmp,
        "boyerMoore" => AlgorithmId::BoyerMoore,
        "levenshtein" => AlgorithmId::Levenshtein,
        "prefixTrie" => AlgorithmId::PrefixTrie,
        "handshake" => AlgorithmId::Handshake,
        "timeSync" => AlgorithmId::TimeSync,
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
