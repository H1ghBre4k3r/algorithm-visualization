use std::collections::{HashMap, HashSet, VecDeque};
use std::fmt;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum AlgorithmId {
    Quicksort,
    InsertionSort,
    BubbleSort,
    CocktailShakerSort,
    OddEvenSort,
    PancakeSort,
    Quickselect,
    BitonicSort,
    SelectionSort,
    ShellSort,
    CountingSort,
    RadixSort,
    BucketSort,
    CombSort,
    Mergesort,
    Timsort,
    HeapSort,
    Bfs,
    Dfs,
    Dijkstra,
    BellmanFord,
    AStar,
    PrimMst,
    Kruskal,
    TopologicalSort,
    Kmp,
    BoyerMoore,
    Levenshtein,
    PrefixTrie,
    Handshake,
    TimeSync,
    Paxos,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum InputMode {
    Example,
    Random,
    Custom,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AlgorithmRequest {
    pub algorithm: AlgorithmId,
    pub input_mode: InputMode,
    pub input: InputData,
    #[serde(default)]
    pub options: Option<AlgorithmOptions>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", content = "value", rename_all = "camelCase")]
pub enum InputData {
    Sort(SortInput),
    Graph(GraphInput),
    Sequence(SequenceInput),
    Distributed(DistributedInput),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", content = "value", rename_all = "camelCase")]
pub enum AlgorithmOptions {
    Quicksort(QuicksortOptions),
    InsertionSort(InsertionSortOptions),
    BubbleSort(BubbleSortOptions),
    CocktailShakerSort(CocktailShakerSortOptions),
    OddEvenSort(OddEvenSortOptions),
    PancakeSort(PancakeSortOptions),
    Quickselect(QuickselectOptions),
    BitonicSort(BitonicSortOptions),
    SelectionSort(SelectionSortOptions),
    ShellSort(ShellSortOptions),
    CountingSort(CountingSortOptions),
    RadixSort(RadixSortOptions),
    BucketSort(BucketSortOptions),
    CombSort(CombSortOptions),
    Mergesort(MergesortOptions),
    Timsort(TimsortOptions),
    HeapSort(HeapSortOptions),
    Bfs(BfsOptions),
    Dfs(DfsOptions),
    Dijkstra(DijkstraOptions),
    BellmanFord(BellmanFordOptions),
    AStar(AStarOptions),
    PrimMst(PrimMstOptions),
    Kruskal(KruskalOptions),
    TopologicalSort(TopologicalSortOptions),
    Kmp(KmpOptions),
    BoyerMoore(BoyerMooreOptions),
    Levenshtein(LevenshteinOptions),
    PrefixTrie(PrefixTrieOptions),
    Handshake(HandshakeOptions),
    TimeSync(TimeSyncOptions),
    Paxos(PaxosOptions),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QuicksortOptions {
    #[serde(default = "default_pivot_strategy")]
    pub pivot_strategy: String,
}

fn default_pivot_strategy() -> String {
    "last".to_string()
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct InsertionSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct BubbleSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct CocktailShakerSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct OddEvenSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct PancakeSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct QuickselectOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct BitonicSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct SelectionSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct ShellSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct CountingSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct RadixSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct BucketSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct CombSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct MergesortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct TimsortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct HeapSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BfsOptions {
    #[serde(default)]
    pub stop_at_target: bool,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DfsOptions {
    #[serde(default)]
    pub stop_at_target: bool,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DijkstraOptions {
    #[serde(default)]
    pub stop_at_target: bool,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct BellmanFordOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AStarOptions {
    #[serde(default = "default_true")]
    pub stop_at_target: bool,
}

fn default_true() -> bool {
    true
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct PrimMstOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct KruskalOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct TopologicalSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct KmpOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct BoyerMooreOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct LevenshteinOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct PrefixTrieOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct HandshakeOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct TimeSyncOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct PaxosOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SortInput {
    pub values: Vec<i32>,
    #[serde(default)]
    pub target_index: Option<usize>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GraphInput {
    pub nodes: Vec<GraphNode>,
    pub edges: Vec<GraphEdge>,
    pub source: String,
    #[serde(default)]
    pub target: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GraphNode {
    pub id: String,
    pub label: String,
    pub x: f32,
    pub y: f32,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GraphEdge {
    pub id: String,
    pub from: String,
    pub to: String,
    pub weight: u32,
    #[serde(default)]
    pub label: Option<String>,
    #[serde(default)]
    pub directed: bool,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SequenceInput {
    #[serde(default)]
    pub text: String,
    #[serde(default)]
    pub pattern: String,
    #[serde(default)]
    pub words: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DistributedInput {
    pub peers: Vec<DistributedPeer>,
    #[serde(default)]
    pub initiator: String,
    #[serde(default)]
    pub responder: String,
    #[serde(default)]
    pub coordinator: Option<String>,
    #[serde(default)]
    pub latency_ms: u32,
    #[serde(default)]
    pub clock_offsets: Vec<DistributedClockOffset>,
    #[serde(default)]
    pub proposal_value: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DistributedPeer {
    pub id: String,
    pub label: String,
    #[serde(default)]
    pub role: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DistributedPeerState {
    pub peer: String,
    pub state: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DistributedMessage {
    pub id: String,
    pub from: String,
    pub to: String,
    pub label: String,
    pub sent_at: u32,
    pub deliver_at: u32,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DistributedClockOffset {
    pub peer: String,
    pub offset_ms: i32,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Trace {
    pub algorithm: AlgorithmId,
    pub initial_state: VisualizationState,
    pub final_state: VisualizationState,
    pub events: Vec<TraceEvent>,
    pub metadata: TraceMetadata,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum VisualizationState {
    Array {
        values: Vec<i32>,
    },
    Graph {
        nodes: Vec<GraphNode>,
        edges: Vec<GraphEdge>,
        source: String,
        target: Option<String>,
        distances: Vec<NodeDistance>,
        path: Vec<String>,
    },
    Sequence {
        text: String,
        pattern: String,
        lps: Vec<usize>,
        matches: Vec<usize>,
        matrix: Vec<Vec<Option<usize>>>,
    },
    Distributed {
        peers: Vec<DistributedPeer>,
        states: Vec<DistributedPeerState>,
        messages: Vec<DistributedMessage>,
    },
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeDistance {
    pub node: String,
    pub distance: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TraceMetadata {
    pub algorithm_name: String,
    pub category: String,
    pub input_size: usize,
    pub event_count: usize,
    pub result_summary: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum TraceEvent {
    SortPivot {
        index: usize,
        value: i32,
        range: [usize; 2],
        message: String,
    },
    SortCompare {
        indices: [usize; 2],
        message: String,
    },
    SortSwap {
        indices: [usize; 2],
        values: Vec<i32>,
        message: String,
    },
    SortPartition {
        range: [usize; 2],
        boundary: usize,
        scanner: usize,
        message: String,
    },
    SortMarkSorted {
        indices: Vec<usize>,
        message: String,
    },
    GraphVisit {
        node: String,
        distance: u32,
        message: String,
    },
    GraphRelaxEdge {
        #[serde(rename = "edgeId")]
        edge_id: String,
        from: String,
        to: String,
        weight: u32,
        #[serde(rename = "previousDistance")]
        previous_distance: Option<u32>,
        #[serde(rename = "newDistance")]
        new_distance: Option<u32>,
        improved: bool,
        message: String,
    },
    GraphSettle {
        node: String,
        distance: u32,
        message: String,
    },
    GraphPath {
        nodes: Vec<String>,
        #[serde(rename = "totalDistance")]
        total_distance: Option<u32>,
        message: String,
    },
    GraphConsiderEdge {
        #[serde(rename = "edgeId")]
        edge_id: String,
        from: String,
        to: String,
        weight: u32,
        message: String,
    },
    GraphSelectEdge {
        #[serde(rename = "edgeId")]
        edge_id: String,
        from: String,
        to: String,
        weight: u32,
        total_weight: u32,
        message: String,
    },
    GraphRejectEdge {
        #[serde(rename = "edgeId")]
        edge_id: String,
        from: String,
        to: String,
        weight: u32,
        message: String,
    },
    GraphSpanningTree {
        #[serde(rename = "edgeIds")]
        edge_ids: Vec<String>,
        total_weight: u32,
        message: String,
    },
    SequenceBuildPrefix {
        pattern_index: usize,
        prefix_index: usize,
        lps: Vec<usize>,
        message: String,
    },
    SequenceCompare {
        text_index: usize,
        pattern_index: usize,
        matched: bool,
        message: String,
    },
    SequenceFallback {
        from_pattern_index: usize,
        to_pattern_index: usize,
        message: String,
    },
    SequenceMatch {
        start_index: usize,
        end_index: usize,
        message: String,
    },
    SequenceEditCell {
        row: usize,
        col: usize,
        deletion: usize,
        insertion: usize,
        substitution: usize,
        value: usize,
        operation: String,
        matrix: Vec<Vec<Option<usize>>>,
        message: String,
    },
    DistributedState {
        peer: String,
        state: String,
        message: String,
    },
    DistributedSend {
        #[serde(rename = "messageId")]
        message_id: String,
        from: String,
        to: String,
        label: String,
        #[serde(rename = "sentAt")]
        sent_at: u32,
        #[serde(rename = "deliverAt")]
        deliver_at: u32,
        message: String,
    },
    DistributedDeliver {
        #[serde(rename = "messageId")]
        message_id: String,
        from: String,
        to: String,
        label: String,
        message: String,
    },
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct AlgorithmError {
    message: String,
}

impl AlgorithmError {
    pub fn new(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
        }
    }

    pub fn message(&self) -> &str {
        &self.message
    }
}

impl fmt::Display for AlgorithmError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl std::error::Error for AlgorithmError {}

pub fn generate_trace(request: AlgorithmRequest) -> Result<Trace, AlgorithmError> {
    match (request.algorithm, request.input) {
        (AlgorithmId::Quicksort, InputData::Sort(input)) => trace_quicksort(input),
        (AlgorithmId::InsertionSort, InputData::Sort(input)) => trace_insertion_sort(input),
        (AlgorithmId::BubbleSort, InputData::Sort(input)) => trace_bubble_sort(input),
        (AlgorithmId::CocktailShakerSort, InputData::Sort(input)) => {
            trace_cocktail_shaker_sort(input)
        }
        (AlgorithmId::OddEvenSort, InputData::Sort(input)) => trace_odd_even_sort(input),
        (AlgorithmId::PancakeSort, InputData::Sort(input)) => trace_pancake_sort(input),
        (AlgorithmId::Quickselect, InputData::Sort(input)) => trace_quickselect(input),
        (AlgorithmId::BitonicSort, InputData::Sort(input)) => trace_bitonic_sort(input),
        (AlgorithmId::SelectionSort, InputData::Sort(input)) => trace_selection_sort(input),
        (AlgorithmId::ShellSort, InputData::Sort(input)) => trace_shell_sort(input),
        (AlgorithmId::CountingSort, InputData::Sort(input)) => trace_counting_sort(input),
        (AlgorithmId::RadixSort, InputData::Sort(input)) => trace_radix_sort(input),
        (AlgorithmId::BucketSort, InputData::Sort(input)) => trace_bucket_sort(input),
        (AlgorithmId::CombSort, InputData::Sort(input)) => trace_comb_sort(input),
        (AlgorithmId::Mergesort, InputData::Sort(input)) => trace_mergesort(input),
        (AlgorithmId::Timsort, InputData::Sort(input)) => trace_timsort(input),
        (AlgorithmId::HeapSort, InputData::Sort(input)) => trace_heap_sort(input),
        (AlgorithmId::Bfs, InputData::Graph(input)) => {
            let stop_at_target = match request.options {
                Some(AlgorithmOptions::Bfs(options)) => options.stop_at_target,
                _ => true,
            };
            trace_bfs(input, stop_at_target)
        }
        (AlgorithmId::Dfs, InputData::Graph(input)) => {
            let stop_at_target = match request.options {
                Some(AlgorithmOptions::Dfs(options)) => options.stop_at_target,
                _ => true,
            };
            trace_dfs(input, stop_at_target)
        }
        (AlgorithmId::Dijkstra, InputData::Graph(input)) => {
            let stop_at_target = match request.options {
                Some(AlgorithmOptions::Dijkstra(options)) => options.stop_at_target,
                _ => true,
            };
            trace_dijkstra(input, stop_at_target)
        }
        (AlgorithmId::BellmanFord, InputData::Graph(input)) => trace_bellman_ford(input),
        (AlgorithmId::AStar, InputData::Graph(input)) => {
            let stop_at_target = match request.options {
                Some(AlgorithmOptions::AStar(options)) => options.stop_at_target,
                _ => true,
            };
            trace_a_star(input, stop_at_target)
        }
        (AlgorithmId::PrimMst, InputData::Graph(input)) => trace_prim_mst(input),
        (AlgorithmId::Kruskal, InputData::Graph(input)) => trace_kruskal(input),
        (AlgorithmId::TopologicalSort, InputData::Graph(input)) => trace_topological_sort(input),
        (AlgorithmId::Kmp, InputData::Sequence(input)) => trace_kmp(input),
        (AlgorithmId::BoyerMoore, InputData::Sequence(input)) => trace_boyer_moore(input),
        (AlgorithmId::Levenshtein, InputData::Sequence(input)) => trace_levenshtein(input),
        (AlgorithmId::PrefixTrie, InputData::Sequence(input)) => trace_prefix_trie(input),
        (AlgorithmId::Handshake, InputData::Distributed(input)) => trace_handshake(input),
        (AlgorithmId::TimeSync, InputData::Distributed(input)) => trace_time_sync(input),
        (AlgorithmId::Paxos, InputData::Distributed(input)) => trace_paxos(input),
        (AlgorithmId::Quicksort, _) => Err(AlgorithmError::new(
            "Quicksort requires sort input with a values array.",
        )),
        (AlgorithmId::InsertionSort, _) => Err(AlgorithmError::new(
            "Insertion Sort requires sort input with a values array.",
        )),
        (AlgorithmId::BubbleSort, _) => Err(AlgorithmError::new(
            "Bubble Sort requires sort input with a values array.",
        )),
        (AlgorithmId::CocktailShakerSort, _) => Err(AlgorithmError::new(
            "Cocktail Shaker Sort requires sort input with a values array.",
        )),
        (AlgorithmId::OddEvenSort, _) => Err(AlgorithmError::new(
            "Odd-Even Sort requires sort input with a values array.",
        )),
        (AlgorithmId::PancakeSort, _) => Err(AlgorithmError::new(
            "Pancake Sort requires sort input with a values array.",
        )),
        (AlgorithmId::Quickselect, _) => Err(AlgorithmError::new(
            "Quickselect requires sort input with a values array and optional targetIndex.",
        )),
        (AlgorithmId::BitonicSort, _) => Err(AlgorithmError::new(
            "Bitonic Sort requires sort input with a power-of-two values array.",
        )),
        (AlgorithmId::SelectionSort, _) => Err(AlgorithmError::new(
            "Selection Sort requires sort input with a values array.",
        )),
        (AlgorithmId::ShellSort, _) => Err(AlgorithmError::new(
            "Shell Sort requires sort input with a values array.",
        )),
        (AlgorithmId::CountingSort, _) => Err(AlgorithmError::new(
            "Counting Sort requires sort input with a non-negative values array.",
        )),
        (AlgorithmId::RadixSort, _) => Err(AlgorithmError::new(
            "Radix Sort requires sort input with a non-negative values array.",
        )),
        (AlgorithmId::BucketSort, _) => Err(AlgorithmError::new(
            "Bucket Sort requires sort input with a non-negative values array.",
        )),
        (AlgorithmId::CombSort, _) => Err(AlgorithmError::new(
            "Comb Sort requires sort input with a values array.",
        )),
        (AlgorithmId::Mergesort, _) => Err(AlgorithmError::new(
            "Mergesort requires sort input with a values array.",
        )),
        (AlgorithmId::Timsort, _) => Err(AlgorithmError::new(
            "Timsort requires sort input with a values array.",
        )),
        (AlgorithmId::HeapSort, _) => Err(AlgorithmError::new(
            "Heap Sort requires sort input with a values array.",
        )),
        (AlgorithmId::Bfs, _) => Err(AlgorithmError::new(
            "Breadth-first search requires graph input with nodes, edges, source, and target.",
        )),
        (AlgorithmId::Dfs, _) => Err(AlgorithmError::new(
            "Depth-first search requires graph input with nodes, edges, source, and target.",
        )),
        (AlgorithmId::Dijkstra, _) => Err(AlgorithmError::new(
            "Dijkstra requires graph input with nodes, edges, source, and target.",
        )),
        (AlgorithmId::BellmanFord, _) => Err(AlgorithmError::new(
            "Bellman-Ford requires graph input with nodes, edges, source, and target.",
        )),
        (AlgorithmId::AStar, _) => Err(AlgorithmError::new(
            "A* requires graph input with nodes, edges, source, and target.",
        )),
        (AlgorithmId::PrimMst, _) => Err(AlgorithmError::new(
            "Prim MST requires undirected graph input with nodes and weighted edges.",
        )),
        (AlgorithmId::Kruskal, _) => Err(AlgorithmError::new(
            "Kruskal requires undirected graph input with nodes and weighted edges.",
        )),
        (AlgorithmId::TopologicalSort, _) => Err(AlgorithmError::new(
            "Topological Sort requires directed graph input with nodes and edges.",
        )),
        (AlgorithmId::Kmp, _) => Err(AlgorithmError::new(
            "Knuth-Morris-Pratt requires sequence input with text and pattern.",
        )),
        (AlgorithmId::BoyerMoore, _) => Err(AlgorithmError::new(
            "Boyer-Moore requires sequence input with text and pattern.",
        )),
        (AlgorithmId::Levenshtein, _) => Err(AlgorithmError::new(
            "Levenshtein Distance requires sequence input with text and pattern.",
        )),
        (AlgorithmId::PrefixTrie, _) => Err(AlgorithmError::new(
            "Prefix Tree requires sequence input with a words array.",
        )),
        (AlgorithmId::Handshake, _) => Err(AlgorithmError::new(
            "Handshake Protocol requires distributed input with peers, initiator, and responder.",
        )),
        (AlgorithmId::TimeSync, _) => Err(AlgorithmError::new(
            "Time Synchronization requires distributed input with peers and clock offsets.",
        )),
        (AlgorithmId::Paxos, _) => Err(AlgorithmError::new(
            "Paxos requires distributed input with proposer, acceptor, and learner peers.",
        )),
    }
}

pub fn example_request(algorithm: AlgorithmId) -> AlgorithmRequest {
    match algorithm {
        AlgorithmId::Quicksort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::Quicksort(QuicksortOptions {
                pivot_strategy: default_pivot_strategy(),
            })),
        },
        AlgorithmId::InsertionSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::InsertionSort(
                InsertionSortOptions::default(),
            )),
        },
        AlgorithmId::BubbleSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::BubbleSort(BubbleSortOptions::default())),
        },
        AlgorithmId::CocktailShakerSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::CocktailShakerSort(
                CocktailShakerSortOptions::default(),
            )),
        },
        AlgorithmId::OddEvenSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::OddEvenSort(OddEvenSortOptions::default())),
        },
        AlgorithmId::PancakeSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::PancakeSort(PancakeSortOptions::default())),
        },
        AlgorithmId::Quickselect => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: Some(4),
            }),
            options: Some(AlgorithmOptions::Quickselect(QuickselectOptions::default())),
        },
        AlgorithmId::BitonicSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::BitonicSort(BitonicSortOptions::default())),
        },
        AlgorithmId::SelectionSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::SelectionSort(
                SelectionSortOptions::default(),
            )),
        },
        AlgorithmId::ShellSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::ShellSort(ShellSortOptions::default())),
        },
        AlgorithmId::CountingSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::CountingSort(
                CountingSortOptions::default(),
            )),
        },
        AlgorithmId::RadixSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::RadixSort(RadixSortOptions::default())),
        },
        AlgorithmId::BucketSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::BucketSort(BucketSortOptions::default())),
        },
        AlgorithmId::CombSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::CombSort(CombSortOptions::default())),
        },
        AlgorithmId::Mergesort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::Mergesort(MergesortOptions::default())),
        },
        AlgorithmId::Timsort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::Timsort(TimsortOptions::default())),
        },
        AlgorithmId::HeapSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
                target_index: None,
            }),
            options: Some(AlgorithmOptions::HeapSort(HeapSortOptions::default())),
        },
        AlgorithmId::Bfs => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::Bfs(BfsOptions {
                stop_at_target: true,
            })),
        },
        AlgorithmId::Dfs => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::Dfs(DfsOptions {
                stop_at_target: true,
            })),
        },
        AlgorithmId::Dijkstra => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::Dijkstra(DijkstraOptions {
                stop_at_target: true,
            })),
        },
        AlgorithmId::BellmanFord => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::BellmanFord(BellmanFordOptions::default())),
        },
        AlgorithmId::AStar => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::AStar(AStarOptions {
                stop_at_target: true,
            })),
        },
        AlgorithmId::PrimMst => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::PrimMst(PrimMstOptions::default())),
        },
        AlgorithmId::Kruskal => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::Kruskal(KruskalOptions::default())),
        },
        AlgorithmId::TopologicalSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_dag()),
            options: Some(AlgorithmOptions::TopologicalSort(
                TopologicalSortOptions::default(),
            )),
        },
        AlgorithmId::Kmp => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sequence(SequenceInput {
                text: "ababcabcabababd".to_string(),
                pattern: "ababd".to_string(),
                words: Vec::new(),
            }),
            options: Some(AlgorithmOptions::Kmp(KmpOptions::default())),
        },
        AlgorithmId::BoyerMoore => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sequence(SequenceInput {
                text: "here is a simple example".to_string(),
                pattern: "example".to_string(),
                words: Vec::new(),
            }),
            options: Some(AlgorithmOptions::BoyerMoore(BoyerMooreOptions::default())),
        },
        AlgorithmId::Levenshtein => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sequence(SequenceInput {
                text: "kitten".to_string(),
                pattern: "sitting".to_string(),
                words: Vec::new(),
            }),
            options: Some(AlgorithmOptions::Levenshtein(LevenshteinOptions::default())),
        },
        AlgorithmId::PrefixTrie => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sequence(SequenceInput {
                text: String::new(),
                pattern: String::new(),
                words: vec![
                    "tea".to_string(),
                    "team".to_string(),
                    "ted".to_string(),
                    "ten".to_string(),
                    "to".to_string(),
                    "ton".to_string(),
                ],
            }),
            options: Some(AlgorithmOptions::PrefixTrie(PrefixTrieOptions::default())),
        },
        AlgorithmId::Handshake => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Distributed(DistributedInput {
                peers: vec![
                    DistributedPeer {
                        id: "client".to_string(),
                        label: "Client".to_string(),
                        role: None,
                    },
                    DistributedPeer {
                        id: "server".to_string(),
                        label: "Server".to_string(),
                        role: None,
                    },
                    DistributedPeer {
                        id: "observer".to_string(),
                        label: "Observer".to_string(),
                        role: None,
                    },
                ],
                initiator: "client".to_string(),
                responder: "server".to_string(),
                coordinator: None,
                latency_ms: 120,
                clock_offsets: Vec::new(),
                proposal_value: String::new(),
            }),
            options: Some(AlgorithmOptions::Handshake(HandshakeOptions::default())),
        },
        AlgorithmId::TimeSync => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Distributed(DistributedInput {
                peers: vec![
                    DistributedPeer {
                        id: "coordinator".to_string(),
                        label: "Coordinator".to_string(),
                        role: None,
                    },
                    DistributedPeer {
                        id: "edge-a".to_string(),
                        label: "Edge A".to_string(),
                        role: None,
                    },
                    DistributedPeer {
                        id: "edge-b".to_string(),
                        label: "Edge B".to_string(),
                        role: None,
                    },
                    DistributedPeer {
                        id: "edge-c".to_string(),
                        label: "Edge C".to_string(),
                        role: None,
                    },
                ],
                initiator: String::new(),
                responder: String::new(),
                coordinator: Some("coordinator".to_string()),
                latency_ms: 90,
                clock_offsets: vec![
                    DistributedClockOffset {
                        peer: "coordinator".to_string(),
                        offset_ms: 0,
                    },
                    DistributedClockOffset {
                        peer: "edge-a".to_string(),
                        offset_ms: 42,
                    },
                    DistributedClockOffset {
                        peer: "edge-b".to_string(),
                        offset_ms: -27,
                    },
                    DistributedClockOffset {
                        peer: "edge-c".to_string(),
                        offset_ms: 15,
                    },
                ],
                proposal_value: String::new(),
            }),
            options: Some(AlgorithmOptions::TimeSync(TimeSyncOptions::default())),
        },
        AlgorithmId::Paxos => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Distributed(DistributedInput {
                peers: vec![
                    DistributedPeer {
                        id: "proposer".to_string(),
                        label: "Proposer".to_string(),
                        role: Some("proposer".to_string()),
                    },
                    DistributedPeer {
                        id: "acceptor-a".to_string(),
                        label: "Acceptor A".to_string(),
                        role: Some("acceptor".to_string()),
                    },
                    DistributedPeer {
                        id: "acceptor-b".to_string(),
                        label: "Acceptor B".to_string(),
                        role: Some("acceptor".to_string()),
                    },
                    DistributedPeer {
                        id: "acceptor-c".to_string(),
                        label: "Acceptor C".to_string(),
                        role: Some("acceptor".to_string()),
                    },
                    DistributedPeer {
                        id: "learner".to_string(),
                        label: "Learner".to_string(),
                        role: Some("learner".to_string()),
                    },
                ],
                initiator: String::new(),
                responder: String::new(),
                coordinator: None,
                latency_ms: 80,
                clock_offsets: Vec::new(),
                proposal_value: "deploy=v2".to_string(),
            }),
            options: Some(AlgorithmOptions::Paxos(PaxosOptions::default())),
        },
    }
}

pub fn trace_quicksort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Quicksort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();

    if !values.is_empty() {
        let high = values.len() - 1;
        quicksort_range(&mut values, 0, high, &mut events);
        events.push(TraceEvent::SortMarkSorted {
            indices: (0..values.len()).collect(),
            message: "All values are in sorted order.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Quicksort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Quicksort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_quickselect(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Quickselect input is capped at 128 values for interactive playback.",
        ));
    }
    if input.values.is_empty() {
        return Err(AlgorithmError::new(
            "Quickselect requires at least one value to select from.",
        ));
    }

    let target_index = input.target_index.unwrap_or(input.values.len() / 2);
    if target_index >= input.values.len() {
        return Err(AlgorithmError::new(format!(
            "Quickselect targetIndex {target_index} is outside the values array."
        )));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let mut low = 0usize;
    let mut high = values.len() - 1;

    loop {
        events.push(TraceEvent::SortPartition {
            range: [low, high],
            boundary: target_index,
            scanner: low,
            message: format!("Search range {low}..{high} for index {target_index}."),
        });

        let pivot_index = high;
        let pivot_value = values[pivot_index];
        events.push(TraceEvent::SortPivot {
            index: pivot_index,
            value: pivot_value,
            range: [low, high],
            message: format!("Choose {pivot_value} at index {pivot_index} as the pivot."),
        });

        let pivot_final = quickselect_partition(&mut values, low, high, &mut events);

        if pivot_final == target_index {
            events.push(TraceEvent::SortMarkSorted {
                indices: vec![target_index],
                message: format!(
                    "Index {target_index} now holds the selected value {}.",
                    values[target_index]
                ),
            });
            break;
        }

        if target_index < pivot_final {
            if pivot_final == 0 {
                break;
            }
            high = pivot_final - 1;
            events.push(TraceEvent::SortPartition {
                range: [low, high],
                boundary: target_index,
                scanner: low,
                message: format!("Target is left of pivot; keep range {low}..{high}."),
            });
        } else {
            low = pivot_final + 1;
            events.push(TraceEvent::SortPartition {
                range: [low, high],
                boundary: target_index,
                scanner: low,
                message: format!("Target is right of pivot; keep range {low}..{high}."),
            });
        }
    }

    let selected_value = values[target_index];
    let metadata = TraceMetadata {
        algorithm_name: "Quickselect".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Selected index {target_index}: {selected_value}."),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Quickselect,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_insertion_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Insertion Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();

    if !values.is_empty() {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Start with the first value as the sorted prefix.".to_string(),
        });
    }

    for index in 1..values.len() {
        let mut cursor = index;
        events.push(TraceEvent::SortPartition {
            range: [0, index],
            boundary: index,
            scanner: index,
            message: format!("Insert value {} into the sorted prefix.", values[index]),
        });

        while cursor > 0 {
            events.push(TraceEvent::SortCompare {
                indices: [cursor - 1, cursor],
                message: format!(
                    "Compare {} and {} around insertion cursor {cursor}.",
                    values[cursor - 1],
                    values[cursor]
                ),
            });

            if values[cursor - 1] <= values[cursor] {
                break;
            }

            values.swap(cursor - 1, cursor);
            events.push(TraceEvent::SortSwap {
                indices: [cursor - 1, cursor],
                values: values.clone(),
                message: format!("Shift {} left into the sorted prefix.", values[cursor - 1]),
            });
            cursor -= 1;
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..=index).collect(),
            message: format!("Positions 0 through {index} are sorted."),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Insertion Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::InsertionSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_bubble_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Bubble Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();

    if values.len() > 1 {
        for pass in 0..values.len() {
            let unsorted_end = values.len() - 1 - pass;
            let mut swapped = false;

            for index in 0..unsorted_end {
                events.push(TraceEvent::SortCompare {
                    indices: [index, index + 1],
                    message: format!(
                        "Compare adjacent values {} and {}.",
                        values[index],
                        values[index + 1]
                    ),
                });

                if values[index] > values[index + 1] {
                    values.swap(index, index + 1);
                    swapped = true;
                    events.push(TraceEvent::SortSwap {
                        indices: [index, index + 1],
                        values: values.clone(),
                        message: format!("Swap values at positions {index} and {}.", index + 1),
                    });
                }
            }

            events.push(TraceEvent::SortMarkSorted {
                indices: (unsorted_end..values.len()).collect(),
                message: format!("Value at index {unsorted_end} has bubbled into place."),
            });

            if !swapped {
                events.push(TraceEvent::SortMarkSorted {
                    indices: (0..values.len()).collect(),
                    message: "No swaps in this pass; all values are sorted.".to_string(),
                });
                break;
            }
        }
    } else if values.len() == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Bubble Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::BubbleSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_cocktail_shaker_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Cocktail Shaker Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 1 {
        let mut start = 0;
        let mut end = len - 1;
        let mut swapped = true;

        while swapped && start < end {
            swapped = false;
            events.push(TraceEvent::SortPartition {
                range: [start, end],
                boundary: end,
                scanner: start,
                message: format!("Sweep forward from {start} to {end}."),
            });

            for index in start..end {
                events.push(TraceEvent::SortCompare {
                    indices: [index, index + 1],
                    message: format!(
                        "Forward compare {} and {}.",
                        values[index],
                        values[index + 1]
                    ),
                });

                if values[index] > values[index + 1] {
                    values.swap(index, index + 1);
                    swapped = true;
                    events.push(TraceEvent::SortSwap {
                        indices: [index, index + 1],
                        values: values.clone(),
                        message: format!("Swap positions {index} and {}.", index + 1),
                    });
                }
            }

            events.push(TraceEvent::SortMarkSorted {
                indices: (end..len).collect(),
                message: format!("Value at index {end} is fixed after the forward sweep."),
            });

            if !swapped {
                break;
            }

            swapped = false;
            end -= 1;
            events.push(TraceEvent::SortPartition {
                range: [start, end],
                boundary: start,
                scanner: end,
                message: format!("Sweep backward from {end} to {start}."),
            });

            for index in (start + 1..=end).rev() {
                events.push(TraceEvent::SortCompare {
                    indices: [index - 1, index],
                    message: format!(
                        "Backward compare {} and {}.",
                        values[index - 1],
                        values[index]
                    ),
                });

                if values[index - 1] > values[index] {
                    values.swap(index - 1, index);
                    swapped = true;
                    events.push(TraceEvent::SortSwap {
                        indices: [index - 1, index],
                        values: values.clone(),
                        message: format!("Swap positions {} and {index}.", index - 1),
                    });
                }
            }

            events.push(TraceEvent::SortMarkSorted {
                indices: (0..=start).collect(),
                message: format!("Value at index {start} is fixed after the backward sweep."),
            });
            start += 1;
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "Bidirectional sweeps complete; values are sorted.".to_string(),
        });
    } else if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Cocktail Shaker Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::CocktailShakerSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_odd_even_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Odd-Even Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 1 {
        let mut sorted = false;
        let mut pass = 0;

        while !sorted {
            sorted = true;

            for phase_start in [1usize, 0usize] {
                let phase_name = if phase_start == 1 { "odd" } else { "even" };
                events.push(TraceEvent::SortPartition {
                    range: [0, len - 1],
                    boundary: phase_start,
                    scanner: phase_start,
                    message: format!("Pass {pass}: compare {phase_name}-indexed pairs."),
                });

                let mut index = phase_start;
                while index + 1 < len {
                    events.push(TraceEvent::SortCompare {
                        indices: [index, index + 1],
                        message: format!(
                            "Compare {} and {} in the {phase_name} phase.",
                            values[index],
                            values[index + 1]
                        ),
                    });

                    if values[index] > values[index + 1] {
                        values.swap(index, index + 1);
                        sorted = false;
                        events.push(TraceEvent::SortSwap {
                            indices: [index, index + 1],
                            values: values.clone(),
                            message: format!("Swap adjacent pair {index} and {}.", index + 1),
                        });
                    }

                    index += 2;
                }
            }

            pass += 1;
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "Odd and even phases made no swaps; values are sorted.".to_string(),
        });
    } else if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Odd-Even Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::OddEvenSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_selection_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Selection Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    for start in 0..len {
        let mut min_index = start;
        events.push(TraceEvent::SortPartition {
            range: [start, len - 1],
            boundary: min_index,
            scanner: start,
            message: format!("Scan for the smallest value from index {start}."),
        });

        for scanner in (start + 1)..len {
            events.push(TraceEvent::SortCompare {
                indices: [min_index, scanner],
                message: format!(
                    "Compare current minimum {} with candidate {}.",
                    values[min_index], values[scanner]
                ),
            });

            if values[scanner] < values[min_index] {
                min_index = scanner;
                events.push(TraceEvent::SortPartition {
                    range: [start, len - 1],
                    boundary: min_index,
                    scanner,
                    message: format!(
                        "New minimum candidate {} found at index {min_index}.",
                        values[min_index]
                    ),
                });
            }
        }

        if min_index != start {
            values.swap(start, min_index);
            events.push(TraceEvent::SortSwap {
                indices: [start, min_index],
                values: values.clone(),
                message: format!("Move the selected minimum into position {start}."),
            });
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..=start).collect(),
            message: format!("Positions 0 through {start} are sorted."),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Selection Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::SelectionSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_shell_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Shell Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();
    let mut gap = len / 2;

    while gap > 0 {
        events.push(TraceEvent::SortPartition {
            range: [0, len.saturating_sub(1)],
            boundary: gap,
            scanner: gap,
            message: format!("Start a gapped insertion pass with gap {gap}."),
        });

        for index in gap..len {
            let value = values[index];
            let mut cursor = index;
            events.push(TraceEvent::SortPartition {
                range: [0, len - 1],
                boundary: gap,
                scanner: index,
                message: format!("Insert value {value} through the gap-{gap} subsequence."),
            });

            while cursor >= gap {
                events.push(TraceEvent::SortCompare {
                    indices: [cursor - gap, cursor],
                    message: format!(
                        "Compare {} and {} across gap {gap}.",
                        values[cursor - gap],
                        value
                    ),
                });

                if values[cursor - gap] <= value {
                    break;
                }

                values[cursor] = values[cursor - gap];
                events.push(TraceEvent::SortSwap {
                    indices: [cursor - gap, cursor],
                    values: values.clone(),
                    message: format!(
                        "Shift {} from index {} to {cursor}.",
                        values[cursor],
                        cursor - gap
                    ),
                });
                cursor -= gap;
            }

            if cursor != index {
                values[cursor] = value;
                events.push(TraceEvent::SortSwap {
                    indices: [cursor, index],
                    values: values.clone(),
                    message: format!("Place {value} at index {cursor}."),
                });
            }
        }

        if gap == 1 {
            events.push(TraceEvent::SortMarkSorted {
                indices: (0..len).collect(),
                message: "Final gap pass complete; all values are sorted.".to_string(),
            });
        }

        gap /= 2;
    }

    if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Shell Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::ShellSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_counting_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Counting Sort input is capped at 128 values for interactive playback.",
        ));
    }
    if let Some(value) = input.values.iter().find(|value| **value < 0) {
        return Err(AlgorithmError::new(format!(
            "Counting Sort requires non-negative integers; found {value}."
        )));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let max_value = values.iter().copied().max().unwrap_or(0) as usize;
    if max_value > 512 {
        return Err(AlgorithmError::new(
            "Counting Sort supports values up to 512 for interactive playback.",
        ));
    }

    let mut counts = vec![0usize; max_value + 1];
    for (index, value) in values.iter().enumerate() {
        let bucket = *value as usize;
        counts[bucket] += 1;
        events.push(TraceEvent::SortCompare {
            indices: [index, index],
            message: format!(
                "Count value {value}; bucket {bucket} now holds {}.",
                counts[bucket]
            ),
        });
    }

    let mut write_index = 0;
    for (bucket, count) in counts.iter().enumerate() {
        if *count == 0 {
            continue;
        }

        events.push(TraceEvent::SortPartition {
            range: [write_index, values.len().saturating_sub(1)],
            boundary: write_index,
            scanner: write_index,
            message: format!("Write {count} occurrence(s) of value {bucket}."),
        });

        for _ in 0..*count {
            values[write_index] = bucket as i32;
            events.push(TraceEvent::SortSwap {
                indices: [write_index, write_index],
                values: values.clone(),
                message: format!("Place value {bucket} at index {write_index}."),
            });
            events.push(TraceEvent::SortMarkSorted {
                indices: (0..=write_index).collect(),
                message: format!("Positions 0 through {write_index} are reconstructed."),
            });
            write_index += 1;
        }
    }

    let metadata = TraceMetadata {
        algorithm_name: "Counting Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::CountingSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_radix_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Radix Sort input is capped at 128 values for interactive playback.",
        ));
    }
    if let Some(value) = input.values.iter().find(|value| **value < 0) {
        return Err(AlgorithmError::new(format!(
            "Radix Sort requires non-negative integers; found {value}."
        )));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let max_value = values.iter().copied().max().unwrap_or(0);
    if max_value > 512 {
        return Err(AlgorithmError::new(
            "Radix Sort supports values up to 512 for interactive playback.",
        ));
    }

    let len = values.len();
    if len > 0 {
        let mut place = 1;
        while place <= max_value.max(1) {
            events.push(TraceEvent::SortPartition {
                range: [0, len - 1],
                boundary: 0,
                scanner: 0,
                message: format!("Distribute values by the digit in place {place}."),
            });

            let mut buckets = vec![Vec::<i32>::new(); 10];
            for (index, value) in values.iter().enumerate() {
                let digit = ((*value / place) % 10) as usize;
                buckets[digit].push(*value);
                events.push(TraceEvent::SortCompare {
                    indices: [index, index],
                    message: format!("Place value {value} into digit bucket {digit}."),
                });
            }

            let mut write_index = 0;
            for (digit, bucket) in buckets.iter().enumerate() {
                if bucket.is_empty() {
                    continue;
                }

                events.push(TraceEvent::SortPartition {
                    range: [write_index, len - 1],
                    boundary: write_index,
                    scanner: write_index,
                    message: format!("Collect digit bucket {digit}."),
                });

                for value in bucket {
                    values[write_index] = *value;
                    events.push(TraceEvent::SortSwap {
                        indices: [write_index, write_index],
                        values: values.clone(),
                        message: format!(
                            "Write {value} from bucket {digit} to index {write_index}."
                        ),
                    });
                    write_index += 1;
                }
            }

            place *= 10;
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "All digit passes complete; values are sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Radix Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::RadixSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_bucket_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Bucket Sort input is capped at 128 values for interactive playback.",
        ));
    }
    if let Some(value) = input.values.iter().find(|value| **value < 0) {
        return Err(AlgorithmError::new(format!(
            "Bucket Sort requires non-negative integers; found {value}."
        )));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let max_value = values.iter().copied().max().unwrap_or(0);
    if max_value > 512 {
        return Err(AlgorithmError::new(
            "Bucket Sort supports values up to 512 for interactive playback.",
        ));
    }

    let len = values.len();
    if len > 0 {
        let bucket_count = (len as f64).sqrt().ceil().clamp(1.0, 10.0) as usize;
        events.push(TraceEvent::SortPartition {
            range: [0, len - 1],
            boundary: 0,
            scanner: 0,
            message: format!("Split values into {bucket_count} bucket ranges."),
        });

        let mut buckets = vec![Vec::<i32>::new(); bucket_count];
        for (index, value) in values.iter().enumerate() {
            let bucket_index =
                ((*value as usize * bucket_count) / (max_value as usize + 1)).min(bucket_count - 1);
            buckets[bucket_index].push(*value);
            events.push(TraceEvent::SortCompare {
                indices: [index, index],
                message: format!("Place value {value} into bucket {bucket_index}."),
            });
        }

        let mut write_index = 0;
        for (bucket_index, bucket) in buckets.iter_mut().enumerate() {
            if bucket.is_empty() {
                continue;
            }

            bucket.sort();
            events.push(TraceEvent::SortPartition {
                range: [write_index, len - 1],
                boundary: write_index,
                scanner: write_index,
                message: format!("Sort and collect bucket {bucket_index}."),
            });

            for value in bucket.iter() {
                values[write_index] = *value;
                events.push(TraceEvent::SortSwap {
                    indices: [write_index, write_index],
                    values: values.clone(),
                    message: format!(
                        "Write {value} from bucket {bucket_index} to index {write_index}."
                    ),
                });
                write_index += 1;
            }
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "All bucket ranges are collected in sorted order.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Bucket Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::BucketSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_comb_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Comb Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 1 {
        let mut gap = len;
        let mut swapped = true;

        while gap > 1 || swapped {
            gap = ((gap * 10) / 13).max(1);
            swapped = false;

            events.push(TraceEvent::SortPartition {
                range: [0, len - 1],
                boundary: gap,
                scanner: 0,
                message: format!("Scan values with gap {gap}."),
            });

            let mut index = 0;
            while index + gap < len {
                let paired = index + gap;
                events.push(TraceEvent::SortCompare {
                    indices: [index, paired],
                    message: format!(
                        "Compare values {} and {} at gap {gap}.",
                        values[index], values[paired]
                    ),
                });

                if values[index] > values[paired] {
                    values.swap(index, paired);
                    swapped = true;
                    events.push(TraceEvent::SortSwap {
                        indices: [index, paired],
                        values: values.clone(),
                        message: format!("Swap positions {index} and {paired}."),
                    });
                }

                index += 1;
            }
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "No gap pass needs a swap; values are sorted.".to_string(),
        });
    } else if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Comb Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::CombSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_mergesort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Mergesort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();

    if !values.is_empty() {
        let end = values.len() - 1;
        mergesort_range(&mut values, 0, end, &mut events);
        events.push(TraceEvent::SortMarkSorted {
            indices: (0..values.len()).collect(),
            message: "All values are in sorted order.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Mergesort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Mergesort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_timsort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Timsort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 0 {
        let min_run = if len < 16 { len } else { 16 };
        let mut runs = Vec::<(usize, usize)>::new();
        let mut start = 0;

        while start < len {
            let mut end = start + 1;
            while end < len {
                events.push(TraceEvent::SortCompare {
                    indices: [end - 1, end],
                    message: format!(
                        "Detect run by comparing {} and {}.",
                        values[end - 1],
                        values[end]
                    ),
                });
                if values[end - 1] <= values[end] {
                    end += 1;
                } else {
                    break;
                }
            }

            let target_end = (start + min_run).min(len);
            if end < target_end {
                end = target_end;
            }

            events.push(TraceEvent::SortPartition {
                range: [start, end - 1],
                boundary: start,
                scanner: start,
                message: format!("Prepare natural run {start}..{}.", end - 1),
            });
            timsort_insertion_run(&mut values, start, end, &mut events);
            events.push(TraceEvent::SortMarkSorted {
                indices: (start..end).collect(),
                message: format!("Run {start}..{} is internally sorted.", end - 1),
            });
            runs.push((start, end));
            start = end;
        }

        while runs.len() > 1 {
            let mut merged = Vec::<(usize, usize)>::new();
            let mut index = 0;
            while index < runs.len() {
                if index + 1 >= runs.len() {
                    merged.push(runs[index]);
                    index += 1;
                    continue;
                }

                let (left_start, left_end) = runs[index];
                let (_, right_end) = runs[index + 1];
                events.push(TraceEvent::SortPartition {
                    range: [left_start, right_end - 1],
                    boundary: left_end,
                    scanner: left_start,
                    message: format!(
                        "Merge runs {left_start}..{} and {left_end}..{}.",
                        left_end - 1,
                        right_end - 1
                    ),
                });
                timsort_merge_runs(&mut values, left_start, left_end, right_end, &mut events);
                merged.push((left_start, right_end));
                index += 2;
            }
            runs = merged;
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "All runs are merged into sorted order.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Timsort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Timsort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_heap_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Heap Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 1 {
        for root in (0..(len / 2)).rev() {
            events.push(TraceEvent::SortPartition {
                range: [0, len - 1],
                boundary: root,
                scanner: root,
                message: format!("Sift index {root} while building the max heap."),
            });
            heap_sift_down(&mut values, root, len, &mut events);
        }

        for end in (1..len).rev() {
            events.push(TraceEvent::SortCompare {
                indices: [0, end],
                message: format!(
                    "Move heap maximum {} into sorted position {end}.",
                    values[0]
                ),
            });
            values.swap(0, end);
            events.push(TraceEvent::SortSwap {
                indices: [0, end],
                values: values.clone(),
                message: format!("Swap heap root with index {end}."),
            });
            events.push(TraceEvent::SortMarkSorted {
                indices: (end..len).collect(),
                message: format!("Positions {end} through {} are fixed.", len - 1),
            });
            heap_sift_down(&mut values, 0, end, &mut events);
        }
    }

    if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    } else if len > 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "All values are in sorted order.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Heap Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::HeapSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_pancake_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Pancake Sort input is capped at 128 values for interactive playback.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 1 {
        for unsorted_end in (1..len).rev() {
            let mut max_index = 0;
            events.push(TraceEvent::SortPartition {
                range: [0, unsorted_end],
                boundary: unsorted_end,
                scanner: 0,
                message: format!("Find largest pancake for position {unsorted_end}."),
            });

            for scanner in 1..=unsorted_end {
                events.push(TraceEvent::SortCompare {
                    indices: [max_index, scanner],
                    message: format!(
                        "Compare current largest {} with candidate {}.",
                        values[max_index], values[scanner]
                    ),
                });

                if values[scanner] > values[max_index] {
                    max_index = scanner;
                    events.push(TraceEvent::SortPartition {
                        range: [0, unsorted_end],
                        boundary: max_index,
                        scanner,
                        message: format!(
                            "Largest pancake candidate {} is now at index {max_index}.",
                            values[max_index]
                        ),
                    });
                }
            }

            if max_index == unsorted_end {
                events.push(TraceEvent::SortMarkSorted {
                    indices: (unsorted_end..len).collect(),
                    message: format!("Value at index {unsorted_end} is already fixed."),
                });
                continue;
            }

            if max_index > 0 {
                events.push(TraceEvent::SortPartition {
                    range: [0, max_index],
                    boundary: max_index,
                    scanner: 0,
                    message: format!(
                        "Flip prefix 0..{max_index} to bring the largest pancake to front."
                    ),
                });
                pancake_flip(&mut values, max_index, &mut events);
            }

            events.push(TraceEvent::SortPartition {
                range: [0, unsorted_end],
                boundary: unsorted_end,
                scanner: 0,
                message: format!("Flip prefix 0..{unsorted_end} to fix the largest pancake."),
            });
            pancake_flip(&mut values, unsorted_end, &mut events);

            events.push(TraceEvent::SortMarkSorted {
                indices: (unsorted_end..len).collect(),
                message: format!("Value at index {unsorted_end} is fixed after pancake flips."),
            });
        }

        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "All pancakes are stacked in sorted order.".to_string(),
        });
    } else if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Pancake Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::PancakeSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

pub fn trace_bitonic_sort(input: SortInput) -> Result<Trace, AlgorithmError> {
    if input.values.len() > 128 {
        return Err(AlgorithmError::new(
            "Bitonic Sort input is capped at 128 values for interactive playback.",
        ));
    }
    if input.values.len() > 1 && !input.values.len().is_power_of_two() {
        return Err(AlgorithmError::new(
            "Bitonic Sort requires a power-of-two number of values.",
        ));
    }

    let initial_values = input.values.clone();
    let mut values = input.values;
    let mut events = Vec::new();
    let len = values.len();

    if len > 1 {
        bitonic_sort_range(&mut values, 0, len, true, &mut events);
        events.push(TraceEvent::SortMarkSorted {
            indices: (0..len).collect(),
            message: "Bitonic network complete; all values are sorted.".to_string(),
        });
    } else if len == 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![0],
            message: "Single value is already sorted.".to_string(),
        });
    }

    let metadata = TraceMetadata {
        algorithm_name: "Bitonic Sort".to_string(),
        category: "Sorting".to_string(),
        input_size: values.len(),
        event_count: events.len(),
        result_summary: format!("Sorted {} values.", values.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::BitonicSort,
        initial_state: VisualizationState::Array {
            values: initial_values,
        },
        final_state: VisualizationState::Array { values },
        events,
        metadata,
    })
}

fn pancake_flip(values: &mut [i32], end: usize, events: &mut Vec<TraceEvent>) {
    let mut left = 0;
    let mut right = end;

    while left < right {
        values.swap(left, right);
        events.push(TraceEvent::SortSwap {
            indices: [left, right],
            values: values.to_vec(),
            message: format!("Flip prefix by swapping positions {left} and {right}."),
        });
        left += 1;
        right -= 1;
    }
}

fn bitonic_sort_range(
    values: &mut [i32],
    start: usize,
    length: usize,
    ascending: bool,
    events: &mut Vec<TraceEvent>,
) {
    if length <= 1 {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![start],
            message: format!("Single network lane {start} is already ordered."),
        });
        return;
    }

    let half = length / 2;
    let end = start + length - 1;
    events.push(TraceEvent::SortPartition {
        range: [start, end],
        boundary: start + half,
        scanner: start,
        message: format!(
            "Build {} bitonic run across {start}..{end}.",
            if ascending { "ascending" } else { "descending" }
        ),
    });

    bitonic_sort_range(values, start, half, true, events);
    bitonic_sort_range(values, start + half, half, false, events);
    bitonic_merge(values, start, length, ascending, events);
}

fn bitonic_merge(
    values: &mut [i32],
    start: usize,
    length: usize,
    ascending: bool,
    events: &mut Vec<TraceEvent>,
) {
    if length <= 1 {
        return;
    }

    let half = length / 2;
    let end = start + length - 1;
    events.push(TraceEvent::SortPartition {
        range: [start, end],
        boundary: start + half,
        scanner: start,
        message: format!(
            "Merge {} bitonic run across {start}..{end}.",
            if ascending { "ascending" } else { "descending" }
        ),
    });

    for offset in 0..half {
        let left = start + offset;
        let right = left + half;
        events.push(TraceEvent::SortCompare {
            indices: [left, right],
            message: format!(
                "Compare network pair {left} and {right} for {} order.",
                if ascending { "ascending" } else { "descending" }
            ),
        });

        let out_of_order = if ascending {
            values[left] > values[right]
        } else {
            values[left] < values[right]
        };

        if out_of_order {
            values.swap(left, right);
            events.push(TraceEvent::SortSwap {
                indices: [left, right],
                values: values.to_vec(),
                message: format!("Exchange network pair {left} and {right}."),
            });
        }
    }

    bitonic_merge(values, start, half, ascending, events);
    bitonic_merge(values, start + half, half, ascending, events);

    if ascending {
        events.push(TraceEvent::SortMarkSorted {
            indices: (start..=end).collect(),
            message: format!("Ascending network range {start}..{end} is ordered."),
        });
    }
}

fn heap_sift_down(
    values: &mut [i32],
    mut root: usize,
    heap_size: usize,
    events: &mut Vec<TraceEvent>,
) {
    loop {
        let left = root * 2 + 1;
        if left >= heap_size {
            break;
        }

        let right = left + 1;
        let mut largest = root;
        events.push(TraceEvent::SortCompare {
            indices: [root, left],
            message: format!(
                "Compare heap parent {} with left child {}.",
                values[root], values[left]
            ),
        });
        if values[left] > values[largest] {
            largest = left;
        }

        if right < heap_size {
            events.push(TraceEvent::SortCompare {
                indices: [largest, right],
                message: format!(
                    "Compare heap candidate {} with right child {}.",
                    values[largest], values[right]
                ),
            });
            if values[right] > values[largest] {
                largest = right;
            }
        }

        events.push(TraceEvent::SortPartition {
            range: [0, heap_size - 1],
            boundary: root,
            scanner: largest,
            message: format!("Sift heap index {root} toward {largest}."),
        });

        if largest == root {
            break;
        }

        values.swap(root, largest);
        events.push(TraceEvent::SortSwap {
            indices: [root, largest],
            values: values.to_vec(),
            message: format!("Swap heap parent {root} with child {largest}."),
        });
        root = largest;
    }
}

fn mergesort_range(values: &mut [i32], start: usize, end: usize, events: &mut Vec<TraceEvent>) {
    if start >= end {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![start],
            message: format!("Single value at index {start} is sorted."),
        });
        return;
    }

    let middle = start + (end - start) / 2;
    events.push(TraceEvent::SortPartition {
        range: [start, end],
        boundary: middle,
        scanner: start,
        message: format!("Split range {start}..{end} at {middle}."),
    });

    mergesort_range(values, start, middle, events);
    mergesort_range(values, middle + 1, end, events);
    merge_ranges(values, start, middle, end, events);
}

fn merge_ranges(
    values: &mut [i32],
    start: usize,
    middle: usize,
    end: usize,
    events: &mut Vec<TraceEvent>,
) {
    let left = values[start..=middle].to_vec();
    let right = values[middle + 1..=end].to_vec();
    let mut left_index = 0;
    let mut right_index = 0;
    let mut write_index = start;

    while left_index < left.len() && right_index < right.len() {
        events.push(TraceEvent::SortCompare {
            indices: [start + left_index, middle + 1 + right_index],
            message: format!(
                "Compare merge candidates {} and {}.",
                left[left_index], right[right_index]
            ),
        });

        if left[left_index] <= right[right_index] {
            values[write_index] = left[left_index];
            left_index += 1;
        } else {
            values[write_index] = right[right_index];
            right_index += 1;
        }
        events.push(TraceEvent::SortSwap {
            indices: [write_index, write_index],
            values: values.to_vec(),
            message: format!("Write merged value at index {write_index}."),
        });
        write_index += 1;
    }

    while left_index < left.len() {
        values[write_index] = left[left_index];
        events.push(TraceEvent::SortSwap {
            indices: [write_index, write_index],
            values: values.to_vec(),
            message: format!("Copy remaining left value to index {write_index}."),
        });
        left_index += 1;
        write_index += 1;
    }

    while right_index < right.len() {
        values[write_index] = right[right_index];
        events.push(TraceEvent::SortSwap {
            indices: [write_index, write_index],
            values: values.to_vec(),
            message: format!("Copy remaining right value to index {write_index}."),
        });
        right_index += 1;
        write_index += 1;
    }

    events.push(TraceEvent::SortMarkSorted {
        indices: (start..=end).collect(),
        message: format!("Merged range {start}..{end}."),
    });
}

fn timsort_insertion_run(
    values: &mut [i32],
    start: usize,
    end: usize,
    events: &mut Vec<TraceEvent>,
) {
    for index in start + 1..end {
        let mut cursor = index;
        events.push(TraceEvent::SortPartition {
            range: [start, end - 1],
            boundary: cursor,
            scanner: cursor,
            message: format!("Insertion-sort run value at index {index}."),
        });

        while cursor > start {
            events.push(TraceEvent::SortCompare {
                indices: [cursor - 1, cursor],
                message: format!(
                    "Compare run values {} and {}.",
                    values[cursor - 1],
                    values[cursor]
                ),
            });

            if values[cursor - 1] <= values[cursor] {
                break;
            }

            values.swap(cursor - 1, cursor);
            events.push(TraceEvent::SortSwap {
                indices: [cursor - 1, cursor],
                values: values.to_vec(),
                message: format!("Shift value left inside run {start}..{}.", end - 1),
            });
            cursor -= 1;
        }
    }
}

fn timsort_merge_runs(
    values: &mut [i32],
    start: usize,
    middle: usize,
    end: usize,
    events: &mut Vec<TraceEvent>,
) {
    let left = values[start..middle].to_vec();
    let right = values[middle..end].to_vec();
    let mut left_index = 0;
    let mut right_index = 0;
    let mut write_index = start;

    while left_index < left.len() && right_index < right.len() {
        events.push(TraceEvent::SortCompare {
            indices: [start + left_index, middle + right_index],
            message: format!(
                "Compare run heads {} and {}.",
                left[left_index], right[right_index]
            ),
        });

        if left[left_index] <= right[right_index] {
            values[write_index] = left[left_index];
            left_index += 1;
        } else {
            values[write_index] = right[right_index];
            right_index += 1;
        }

        events.push(TraceEvent::SortSwap {
            indices: [write_index, write_index],
            values: values.to_vec(),
            message: format!("Write merged run value at index {write_index}."),
        });
        write_index += 1;
    }

    while left_index < left.len() {
        values[write_index] = left[left_index];
        events.push(TraceEvent::SortSwap {
            indices: [write_index, write_index],
            values: values.to_vec(),
            message: format!("Copy remaining left run value to index {write_index}."),
        });
        left_index += 1;
        write_index += 1;
    }

    while right_index < right.len() {
        values[write_index] = right[right_index];
        events.push(TraceEvent::SortSwap {
            indices: [write_index, write_index],
            values: values.to_vec(),
            message: format!("Copy remaining right run value to index {write_index}."),
        });
        right_index += 1;
        write_index += 1;
    }

    events.push(TraceEvent::SortMarkSorted {
        indices: (start..end).collect(),
        message: format!("Merged Timsort run {start}..{}.", end - 1),
    });
}

fn quicksort_range(values: &mut [i32], low: usize, high: usize, events: &mut Vec<TraceEvent>) {
    if low >= high {
        events.push(TraceEvent::SortMarkSorted {
            indices: vec![low],
            message: format!("Value at index {low} is fixed."),
        });
        return;
    }

    let pivot_index = high;
    let pivot_value = values[pivot_index];
    events.push(TraceEvent::SortPivot {
        index: pivot_index,
        value: pivot_value,
        range: [low, high],
        message: format!("Choose {pivot_value} at index {pivot_index} as the pivot."),
    });

    let mut boundary = low;
    for scanner in low..high {
        events.push(TraceEvent::SortCompare {
            indices: [scanner, pivot_index],
            message: format!(
                "Compare {} at index {scanner} with pivot {pivot_value}.",
                values[scanner]
            ),
        });
        events.push(TraceEvent::SortPartition {
            range: [low, high],
            boundary,
            scanner,
            message: format!("Partition boundary is at index {boundary}."),
        });

        if values[scanner] <= pivot_value {
            if boundary != scanner {
                values.swap(boundary, scanner);
                events.push(TraceEvent::SortSwap {
                    indices: [boundary, scanner],
                    values: values.to_vec(),
                    message: format!("Move {} into the left partition.", values[boundary]),
                });
            }
            boundary += 1;
        }
    }

    if boundary != pivot_index {
        values.swap(boundary, pivot_index);
        events.push(TraceEvent::SortSwap {
            indices: [boundary, pivot_index],
            values: values.to_vec(),
            message: format!("Place pivot {pivot_value} at index {boundary}."),
        });
    }

    events.push(TraceEvent::SortMarkSorted {
        indices: vec![boundary],
        message: format!("Pivot {pivot_value} is fixed at index {boundary}."),
    });

    if boundary > low {
        let left_high = boundary - 1;
        if low == left_high {
            events.push(TraceEvent::SortMarkSorted {
                indices: vec![low],
                message: format!("Value at index {low} is fixed."),
            });
        } else {
            quicksort_range(values, low, left_high, events);
        }
    }

    if boundary < high {
        let right_low = boundary + 1;
        if right_low == high {
            events.push(TraceEvent::SortMarkSorted {
                indices: vec![right_low],
                message: format!("Value at index {right_low} is fixed."),
            });
        } else {
            quicksort_range(values, right_low, high, events);
        }
    }
}

fn quickselect_partition(
    values: &mut [i32],
    low: usize,
    high: usize,
    events: &mut Vec<TraceEvent>,
) -> usize {
    let pivot_value = values[high];
    let mut boundary = low;

    for scanner in low..high {
        events.push(TraceEvent::SortCompare {
            indices: [scanner, high],
            message: format!(
                "Compare {} at index {scanner} with pivot {pivot_value}.",
                values[scanner]
            ),
        });
        events.push(TraceEvent::SortPartition {
            range: [low, high],
            boundary,
            scanner,
            message: format!("Partition boundary is at index {boundary}."),
        });

        if values[scanner] <= pivot_value {
            if boundary != scanner {
                values.swap(boundary, scanner);
                events.push(TraceEvent::SortSwap {
                    indices: [boundary, scanner],
                    values: values.to_vec(),
                    message: format!("Move {} into the lower partition.", values[boundary]),
                });
            }
            boundary += 1;
        }
    }

    if boundary != high {
        values.swap(boundary, high);
        events.push(TraceEvent::SortSwap {
            indices: [boundary, high],
            values: values.to_vec(),
            message: format!("Place pivot {pivot_value} at index {boundary}."),
        });
    }

    events.push(TraceEvent::SortMarkSorted {
        indices: vec![boundary],
        message: format!("Pivot {pivot_value} is fixed at index {boundary}."),
    });

    boundary
}

pub fn trace_bfs(input: GraphInput, stop_at_target: bool) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let adjacency = build_adjacency(&input.edges);
    let mut distances: HashMap<String, Option<u32>> =
        node_order.iter().map(|node| (node.clone(), None)).collect();
    let mut previous: HashMap<String, String> = HashMap::new();
    let mut discovered = HashSet::new();
    let mut queue = VecDeque::new();
    let mut events = Vec::new();

    distances.insert(input.source.clone(), Some(0));
    discovered.insert(input.source.clone());
    queue.push_back(input.source.clone());

    while let Some(node) = queue.pop_front() {
        let distance = distances.get(&node).copied().flatten().unwrap_or(0);
        events.push(TraceEvent::GraphVisit {
            node: node.clone(),
            distance,
            message: format!("Visit node {node} at breadth-first depth {distance}."),
        });

        if stop_at_target && input.target.as_ref() == Some(&node) {
            events.push(TraceEvent::GraphSettle {
                node: node.clone(),
                distance,
                message: format!("Reached target node {node}."),
            });
            break;
        }

        if let Some(edges) = adjacency.get(&node) {
            for edge in edges {
                events.push(TraceEvent::GraphConsiderEdge {
                    edge_id: edge.edge_id.clone(),
                    from: node.clone(),
                    to: edge.to.clone(),
                    weight: edge.weight,
                    message: format!("Inspect edge {} from {node} to {}.", edge.edge_id, edge.to),
                });

                if discovered.contains(&edge.to) {
                    events.push(TraceEvent::GraphRelaxEdge {
                        edge_id: edge.edge_id.clone(),
                        from: node.clone(),
                        to: edge.to.clone(),
                        weight: edge.weight,
                        previous_distance: distances.get(&edge.to).copied().flatten(),
                        new_distance: distances.get(&edge.to).copied().flatten(),
                        improved: false,
                        message: format!("{} was already discovered.", edge.to),
                    });
                    continue;
                }

                let next_distance = distance + 1;
                discovered.insert(edge.to.clone());
                queue.push_back(edge.to.clone());
                distances.insert(edge.to.clone(), Some(next_distance));
                previous.insert(edge.to.clone(), node.clone());
                events.push(TraceEvent::GraphRelaxEdge {
                    edge_id: edge.edge_id.clone(),
                    from: node.clone(),
                    to: edge.to.clone(),
                    weight: edge.weight,
                    previous_distance: None,
                    new_distance: Some(next_distance),
                    improved: true,
                    message: format!("Discover {} at depth {next_distance}.", edge.to),
                });
            }
        }

        events.push(TraceEvent::GraphSettle {
            node: node.clone(),
            distance,
            message: format!("Finish scanning node {node}."),
        });
    }

    let (path, total_distance) = input
        .target
        .as_ref()
        .map(|target| reconstruct_path(&input.source, target, &previous, &distances))
        .unwrap_or_default();

    if input.target.is_some() {
        events.push(TraceEvent::GraphPath {
            nodes: path.clone(),
            total_distance,
            message: match total_distance {
                Some(distance) => format!("Shortest unweighted path has {distance} edges."),
                None => "No path reaches the selected target.".to_string(),
            },
        });
    }

    let initial_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: if *node == input.source { Some(0) } else { None },
        })
        .collect::<Vec<_>>();
    let final_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: distances.get(node).copied().flatten(),
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Breadth-First Search".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: match total_distance {
            Some(distance) => format!("Shortest unweighted path has {distance} edges."),
            None => "No reachable target path found.".to_string(),
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::Bfs,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: input.target.clone(),
            distances: initial_distances,
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: input.target,
            distances: final_distances,
            path,
        },
        events,
        metadata,
    })
}

pub fn trace_dfs(input: GraphInput, stop_at_target: bool) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let adjacency = build_adjacency(&input.edges);
    let mut distances: HashMap<String, Option<u32>> =
        node_order.iter().map(|node| (node.clone(), None)).collect();
    let mut previous: HashMap<String, String> = HashMap::new();
    let mut visited = HashSet::new();
    let mut stack = vec![(input.source.clone(), 0_u32)];
    let mut events = Vec::new();

    distances.insert(input.source.clone(), Some(0));

    while let Some((node, depth)) = stack.pop() {
        if visited.contains(&node) {
            continue;
        }

        visited.insert(node.clone());
        distances.insert(node.clone(), Some(depth));
        events.push(TraceEvent::GraphVisit {
            node: node.clone(),
            distance: depth,
            message: format!("Visit node {node} at depth-first depth {depth}."),
        });

        if stop_at_target && input.target.as_ref() == Some(&node) {
            events.push(TraceEvent::GraphSettle {
                node: node.clone(),
                distance: depth,
                message: format!("Reached target node {node}."),
            });
            break;
        }

        if let Some(edges) = adjacency.get(&node) {
            for edge in edges {
                events.push(TraceEvent::GraphConsiderEdge {
                    edge_id: edge.edge_id.clone(),
                    from: node.clone(),
                    to: edge.to.clone(),
                    weight: edge.weight,
                    message: format!("Inspect edge {} from {node} to {}.", edge.edge_id, edge.to),
                });
            }

            for edge in edges.iter().rev() {
                if visited.contains(&edge.to) || stack.iter().any(|(queued, _)| queued == &edge.to)
                {
                    events.push(TraceEvent::GraphRelaxEdge {
                        edge_id: edge.edge_id.clone(),
                        from: node.clone(),
                        to: edge.to.clone(),
                        weight: edge.weight,
                        previous_distance: distances.get(&edge.to).copied().flatten(),
                        new_distance: distances.get(&edge.to).copied().flatten(),
                        improved: false,
                        message: format!("{} is already scheduled or visited.", edge.to),
                    });
                    continue;
                }

                let next_depth = depth + 1;
                distances.insert(edge.to.clone(), Some(next_depth));
                previous.insert(edge.to.clone(), node.clone());
                stack.push((edge.to.clone(), next_depth));
                events.push(TraceEvent::GraphRelaxEdge {
                    edge_id: edge.edge_id.clone(),
                    from: node.clone(),
                    to: edge.to.clone(),
                    weight: edge.weight,
                    previous_distance: None,
                    new_distance: Some(next_depth),
                    improved: true,
                    message: format!("Push {} onto the DFS stack at depth {next_depth}.", edge.to),
                });
            }
        }

        events.push(TraceEvent::GraphSettle {
            node: node.clone(),
            distance: depth,
            message: format!("Finish node {node}."),
        });
    }

    let (path, total_distance) = input
        .target
        .as_ref()
        .map(|target| reconstruct_path(&input.source, target, &previous, &distances))
        .unwrap_or_default();

    if input.target.is_some() {
        events.push(TraceEvent::GraphPath {
            nodes: path.clone(),
            total_distance,
            message: match total_distance {
                Some(distance) => format!("Depth-first target path has {distance} edges."),
                None => "No path reaches the selected target.".to_string(),
            },
        });
    }

    let initial_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: if *node == input.source { Some(0) } else { None },
        })
        .collect::<Vec<_>>();
    let final_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: distances.get(node).copied().flatten(),
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Depth-First Search".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: match total_distance {
            Some(distance) => format!("Depth-first target path has {distance} edges."),
            None => "No reachable target path found.".to_string(),
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::Dfs,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: input.target.clone(),
            distances: initial_distances,
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: input.target,
            distances: final_distances,
            path,
        },
        events,
        metadata,
    })
}

pub fn trace_dijkstra(input: GraphInput, stop_at_target: bool) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;

    let node_order: Vec<String> = input.nodes.iter().map(|node| node.id.clone()).collect();
    let initial_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: if *node == input.source { Some(0) } else { None },
        })
        .collect();

    let mut distances: HashMap<String, Option<u32>> =
        node_order.iter().map(|node| (node.clone(), None)).collect();
    distances.insert(input.source.clone(), Some(0));

    let adjacency = build_adjacency(&input.edges);
    let mut previous: HashMap<String, String> = HashMap::new();
    let mut unvisited: HashSet<String> = node_order.iter().cloned().collect();
    let mut events = Vec::new();

    while !unvisited.is_empty() {
        let current = node_order
            .iter()
            .filter(|node| unvisited.contains(*node))
            .filter_map(|node| {
                distances
                    .get(node)
                    .copied()
                    .flatten()
                    .map(|d| (node.clone(), d))
            })
            .min_by_key(|(_, distance)| *distance);

        let Some((node, distance)) = current else {
            break;
        };

        events.push(TraceEvent::GraphVisit {
            node: node.clone(),
            distance,
            message: format!("Visit node {node} at distance {distance}."),
        });

        if let Some(edges) = adjacency.get(&node) {
            for edge in edges {
                let previous_distance = distances.get(&edge.to).copied().flatten();
                let candidate = distance.saturating_add(edge.weight);
                let improved = previous_distance.map_or(true, |existing| candidate < existing);

                if improved {
                    distances.insert(edge.to.clone(), Some(candidate));
                    previous.insert(edge.to.clone(), node.clone());
                }

                events.push(TraceEvent::GraphRelaxEdge {
                    edge_id: edge.edge_id.clone(),
                    from: node.clone(),
                    to: edge.to.clone(),
                    weight: edge.weight,
                    previous_distance,
                    new_distance: if improved {
                        Some(candidate)
                    } else {
                        previous_distance
                    },
                    improved,
                    message: if improved {
                        format!("Update {} to distance {candidate}.", edge.to)
                    } else {
                        format!("Keep {} at its current best distance.", edge.to)
                    },
                });
            }
        }

        unvisited.remove(&node);
        events.push(TraceEvent::GraphSettle {
            node: node.clone(),
            distance,
            message: format!("Settle node {node}."),
        });

        if stop_at_target && input.target.as_ref() == Some(&node) {
            break;
        }
    }

    let (path, total_distance) = input
        .target
        .as_ref()
        .map(|target| reconstruct_path(&input.source, target, &previous, &distances))
        .unwrap_or_default();

    if input.target.is_some() {
        events.push(TraceEvent::GraphPath {
            nodes: path.clone(),
            total_distance,
            message: match total_distance {
                Some(distance) => format!("Shortest path has total distance {distance}."),
                None => "No path reaches the selected target.".to_string(),
            },
        });
    }

    let final_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: distances.get(node).copied().flatten(),
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Dijkstra".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: match total_distance {
            Some(distance) => format!("Shortest path distance is {distance}."),
            None => "No reachable target path found.".to_string(),
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::Dijkstra,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: input.target.clone(),
            distances: initial_distances,
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: input.target,
            distances: final_distances,
            path,
        },
        events,
        metadata,
    })
}

pub fn trace_bellman_ford(input: GraphInput) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let initial_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: if *node == input.source { Some(0) } else { None },
        })
        .collect();

    let mut distances: HashMap<String, Option<u32>> =
        node_order.iter().map(|node| (node.clone(), None)).collect();
    distances.insert(input.source.clone(), Some(0));
    let mut previous: HashMap<String, String> = HashMap::new();
    let adjacency = build_adjacency(&input.edges);
    let mut events = Vec::new();

    for pass in 0..input.nodes.len().saturating_sub(1) {
        let mut changed = false;
        events.push(TraceEvent::GraphVisit {
            node: input.source.clone(),
            distance: pass as u32,
            message: format!("Start Bellman-Ford relaxation pass {}.", pass + 1),
        });

        for from in &node_order {
            if let Some(edges) = adjacency.get(from) {
                for edge in edges {
                    let from_distance = distances.get(from).copied().flatten();
                    let previous_distance = distances.get(&edge.to).copied().flatten();
                    let candidate =
                        from_distance.map(|distance| distance.saturating_add(edge.weight));
                    let improved = match (candidate, previous_distance) {
                        (Some(candidate), Some(existing)) => candidate < existing,
                        (Some(_), None) => true,
                        _ => false,
                    };

                    if improved {
                        if let Some(candidate) = candidate {
                            distances.insert(edge.to.clone(), Some(candidate));
                            previous.insert(edge.to.clone(), from.clone());
                            changed = true;
                        }
                    }

                    events.push(TraceEvent::GraphRelaxEdge {
                        edge_id: edge.edge_id.clone(),
                        from: from.clone(),
                        to: edge.to.clone(),
                        weight: edge.weight,
                        previous_distance,
                        new_distance: if improved {
                            candidate
                        } else {
                            previous_distance
                        },
                        improved,
                        message: match (candidate, improved) {
                            (Some(candidate), true) => {
                                format!("Update {} to distance {candidate}.", edge.to)
                            }
                            (Some(_), false) => {
                                format!("Keep {} at its current best distance.", edge.to)
                            }
                            (None, _) => {
                                format!("Skip edge {} because {from} is unreachable.", edge.edge_id)
                            }
                        },
                    });
                }
            }
        }

        if !changed {
            events.push(TraceEvent::GraphSettle {
                node: input.source.clone(),
                distance: pass as u32,
                message: format!("No distances changed on pass {}; stop early.", pass + 1),
            });
            break;
        }
    }

    let (path, total_distance) = input
        .target
        .as_ref()
        .map(|target| reconstruct_path(&input.source, target, &previous, &distances))
        .unwrap_or_default();

    if input.target.is_some() {
        events.push(TraceEvent::GraphPath {
            nodes: path.clone(),
            total_distance,
            message: match total_distance {
                Some(distance) => format!("Shortest path has total distance {distance}."),
                None => "No path reaches the selected target.".to_string(),
            },
        });
    }

    let final_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: distances.get(node).copied().flatten(),
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Bellman-Ford".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: match total_distance {
            Some(distance) => format!("Shortest path distance is {distance}."),
            None => "No reachable target path found.".to_string(),
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::BellmanFord,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: input.target.clone(),
            distances: initial_distances,
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: input.target,
            distances: final_distances,
            path,
        },
        events,
        metadata,
    })
}

pub fn trace_a_star(input: GraphInput, stop_at_target: bool) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let positions = input
        .nodes
        .iter()
        .map(|node| (node.id.clone(), (node.x, node.y)))
        .collect::<HashMap<_, _>>();
    let min_positive_weight = input
        .edges
        .iter()
        .filter(|edge| edge.weight > 0)
        .map(|edge| edge.weight)
        .min();
    let initial_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: if *node == input.source { Some(0) } else { None },
        })
        .collect();

    let mut distances: HashMap<String, Option<u32>> =
        node_order.iter().map(|node| (node.clone(), None)).collect();
    distances.insert(input.source.clone(), Some(0));
    let mut previous: HashMap<String, String> = HashMap::new();
    let adjacency = build_adjacency(&input.edges);
    let mut open = HashSet::from([input.source.clone()]);
    let mut settled = HashSet::new();
    let mut events = Vec::new();

    while !open.is_empty() {
        let current = node_order
            .iter()
            .filter(|node| open.contains(*node))
            .filter_map(|node| {
                let distance = distances.get(node).copied().flatten()?;
                let heuristic = graph_heuristic(
                    node,
                    input.target.as_deref(),
                    &positions,
                    min_positive_weight,
                );
                Some((
                    node.clone(),
                    distance,
                    distance.saturating_add(heuristic),
                    heuristic,
                ))
            })
            .min_by_key(|(_, distance, estimate, heuristic)| (*estimate, *heuristic, *distance));

        let Some((node, distance, estimate, heuristic)) = current else {
            break;
        };

        open.remove(&node);
        events.push(TraceEvent::GraphVisit {
            node: node.clone(),
            distance,
            message: format!(
                "Expand {node} with distance {distance} and estimated total {estimate}."
            ),
        });

        if let Some(edges) = adjacency.get(&node) {
            for edge in edges {
                let previous_distance = distances.get(&edge.to).copied().flatten();
                let candidate = distance.saturating_add(edge.weight);
                let improved = previous_distance.map_or(true, |existing| candidate < existing);

                if improved {
                    distances.insert(edge.to.clone(), Some(candidate));
                    previous.insert(edge.to.clone(), node.clone());
                    if !settled.contains(&edge.to) {
                        open.insert(edge.to.clone());
                    }
                }

                events.push(TraceEvent::GraphRelaxEdge {
                    edge_id: edge.edge_id.clone(),
                    from: node.clone(),
                    to: edge.to.clone(),
                    weight: edge.weight,
                    previous_distance,
                    new_distance: if improved {
                        Some(candidate)
                    } else {
                        previous_distance
                    },
                    improved,
                    message: if improved {
                        let next_heuristic = graph_heuristic(
                            &edge.to,
                            input.target.as_deref(),
                            &positions,
                            min_positive_weight,
                        );
                        format!(
                            "Update {} to distance {candidate}; estimated total {}.",
                            edge.to,
                            candidate.saturating_add(next_heuristic)
                        )
                    } else {
                        format!("Keep {} at its current best distance.", edge.to)
                    },
                });
            }
        }

        settled.insert(node.clone());
        events.push(TraceEvent::GraphSettle {
            node: node.clone(),
            distance,
            message: if heuristic == 0 {
                format!("Settle node {node}.")
            } else {
                format!("Settle node {node}; heuristic contribution was {heuristic}.")
            },
        });

        if stop_at_target && input.target.as_ref() == Some(&node) {
            break;
        }
    }

    let (path, total_distance) = input
        .target
        .as_ref()
        .map(|target| reconstruct_path(&input.source, target, &previous, &distances))
        .unwrap_or_default();

    if input.target.is_some() {
        events.push(TraceEvent::GraphPath {
            nodes: path.clone(),
            total_distance,
            message: match total_distance {
                Some(distance) => format!("A* path has total distance {distance}."),
                None => "No path reaches the selected target.".to_string(),
            },
        });
    }

    let final_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: distances.get(node).copied().flatten(),
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "A* Search".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: match total_distance {
            Some(distance) => format!("A* path distance is {distance}."),
            None => "No reachable target path found.".to_string(),
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::AStar,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: input.target.clone(),
            distances: initial_distances,
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: input.target,
            distances: final_distances,
            path,
        },
        events,
        metadata,
    })
}

pub fn trace_prim_mst(input: GraphInput) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;
    validate_mst_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let mut visited = HashSet::new();
    let mut selected_edges = Vec::new();
    let mut total_weight = 0;
    let mut events = Vec::new();
    let start = input.source.clone();

    visited.insert(start.clone());
    events.push(TraceEvent::GraphVisit {
        node: start.clone(),
        distance: 0,
        message: format!("Start the spanning tree at node {start}."),
    });

    while visited.len() < input.nodes.len() {
        let mut best: Option<(usize, &GraphEdge, String, String)> = None;

        for (index, edge) in input.edges.iter().enumerate() {
            let from_visited = visited.contains(&edge.from);
            let to_visited = visited.contains(&edge.to);

            if from_visited == to_visited {
                if from_visited {
                    events.push(TraceEvent::GraphRejectEdge {
                        edge_id: edge.id.clone(),
                        from: edge.from.clone(),
                        to: edge.to.clone(),
                        weight: edge.weight,
                        message: format!(
                            "Reject edge {} because both endpoints are already in the tree.",
                            edge.id
                        ),
                    });
                }
                continue;
            }

            let (from, to) = if from_visited {
                (edge.from.clone(), edge.to.clone())
            } else {
                (edge.to.clone(), edge.from.clone())
            };
            events.push(TraceEvent::GraphConsiderEdge {
                edge_id: edge.id.clone(),
                from: from.clone(),
                to: to.clone(),
                weight: edge.weight,
                message: format!(
                    "Consider edge {} from {from} to {to} with weight {}.",
                    edge.id, edge.weight
                ),
            });

            let should_replace = best.as_ref().map_or(true, |(best_index, best_edge, _, _)| {
                edge.weight < best_edge.weight
                    || (edge.weight == best_edge.weight && index < *best_index)
            });
            if should_replace {
                best = Some((index, edge, from, to));
            }
        }

        let Some((_, edge, from, to)) = best else {
            return Err(AlgorithmError::new(
                "Prim MST requires a connected graph to span every node.",
            ));
        };

        visited.insert(to.clone());
        selected_edges.push(edge.id.clone());
        total_weight += edge.weight;
        events.push(TraceEvent::GraphSelectEdge {
            edge_id: edge.id.clone(),
            from: from.clone(),
            to: to.clone(),
            weight: edge.weight,
            total_weight,
            message: format!("Select edge {} and add node {to} to the tree.", edge.id),
        });
        events.push(TraceEvent::GraphSettle {
            node: to.clone(),
            distance: total_weight,
            message: format!("Node {to} is now connected to the spanning tree."),
        });
    }

    events.push(TraceEvent::GraphSpanningTree {
        edge_ids: selected_edges.clone(),
        total_weight,
        message: format!("Minimum spanning tree complete with total weight {total_weight}."),
    });

    let distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: None,
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Prim MST".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: format!("MST total weight is {total_weight}."),
    };

    Ok(Trace {
        algorithm: AlgorithmId::PrimMst,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: None,
            distances: distances.clone(),
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: None,
            distances,
            path: selected_edges,
        },
        events,
        metadata,
    })
}

pub fn trace_kruskal(input: GraphInput) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;
    validate_mst_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let mut edges_by_weight = input.edges.iter().enumerate().collect::<Vec<_>>();
    edges_by_weight.sort_by_key(|(index, edge)| (edge.weight, *index));

    let mut union_find = UnionFind::new(&node_order);
    let mut selected_edges = Vec::new();
    let mut total_weight = 0;
    let mut events = Vec::new();

    for (_, edge) in edges_by_weight {
        events.push(TraceEvent::GraphConsiderEdge {
            edge_id: edge.id.clone(),
            from: edge.from.clone(),
            to: edge.to.clone(),
            weight: edge.weight,
            message: format!(
                "Consider edge {} with weight {} in sorted order.",
                edge.id, edge.weight
            ),
        });

        if union_find.connected(&edge.from, &edge.to) {
            events.push(TraceEvent::GraphRejectEdge {
                edge_id: edge.id.clone(),
                from: edge.from.clone(),
                to: edge.to.clone(),
                weight: edge.weight,
                message: format!("Reject edge {} because it would create a cycle.", edge.id),
            });
            continue;
        }

        union_find.union(&edge.from, &edge.to);
        selected_edges.push(edge.id.clone());
        total_weight += edge.weight;
        events.push(TraceEvent::GraphSelectEdge {
            edge_id: edge.id.clone(),
            from: edge.from.clone(),
            to: edge.to.clone(),
            weight: edge.weight,
            total_weight,
            message: format!("Select edge {} and merge its two components.", edge.id),
        });

        if selected_edges.len() == input.nodes.len().saturating_sub(1) {
            break;
        }
    }

    if selected_edges.len() != input.nodes.len().saturating_sub(1) {
        return Err(AlgorithmError::new(
            "Kruskal requires a connected graph to span every node.",
        ));
    }

    events.push(TraceEvent::GraphSpanningTree {
        edge_ids: selected_edges.clone(),
        total_weight,
        message: format!("Minimum spanning tree complete with total weight {total_weight}."),
    });

    let distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: None,
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Kruskal".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: format!("MST total weight is {total_weight}."),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Kruskal,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: None,
            distances: distances.clone(),
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: None,
            distances,
            path: selected_edges,
        },
        events,
        metadata,
    })
}

pub fn trace_topological_sort(input: GraphInput) -> Result<Trace, AlgorithmError> {
    validate_graph(&input)?;
    validate_topological_graph(&input)?;

    let node_order = input
        .nodes
        .iter()
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();
    let mut indegree = node_order
        .iter()
        .map(|node| (node.clone(), 0_u32))
        .collect::<HashMap<_, _>>();
    let mut outgoing = node_order
        .iter()
        .map(|node| (node.clone(), Vec::<GraphEdge>::new()))
        .collect::<HashMap<_, _>>();

    for edge in &input.edges {
        *indegree
            .get_mut(&edge.to)
            .expect("edge endpoints were validated") += 1;
        outgoing
            .get_mut(&edge.from)
            .expect("edge endpoints were validated")
            .push(edge.clone());
    }

    let mut queue = VecDeque::new();
    let mut events = Vec::new();
    for node in &node_order {
        if indegree.get(node).copied().unwrap_or_default() == 0 {
            queue.push_back(node.clone());
            events.push(TraceEvent::GraphVisit {
                node: node.clone(),
                distance: 0,
                message: format!("Node {node} starts with indegree 0."),
            });
        }
    }

    let mut order = Vec::new();
    while let Some(node) = queue.pop_front() {
        order.push(node.clone());
        events.push(TraceEvent::GraphSettle {
            node: node.clone(),
            distance: order.len() as u32,
            message: format!("Place node {node} at topological position {}.", order.len()),
        });

        for edge in outgoing.get(&node).cloned().unwrap_or_default() {
            events.push(TraceEvent::GraphConsiderEdge {
                edge_id: edge.id.clone(),
                from: edge.from.clone(),
                to: edge.to.clone(),
                weight: edge.weight,
                message: format!("Remove dependency from {} to {}.", edge.from, edge.to),
            });

            let previous = indegree.get(&edge.to).copied().unwrap_or_default();
            let next = previous.saturating_sub(1);
            indegree.insert(edge.to.clone(), next);
            events.push(TraceEvent::GraphRelaxEdge {
                edge_id: edge.id.clone(),
                from: edge.from.clone(),
                to: edge.to.clone(),
                weight: edge.weight,
                previous_distance: Some(previous),
                new_distance: Some(next),
                improved: next == 0,
                message: format!("Indegree for {} drops from {previous} to {next}.", edge.to),
            });

            if next == 0 {
                queue.push_back(edge.to.clone());
                events.push(TraceEvent::GraphVisit {
                    node: edge.to.clone(),
                    distance: order.len() as u32,
                    message: format!("Node {} is ready; all prerequisites are settled.", edge.to),
                });
            }
        }
    }

    if order.len() != node_order.len() {
        return Err(AlgorithmError::new(
            "Topological Sort requires an acyclic directed graph.",
        ));
    }

    events.push(TraceEvent::GraphPath {
        nodes: order.clone(),
        total_distance: Some(order.len() as u32),
        message: format!("Topological order: {}.", order.join(" -> ")),
    });

    let initial_distances = node_order
        .iter()
        .map(|node| NodeDistance {
            node: node.clone(),
            distance: None,
        })
        .collect::<Vec<_>>();
    let final_distances = order
        .iter()
        .enumerate()
        .map(|(index, node)| NodeDistance {
            node: node.clone(),
            distance: Some(index as u32 + 1),
        })
        .collect::<Vec<_>>();

    let metadata = TraceMetadata {
        algorithm_name: "Topological Sort".to_string(),
        category: "Graph".to_string(),
        input_size: input.nodes.len(),
        event_count: events.len(),
        result_summary: format!("Ordered {} nodes.", order.len()),
    };

    Ok(Trace {
        algorithm: AlgorithmId::TopologicalSort,
        initial_state: VisualizationState::Graph {
            nodes: input.nodes.clone(),
            edges: input.edges.clone(),
            source: input.source.clone(),
            target: input.target.clone(),
            distances: initial_distances,
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: input.nodes,
            edges: input.edges,
            source: input.source,
            target: input.target,
            distances: final_distances,
            path: order,
        },
        events,
        metadata,
    })
}

pub fn trace_kmp(input: SequenceInput) -> Result<Trace, AlgorithmError> {
    validate_sequence(&input)?;

    let text = input.text;
    let pattern = input.pattern;
    let text_chars = text.chars().collect::<Vec<_>>();
    let pattern_chars = pattern.chars().collect::<Vec<_>>();
    let mut events = Vec::new();
    let lps = build_lps_trace(&pattern_chars, &mut events);
    let mut matches = Vec::new();
    let mut text_index = 0;
    let mut pattern_index = 0;

    while text_index < text_chars.len() {
        let matched = text_chars[text_index] == pattern_chars[pattern_index];
        events.push(TraceEvent::SequenceCompare {
            text_index,
            pattern_index,
            matched,
            message: format!(
                "Compare text[{}] '{}' with pattern[{}] '{}'.",
                text_index, text_chars[text_index], pattern_index, pattern_chars[pattern_index]
            ),
        });

        if matched {
            text_index += 1;
            pattern_index += 1;

            if pattern_index == pattern_chars.len() {
                let start_index = text_index - pattern_chars.len();
                let end_index = text_index - 1;
                matches.push(start_index);
                events.push(TraceEvent::SequenceMatch {
                    start_index,
                    end_index,
                    message: format!("Pattern found at text index {start_index}."),
                });
                let fallback = lps[pattern_index - 1];
                events.push(TraceEvent::SequenceFallback {
                    from_pattern_index: pattern_index,
                    to_pattern_index: fallback,
                    message: format!("Resume from prefix length {fallback}."),
                });
                pattern_index = fallback;
            }
        } else if pattern_index != 0 {
            let fallback = lps[pattern_index - 1];
            events.push(TraceEvent::SequenceFallback {
                from_pattern_index: pattern_index,
                to_pattern_index: fallback,
                message: format!(
                    "Mismatch: fall back from pattern index {pattern_index} to {fallback}."
                ),
            });
            pattern_index = fallback;
        } else {
            text_index += 1;
        }
    }

    let metadata = TraceMetadata {
        algorithm_name: "Knuth-Morris-Pratt".to_string(),
        category: "Sequence".to_string(),
        input_size: text_chars.len(),
        event_count: events.len(),
        result_summary: if matches.is_empty() {
            "No pattern matches found.".to_string()
        } else {
            format!("Found {} pattern match(es).", matches.len())
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::Kmp,
        initial_state: VisualizationState::Sequence {
            text: text.clone(),
            pattern: pattern.clone(),
            lps: vec![0; pattern_chars.len()],
            matches: Vec::new(),
            matrix: Vec::new(),
        },
        final_state: VisualizationState::Sequence {
            text,
            pattern,
            lps,
            matches,
            matrix: Vec::new(),
        },
        events,
        metadata,
    })
}

fn build_lps_trace(pattern: &[char], events: &mut Vec<TraceEvent>) -> Vec<usize> {
    let mut lps = vec![0; pattern.len()];
    let mut prefix_index = 0;
    let mut pattern_index = 1;

    while pattern_index < pattern.len() {
        events.push(TraceEvent::SequenceBuildPrefix {
            pattern_index,
            prefix_index,
            lps: lps.clone(),
            message: format!(
                "Build prefix: compare pattern[{pattern_index}] with pattern[{prefix_index}]."
            ),
        });

        if pattern[pattern_index] == pattern[prefix_index] {
            prefix_index += 1;
            lps[pattern_index] = prefix_index;
            events.push(TraceEvent::SequenceBuildPrefix {
                pattern_index,
                prefix_index,
                lps: lps.clone(),
                message: format!("Set lps[{pattern_index}] to {prefix_index}."),
            });
            pattern_index += 1;
        } else if prefix_index != 0 {
            let fallback = lps[prefix_index - 1];
            events.push(TraceEvent::SequenceFallback {
                from_pattern_index: prefix_index,
                to_pattern_index: fallback,
                message: format!("Prefix mismatch: fall back to prefix length {fallback}."),
            });
            prefix_index = fallback;
        } else {
            lps[pattern_index] = 0;
            events.push(TraceEvent::SequenceBuildPrefix {
                pattern_index,
                prefix_index,
                lps: lps.clone(),
                message: format!("Set lps[{pattern_index}] to 0."),
            });
            pattern_index += 1;
        }
    }

    lps
}

pub fn trace_boyer_moore(input: SequenceInput) -> Result<Trace, AlgorithmError> {
    validate_boyer_moore_sequence(&input)?;

    let text = input.text;
    let pattern = input.pattern;
    let text_chars = text.chars().collect::<Vec<_>>();
    let pattern_chars = pattern.chars().collect::<Vec<_>>();
    let last_occurrence = build_bad_character_table(&pattern_chars);
    let mut events = Vec::new();
    let mut matches = Vec::new();
    let mut alignment = 0;

    while alignment + pattern_chars.len() <= text_chars.len() {
        let mut pattern_index = pattern_chars.len();
        while pattern_index > 0 {
            pattern_index -= 1;
            let text_index = alignment + pattern_index;
            let matched = text_chars[text_index] == pattern_chars[pattern_index];
            events.push(TraceEvent::SequenceCompare {
                text_index,
                pattern_index,
                matched,
                message: format!(
                    "Compare text[{}] '{}' with pattern[{}] '{}' from right to left.",
                    text_index, text_chars[text_index], pattern_index, pattern_chars[pattern_index]
                ),
            });

            if !matched {
                let shift = bad_character_shift(
                    text_chars[text_index],
                    pattern_index,
                    pattern_chars.len(),
                    &last_occurrence,
                );
                events.push(TraceEvent::SequenceFallback {
                    from_pattern_index: pattern_index,
                    to_pattern_index: 0,
                    message: format!(
                        "Mismatch on '{}'; shift alignment right by {shift} using the bad-character rule.",
                        text_chars[text_index]
                    ),
                });
                alignment += shift;
                break;
            }
        }

        if pattern_index == 0 && text_chars[alignment] == pattern_chars[0] {
            let start_index = alignment;
            let end_index = alignment + pattern_chars.len() - 1;
            matches.push(start_index);
            events.push(TraceEvent::SequenceMatch {
                start_index,
                end_index,
                message: format!("Pattern found at text index {start_index}."),
            });
            let shift = full_match_shift(&pattern_chars, &last_occurrence);
            events.push(TraceEvent::SequenceFallback {
                from_pattern_index: pattern_chars.len(),
                to_pattern_index: 0,
                message: format!("Shift alignment right by {shift} after the match."),
            });
            alignment += shift;
        }
    }

    let metadata = TraceMetadata {
        algorithm_name: "Boyer-Moore".to_string(),
        category: "Sequence".to_string(),
        input_size: text_chars.len(),
        event_count: events.len(),
        result_summary: if matches.is_empty() {
            "No pattern matches found.".to_string()
        } else {
            format!("Found {} pattern match(es).", matches.len())
        },
    };

    Ok(Trace {
        algorithm: AlgorithmId::BoyerMoore,
        initial_state: VisualizationState::Sequence {
            text: text.clone(),
            pattern: pattern.clone(),
            lps: Vec::new(),
            matches: Vec::new(),
            matrix: Vec::new(),
        },
        final_state: VisualizationState::Sequence {
            text,
            pattern,
            lps: Vec::new(),
            matches,
            matrix: Vec::new(),
        },
        events,
        metadata,
    })
}

fn build_bad_character_table(pattern: &[char]) -> HashMap<char, usize> {
    pattern
        .iter()
        .enumerate()
        .map(|(index, character)| (*character, index))
        .collect::<HashMap<_, _>>()
}

fn bad_character_shift(
    mismatched: char,
    pattern_index: usize,
    pattern_len: usize,
    last_occurrence: &HashMap<char, usize>,
) -> usize {
    match last_occurrence.get(&mismatched).copied() {
        Some(last_index) if last_index < pattern_index => pattern_index - last_index,
        Some(_) => 1,
        None => (pattern_index + 1).min(pattern_len).max(1),
    }
}

fn full_match_shift(pattern: &[char], last_occurrence: &HashMap<char, usize>) -> usize {
    if pattern.len() <= 1 {
        return 1;
    }

    let last_char = pattern[pattern.len() - 1];
    match last_occurrence.get(&last_char).copied() {
        Some(index) if index < pattern.len() - 1 => pattern.len() - 1 - index,
        _ => 1,
    }
}

fn validate_sequence(input: &SequenceInput) -> Result<(), AlgorithmError> {
    if input.text.is_empty() {
        return Err(AlgorithmError::new("KMP text cannot be empty."));
    }
    if input.pattern.is_empty() {
        return Err(AlgorithmError::new("KMP pattern cannot be empty."));
    }
    if input.pattern.chars().count() > input.text.chars().count() {
        return Err(AlgorithmError::new(
            "KMP pattern cannot be longer than the text.",
        ));
    }
    if input.text.chars().count() > 160 {
        return Err(AlgorithmError::new(
            "KMP text is capped at 160 characters for interactive playback.",
        ));
    }
    if input.pattern.chars().count() > 48 {
        return Err(AlgorithmError::new(
            "KMP pattern is capped at 48 characters for interactive playback.",
        ));
    }

    Ok(())
}

fn validate_boyer_moore_sequence(input: &SequenceInput) -> Result<(), AlgorithmError> {
    if input.text.is_empty() {
        return Err(AlgorithmError::new("Boyer-Moore text cannot be empty."));
    }
    if input.pattern.is_empty() {
        return Err(AlgorithmError::new("Boyer-Moore pattern cannot be empty."));
    }
    if input.pattern.chars().count() > input.text.chars().count() {
        return Err(AlgorithmError::new(
            "Boyer-Moore pattern cannot be longer than the text.",
        ));
    }
    if input.text.chars().count() > 160 {
        return Err(AlgorithmError::new(
            "Boyer-Moore text is capped at 160 characters for interactive playback.",
        ));
    }
    if input.pattern.chars().count() > 48 {
        return Err(AlgorithmError::new(
            "Boyer-Moore pattern is capped at 48 characters for interactive playback.",
        ));
    }

    Ok(())
}

#[derive(Debug, Clone)]
struct TrieBuildNode {
    id: String,
    label: String,
    depth: usize,
    terminal: bool,
    children: HashMap<char, usize>,
}

pub fn trace_prefix_trie(input: SequenceInput) -> Result<Trace, AlgorithmError> {
    validate_prefix_trie_sequence(&input)?;

    let mut trie_nodes = vec![TrieBuildNode {
        id: "n0".to_string(),
        label: "root".to_string(),
        depth: 0,
        terminal: false,
        children: HashMap::new(),
    }];
    let mut edges = Vec::new();
    let mut events = Vec::new();

    for (word_index, word) in input.words.iter().enumerate() {
        let mut current = 0_usize;
        events.push(TraceEvent::GraphVisit {
            node: trie_nodes[current].id.clone(),
            distance: word_index as u32,
            message: format!("Start inserting word '{}' at the root.", word),
        });

        for character in word.chars() {
            if let Some(next) = trie_nodes[current].children.get(&character).copied() {
                let edge_id = trie_edge_id(current, next);
                events.push(TraceEvent::GraphConsiderEdge {
                    edge_id,
                    from: trie_nodes[current].id.clone(),
                    to: trie_nodes[next].id.clone(),
                    weight: 1,
                    message: format!(
                        "Follow existing edge '{}' for character '{}'.",
                        character, character
                    ),
                });
                current = next;
                events.push(TraceEvent::GraphVisit {
                    node: trie_nodes[current].id.clone(),
                    distance: trie_nodes[current].depth as u32,
                    message: format!(
                        "Reuse node '{}' for prefix ending in '{}'.",
                        trie_nodes[current].label, character
                    ),
                });
                continue;
            }

            let next = trie_nodes.len();
            let next_id = format!("n{next}");
            let edge_id = trie_edge_id(current, next);
            trie_nodes.push(TrieBuildNode {
                id: next_id.clone(),
                label: character.to_string(),
                depth: trie_nodes[current].depth + 1,
                terminal: false,
                children: HashMap::new(),
            });
            trie_nodes[current].children.insert(character, next);
            edges.push(GraphEdge {
                id: edge_id.clone(),
                from: trie_nodes[current].id.clone(),
                to: next_id.clone(),
                weight: 1,
                label: Some(character.to_string()),
                directed: true,
            });
            events.push(TraceEvent::GraphSelectEdge {
                edge_id,
                from: trie_nodes[current].id.clone(),
                to: next_id,
                weight: 1,
                total_weight: edges.len() as u32,
                message: format!(
                    "Create node for character '{}' and attach it to the trie.",
                    character
                ),
            });
            current = next;
        }

        trie_nodes[current].terminal = true;
        events.push(TraceEvent::GraphSettle {
            node: trie_nodes[current].id.clone(),
            distance: word.chars().count() as u32,
            message: format!("Mark '{}' as a complete word.", word),
        });
    }

    let graph_nodes = layout_trie_nodes(&trie_nodes);
    let distances = trie_nodes
        .iter()
        .map(|node| NodeDistance {
            node: node.id.clone(),
            distance: Some(node.depth as u32),
        })
        .collect::<Vec<_>>();
    let terminal_path = trie_nodes
        .iter()
        .filter(|node| node.terminal)
        .map(|node| node.id.clone())
        .collect::<Vec<_>>();

    events.push(TraceEvent::GraphPath {
        nodes: terminal_path.clone(),
        total_distance: Some(input.words.len() as u32),
        message: format!("Prefix tree complete with {} word(s).", input.words.len()),
    });

    let metadata = TraceMetadata {
        algorithm_name: "Prefix Tree".to_string(),
        category: "Sequence".to_string(),
        input_size: input.words.len(),
        event_count: events.len(),
        result_summary: format!(
            "Inserted {} word(s) into {} trie nodes.",
            input.words.len(),
            trie_nodes.len()
        ),
    };

    Ok(Trace {
        algorithm: AlgorithmId::PrefixTrie,
        initial_state: VisualizationState::Graph {
            nodes: graph_nodes.clone(),
            edges: edges.clone(),
            source: "n0".to_string(),
            target: None,
            distances: distances.clone(),
            path: Vec::new(),
        },
        final_state: VisualizationState::Graph {
            nodes: graph_nodes,
            edges,
            source: "n0".to_string(),
            target: None,
            distances,
            path: terminal_path,
        },
        events,
        metadata,
    })
}

fn trie_edge_id(from: usize, to: usize) -> String {
    format!("e{from}_{to}")
}

fn layout_trie_nodes(nodes: &[TrieBuildNode]) -> Vec<GraphNode> {
    let max_depth = nodes
        .iter()
        .map(|node| node.depth)
        .max()
        .unwrap_or(0)
        .max(1);
    let mut by_depth = HashMap::<usize, Vec<usize>>::new();
    for (index, node) in nodes.iter().enumerate() {
        by_depth.entry(node.depth).or_default().push(index);
    }

    nodes
        .iter()
        .enumerate()
        .map(|(index, node)| {
            let siblings = by_depth.get(&node.depth).expect("depth bucket exists");
            let position = siblings
                .iter()
                .position(|candidate| *candidate == index)
                .unwrap_or_default();
            GraphNode {
                id: node.id.clone(),
                label: if node.terminal && node.depth > 0 {
                    format!("{}*", node.label)
                } else {
                    node.label.clone()
                },
                x: (position + 1) as f32 / (siblings.len() + 1) as f32,
                y: node.depth as f32 / (max_depth + 1) as f32,
            }
        })
        .collect()
}

fn validate_prefix_trie_sequence(input: &SequenceInput) -> Result<(), AlgorithmError> {
    if input.words.is_empty() {
        return Err(AlgorithmError::new(
            "Prefix Tree input needs a non-empty words array.",
        ));
    }
    if input.words.len() > 24 {
        return Err(AlgorithmError::new(
            "Prefix Tree supports up to 24 words for interactive playback.",
        ));
    }
    for (index, word) in input.words.iter().enumerate() {
        if word.trim().is_empty() {
            return Err(AlgorithmError::new(format!(
                "Prefix Tree word at index {index} cannot be empty."
            )));
        }
        if word.chars().count() > 18 {
            return Err(AlgorithmError::new(format!(
                "Prefix Tree word '{}' is longer than 18 characters.",
                word
            )));
        }
    }
    Ok(())
}

pub fn trace_handshake(input: DistributedInput) -> Result<Trace, AlgorithmError> {
    validate_distributed_input(&input)?;

    let latency = input.latency_ms.max(40);
    let mut events = Vec::new();
    let mut messages = Vec::new();
    let mut states = input
        .peers
        .iter()
        .map(|peer| DistributedPeerState {
            peer: peer.id.clone(),
            state: "idle".to_string(),
        })
        .collect::<Vec<_>>();

    push_distributed_state(
        &mut events,
        &mut states,
        &input.initiator,
        "syn-sent",
        "Initiator opens the handshake and prepares a SYN.",
    );
    push_distributed_message(
        &mut events,
        &mut messages,
        DistributedMessage {
            id: "syn".to_string(),
            from: input.initiator.clone(),
            to: input.responder.clone(),
            label: "SYN".to_string(),
            sent_at: 0,
            deliver_at: latency,
        },
        "Send SYN from initiator to responder.",
    );
    events.push(TraceEvent::DistributedDeliver {
        message_id: "syn".to_string(),
        from: input.initiator.clone(),
        to: input.responder.clone(),
        label: "SYN".to_string(),
        message: "Responder receives SYN and allocates connection state.".to_string(),
    });
    push_distributed_state(
        &mut events,
        &mut states,
        &input.responder,
        "syn-received",
        "Responder records the half-open connection.",
    );

    push_distributed_message(
        &mut events,
        &mut messages,
        DistributedMessage {
            id: "synAck".to_string(),
            from: input.responder.clone(),
            to: input.initiator.clone(),
            label: "SYN-ACK".to_string(),
            sent_at: latency,
            deliver_at: latency * 2,
        },
        "Responder replies with SYN-ACK.",
    );
    events.push(TraceEvent::DistributedDeliver {
        message_id: "synAck".to_string(),
        from: input.responder.clone(),
        to: input.initiator.clone(),
        label: "SYN-ACK".to_string(),
        message: "Initiator receives SYN-ACK and confirms the responder is ready.".to_string(),
    });
    push_distributed_state(
        &mut events,
        &mut states,
        &input.initiator,
        "established",
        "Initiator marks the session established.",
    );

    push_distributed_message(
        &mut events,
        &mut messages,
        DistributedMessage {
            id: "ack".to_string(),
            from: input.initiator.clone(),
            to: input.responder.clone(),
            label: "ACK".to_string(),
            sent_at: latency * 2,
            deliver_at: latency * 3,
        },
        "Initiator sends the final ACK.",
    );
    events.push(TraceEvent::DistributedDeliver {
        message_id: "ack".to_string(),
        from: input.initiator.clone(),
        to: input.responder.clone(),
        label: "ACK".to_string(),
        message: "Responder receives ACK and completes the handshake.".to_string(),
    });
    push_distributed_state(
        &mut events,
        &mut states,
        &input.responder,
        "established",
        "Responder marks the session established.",
    );

    let initial_states = input
        .peers
        .iter()
        .map(|peer| DistributedPeerState {
            peer: peer.id.clone(),
            state: "idle".to_string(),
        })
        .collect::<Vec<_>>();
    let metadata = TraceMetadata {
        algorithm_name: "Handshake Protocol".to_string(),
        category: "Distributed".to_string(),
        input_size: input.peers.len(),
        event_count: events.len(),
        result_summary: format!(
            "{} and {} established a session in three messages.",
            input.initiator, input.responder
        ),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Handshake,
        initial_state: VisualizationState::Distributed {
            peers: input.peers.clone(),
            states: initial_states,
            messages: Vec::new(),
        },
        final_state: VisualizationState::Distributed {
            peers: input.peers,
            states,
            messages,
        },
        events,
        metadata,
    })
}

fn push_distributed_state(
    events: &mut Vec<TraceEvent>,
    states: &mut [DistributedPeerState],
    peer: &str,
    state: &str,
    message: &str,
) {
    if let Some(item) = states.iter_mut().find(|item| item.peer == peer) {
        item.state = state.to_string();
    }
    events.push(TraceEvent::DistributedState {
        peer: peer.to_string(),
        state: state.to_string(),
        message: message.to_string(),
    });
}

fn push_distributed_message(
    events: &mut Vec<TraceEvent>,
    messages: &mut Vec<DistributedMessage>,
    distributed_message: DistributedMessage,
    message: &str,
) {
    events.push(TraceEvent::DistributedSend {
        message_id: distributed_message.id.clone(),
        from: distributed_message.from.clone(),
        to: distributed_message.to.clone(),
        label: distributed_message.label.clone(),
        sent_at: distributed_message.sent_at,
        deliver_at: distributed_message.deliver_at,
        message: message.to_string(),
    });
    messages.push(distributed_message);
}

fn validate_distributed_input(input: &DistributedInput) -> Result<(), AlgorithmError> {
    if input.peers.len() < 2 {
        return Err(AlgorithmError::new(
            "Handshake Protocol needs at least two peers.",
        ));
    }
    if input.peers.len() > 8 {
        return Err(AlgorithmError::new(
            "Handshake Protocol supports up to 8 peers for interactive playback.",
        ));
    }

    let mut peer_ids = HashSet::new();
    for peer in &input.peers {
        if peer.id.trim().is_empty() {
            return Err(AlgorithmError::new("Peer ids cannot be empty."));
        }
        if peer.label.trim().is_empty() {
            return Err(AlgorithmError::new(format!(
                "Peer '{}' needs a non-empty label.",
                peer.id
            )));
        }
        if !peer_ids.insert(peer.id.as_str()) {
            return Err(AlgorithmError::new(format!(
                "Duplicate peer id '{}'.",
                peer.id
            )));
        }
    }
    if !peer_ids.contains(input.initiator.as_str()) {
        return Err(AlgorithmError::new(format!(
            "Initiator peer '{}' does not exist.",
            input.initiator
        )));
    }
    if !peer_ids.contains(input.responder.as_str()) {
        return Err(AlgorithmError::new(format!(
            "Responder peer '{}' does not exist.",
            input.responder
        )));
    }
    if input.initiator == input.responder {
        return Err(AlgorithmError::new(
            "Initiator and responder must be different peers.",
        ));
    }

    Ok(())
}

pub fn trace_time_sync(input: DistributedInput) -> Result<Trace, AlgorithmError> {
    validate_time_sync_input(&input)?;

    let coordinator = time_sync_coordinator(&input);
    let latency = input.latency_ms.max(40);
    let mut tick = 0_u32;
    let offsets = clock_offset_map(&input);
    let mut events = Vec::new();
    let mut messages = Vec::new();
    let mut states = input
        .peers
        .iter()
        .map(|peer| DistributedPeerState {
            peer: peer.id.clone(),
            state: offset_state(*offsets.get(peer.id.as_str()).unwrap_or(&0)),
        })
        .collect::<Vec<_>>();

    push_distributed_state(
        &mut events,
        &mut states,
        &coordinator,
        "coordinator",
        "Coordinator starts a round of clock synchronization.",
    );

    for peer in input.peers.iter().filter(|peer| peer.id != coordinator) {
        let offset = *offsets.get(peer.id.as_str()).unwrap_or(&0);
        let probe_id = format!("probe-{}", peer.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: probe_id.clone(),
                from: coordinator.clone(),
                to: peer.id.clone(),
                label: "TIME?".to_string(),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!("Coordinator requests a time sample from {}.", peer.label),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id: probe_id,
            from: coordinator.clone(),
            to: peer.id.clone(),
            label: "TIME?".to_string(),
            message: format!("{} receives the time sample request.", peer.label),
        });
        push_distributed_state(
            &mut events,
            &mut states,
            &peer.id,
            &offset_state(offset),
            &format!("{} reports local clock offset {} ms.", peer.label, offset),
        );

        tick += latency;
        let report_id = format!("offset-{}", peer.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: report_id.clone(),
                from: peer.id.clone(),
                to: coordinator.clone(),
                label: format!("{offset:+}ms"),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!("{} reports offset {offset:+} ms.", peer.label),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id: report_id,
            from: peer.id.clone(),
            to: coordinator.clone(),
            label: format!("{offset:+}ms"),
            message: format!("Coordinator receives {}'s clock offset.", peer.label),
        });

        tick += latency;
        let adjust_id = format!("adjust-{}", peer.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: adjust_id.clone(),
                from: coordinator.clone(),
                to: peer.id.clone(),
                label: format!("{:+}ms", -offset),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!(
                "Coordinator sends adjustment {:+} ms to {}.",
                -offset, peer.label
            ),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id: adjust_id,
            from: coordinator.clone(),
            to: peer.id.clone(),
            label: format!("{:+}ms", -offset),
            message: format!("{} receives the adjustment.", peer.label),
        });
        push_distributed_state(
            &mut events,
            &mut states,
            &peer.id,
            "synced +0ms",
            &format!(
                "{} applies the adjustment and converges to coordinator time.",
                peer.label
            ),
        );
        tick += latency;
    }

    push_distributed_state(
        &mut events,
        &mut states,
        &coordinator,
        "synced +0ms",
        "Coordinator closes the synchronization round.",
    );

    let initial_states = input
        .peers
        .iter()
        .map(|peer| DistributedPeerState {
            peer: peer.id.clone(),
            state: offset_state(*offsets.get(peer.id.as_str()).unwrap_or(&0)),
        })
        .collect::<Vec<_>>();
    let metadata = TraceMetadata {
        algorithm_name: "Time Synchronization".to_string(),
        category: "Distributed".to_string(),
        input_size: input.peers.len(),
        event_count: events.len(),
        result_summary: format!(
            "Synchronized {} peers to coordinator {}.",
            input.peers.len(),
            coordinator
        ),
    };

    Ok(Trace {
        algorithm: AlgorithmId::TimeSync,
        initial_state: VisualizationState::Distributed {
            peers: input.peers.clone(),
            states: initial_states,
            messages: Vec::new(),
        },
        final_state: VisualizationState::Distributed {
            peers: input.peers,
            states,
            messages,
        },
        events,
        metadata,
    })
}

fn validate_time_sync_input(input: &DistributedInput) -> Result<(), AlgorithmError> {
    validate_distributed_peers(input, "Time Synchronization")?;
    let peer_ids = input
        .peers
        .iter()
        .map(|peer| peer.id.as_str())
        .collect::<HashSet<_>>();
    let coordinator = time_sync_coordinator(input);
    if !peer_ids.contains(coordinator.as_str()) {
        return Err(AlgorithmError::new(format!(
            "Coordinator peer '{}' does not exist.",
            coordinator
        )));
    }
    if input.clock_offsets.is_empty() {
        return Err(AlgorithmError::new(
            "Time Synchronization needs clockOffsets for the peers.",
        ));
    }
    let mut seen_offsets = HashSet::new();
    for offset in &input.clock_offsets {
        if !peer_ids.contains(offset.peer.as_str()) {
            return Err(AlgorithmError::new(format!(
                "Clock offset references unknown peer '{}'.",
                offset.peer
            )));
        }
        if !seen_offsets.insert(offset.peer.as_str()) {
            return Err(AlgorithmError::new(format!(
                "Duplicate clock offset for peer '{}'.",
                offset.peer
            )));
        }
    }
    Ok(())
}

fn validate_distributed_peers(input: &DistributedInput, label: &str) -> Result<(), AlgorithmError> {
    if input.peers.len() < 2 {
        return Err(AlgorithmError::new(format!(
            "{label} needs at least two peers."
        )));
    }
    if input.peers.len() > 8 {
        return Err(AlgorithmError::new(format!(
            "{label} supports up to 8 peers for interactive playback."
        )));
    }
    let mut peer_ids = HashSet::new();
    for peer in &input.peers {
        if peer.id.trim().is_empty() {
            return Err(AlgorithmError::new("Peer ids cannot be empty."));
        }
        if peer.label.trim().is_empty() {
            return Err(AlgorithmError::new(format!(
                "Peer '{}' needs a non-empty label.",
                peer.id
            )));
        }
        if !peer_ids.insert(peer.id.as_str()) {
            return Err(AlgorithmError::new(format!(
                "Duplicate peer id '{}'.",
                peer.id
            )));
        }
    }
    Ok(())
}

fn time_sync_coordinator(input: &DistributedInput) -> String {
    input
        .coordinator
        .as_ref()
        .filter(|coordinator| !coordinator.trim().is_empty())
        .cloned()
        .unwrap_or_else(|| input.peers[0].id.clone())
}

fn clock_offset_map(input: &DistributedInput) -> HashMap<&str, i32> {
    input
        .clock_offsets
        .iter()
        .map(|offset| (offset.peer.as_str(), offset.offset_ms))
        .collect()
}

fn offset_state(offset: i32) -> String {
    if offset == 0 {
        "synced +0ms".to_string()
    } else {
        format!("offset {offset:+}ms")
    }
}

pub fn trace_paxos(input: DistributedInput) -> Result<Trace, AlgorithmError> {
    validate_paxos_input(&input)?;

    let proposer = paxos_role_peers(&input, "proposer")[0].clone();
    let acceptors = paxos_role_peers(&input, "acceptor");
    let learner = paxos_role_peers(&input, "learner")[0].clone();
    let quorum = acceptors.len() / 2 + 1;
    let latency = input.latency_ms.max(40);
    let proposal = input.proposal_value.clone();
    let mut tick = 0_u32;
    let mut events = Vec::new();
    let mut messages = Vec::new();
    let mut states = input
        .peers
        .iter()
        .map(|peer| DistributedPeerState {
            peer: peer.id.clone(),
            state: peer.role.clone().unwrap_or_else(|| "idle".to_string()),
        })
        .collect::<Vec<_>>();

    push_distributed_state(
        &mut events,
        &mut states,
        &proposer.id,
        "prepare n=1",
        "Proposer starts ballot n=1 and asks acceptors to promise.",
    );
    for acceptor in &acceptors {
        let message_id = format!("prepare-{}", acceptor.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: message_id.clone(),
                from: proposer.id.clone(),
                to: acceptor.id.clone(),
                label: "PREPARE n=1".to_string(),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!("Proposer sends PREPARE n=1 to {}.", acceptor.label),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id,
            from: proposer.id.clone(),
            to: acceptor.id.clone(),
            label: "PREPARE n=1".to_string(),
            message: format!("{} receives prepare request n=1.", acceptor.label),
        });
        push_distributed_state(
            &mut events,
            &mut states,
            &acceptor.id,
            "promised n=1",
            &format!("{} promises not to accept older ballots.", acceptor.label),
        );
    }

    tick += latency;
    for acceptor in &acceptors {
        let message_id = format!("promise-{}", acceptor.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: message_id.clone(),
                from: acceptor.id.clone(),
                to: proposer.id.clone(),
                label: "PROMISE".to_string(),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!("{} promises ballot n=1.", acceptor.label),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id,
            from: acceptor.id.clone(),
            to: proposer.id.clone(),
            label: "PROMISE".to_string(),
            message: format!("Proposer receives promise from {}.", acceptor.label),
        });
    }
    push_distributed_state(
        &mut events,
        &mut states,
        &proposer.id,
        "quorum promised",
        &format!("Proposer has a quorum of {quorum} promises."),
    );

    tick += latency;
    for acceptor in &acceptors {
        let message_id = format!("accept-{}", acceptor.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: message_id.clone(),
                from: proposer.id.clone(),
                to: acceptor.id.clone(),
                label: format!("ACCEPT {proposal}"),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!("Proposer asks {} to accept '{}'.", acceptor.label, proposal),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id,
            from: proposer.id.clone(),
            to: acceptor.id.clone(),
            label: format!("ACCEPT {proposal}"),
            message: format!(
                "{} receives accept request for '{}'.",
                acceptor.label, proposal
            ),
        });
        push_distributed_state(
            &mut events,
            &mut states,
            &acceptor.id,
            &format!("accepted {proposal}"),
            &format!("{} accepts value '{}'.", acceptor.label, proposal),
        );
    }

    tick += latency;
    for acceptor in &acceptors {
        let message_id = format!("accepted-{}", acceptor.id);
        push_distributed_message(
            &mut events,
            &mut messages,
            DistributedMessage {
                id: message_id.clone(),
                from: acceptor.id.clone(),
                to: learner.id.clone(),
                label: "ACCEPTED".to_string(),
                sent_at: tick,
                deliver_at: tick + latency,
            },
            &format!(
                "{} notifies learner that '{}' was accepted.",
                acceptor.label, proposal
            ),
        );
        events.push(TraceEvent::DistributedDeliver {
            message_id,
            from: acceptor.id.clone(),
            to: learner.id.clone(),
            label: "ACCEPTED".to_string(),
            message: format!("Learner receives accepted notice from {}.", acceptor.label),
        });
    }
    push_distributed_state(
        &mut events,
        &mut states,
        &learner.id,
        &format!("chosen {proposal}"),
        &format!("Learner observes quorum and chooses '{}'.", proposal),
    );
    push_distributed_state(
        &mut events,
        &mut states,
        &proposer.id,
        &format!("chosen {proposal}"),
        "Proposer observes the chosen value.",
    );

    let initial_states = input
        .peers
        .iter()
        .map(|peer| DistributedPeerState {
            peer: peer.id.clone(),
            state: peer.role.clone().unwrap_or_else(|| "idle".to_string()),
        })
        .collect::<Vec<_>>();
    let metadata = TraceMetadata {
        algorithm_name: "Paxos".to_string(),
        category: "Distributed".to_string(),
        input_size: input.peers.len(),
        event_count: events.len(),
        result_summary: format!(
            "Chosen value '{}' with quorum {}/{}.",
            proposal,
            quorum,
            acceptors.len()
        ),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Paxos,
        initial_state: VisualizationState::Distributed {
            peers: input.peers.clone(),
            states: initial_states,
            messages: Vec::new(),
        },
        final_state: VisualizationState::Distributed {
            peers: input.peers,
            states,
            messages,
        },
        events,
        metadata,
    })
}

fn validate_paxos_input(input: &DistributedInput) -> Result<(), AlgorithmError> {
    validate_distributed_peers(input, "Paxos")?;
    let proposers = paxos_role_peers(input, "proposer");
    let acceptors = paxos_role_peers(input, "acceptor");
    let learners = paxos_role_peers(input, "learner");
    if proposers.len() != 1 {
        return Err(AlgorithmError::new(
            "Paxos needs exactly one proposer peer.",
        ));
    }
    if acceptors.len() < 3 {
        return Err(AlgorithmError::new(
            "Paxos needs at least three acceptor peers.",
        ));
    }
    if learners.is_empty() {
        return Err(AlgorithmError::new(
            "Paxos needs at least one learner peer.",
        ));
    }
    if input.proposal_value.trim().is_empty() {
        return Err(AlgorithmError::new(
            "Paxos needs a non-empty proposalValue.",
        ));
    }
    Ok(())
}

fn paxos_role_peers(input: &DistributedInput, role: &str) -> Vec<DistributedPeer> {
    input
        .peers
        .iter()
        .filter(|peer| peer.role.as_deref() == Some(role))
        .cloned()
        .collect()
}

pub fn trace_levenshtein(input: SequenceInput) -> Result<Trace, AlgorithmError> {
    validate_edit_distance_sequence(&input)?;

    let source = input.text;
    let target = input.pattern;
    let source_chars = source.chars().collect::<Vec<_>>();
    let target_chars = target.chars().collect::<Vec<_>>();
    let rows = source_chars.len() + 1;
    let cols = target_chars.len() + 1;
    let mut matrix = vec![vec![None; cols]; rows];
    let mut events = Vec::new();

    for (row, row_values) in matrix.iter_mut().enumerate() {
        row_values[0] = Some(row);
    }
    for col in 0..cols {
        matrix[0][col] = Some(col);
    }

    for row in 1..rows {
        for col in 1..cols {
            let cost = usize::from(source_chars[row - 1] != target_chars[col - 1]);
            let deletion = matrix[row - 1][col].expect("initialized") + 1;
            let insertion = matrix[row][col - 1].expect("initialized") + 1;
            let substitution = matrix[row - 1][col - 1].expect("initialized") + cost;
            let value = deletion.min(insertion).min(substitution);
            let operation = if value == substitution && cost == 0 {
                "match"
            } else if value == substitution {
                "substitute"
            } else if value == deletion {
                "delete"
            } else {
                "insert"
            }
            .to_string();

            matrix[row][col] = Some(value);
            events.push(TraceEvent::SequenceEditCell {
                row,
                col,
                deletion,
                insertion,
                substitution,
                value,
                operation: operation.clone(),
                matrix: matrix.clone(),
                message: format!("Set cell ({row}, {col}) to {value} using {operation}."),
            });
        }
    }

    let distance = matrix[rows - 1][cols - 1].expect("final distance");
    let metadata = TraceMetadata {
        algorithm_name: "Levenshtein Distance".to_string(),
        category: "Sequence".to_string(),
        input_size: source_chars.len().max(target_chars.len()),
        event_count: events.len(),
        result_summary: format!("Edit distance is {distance}."),
    };

    Ok(Trace {
        algorithm: AlgorithmId::Levenshtein,
        initial_state: VisualizationState::Sequence {
            text: source.clone(),
            pattern: target.clone(),
            lps: Vec::new(),
            matches: Vec::new(),
            matrix: initial_edit_matrix(rows, cols),
        },
        final_state: VisualizationState::Sequence {
            text: source,
            pattern: target,
            lps: Vec::new(),
            matches: Vec::new(),
            matrix,
        },
        events,
        metadata,
    })
}

fn validate_edit_distance_sequence(input: &SequenceInput) -> Result<(), AlgorithmError> {
    if input.text.is_empty() {
        return Err(AlgorithmError::new(
            "Levenshtein source text cannot be empty.",
        ));
    }
    if input.pattern.is_empty() {
        return Err(AlgorithmError::new(
            "Levenshtein target text cannot be empty.",
        ));
    }
    if input.text.chars().count() > 24 {
        return Err(AlgorithmError::new(
            "Levenshtein source text is capped at 24 characters for interactive playback.",
        ));
    }
    if input.pattern.chars().count() > 24 {
        return Err(AlgorithmError::new(
            "Levenshtein target text is capped at 24 characters for interactive playback.",
        ));
    }
    Ok(())
}

fn initial_edit_matrix(rows: usize, cols: usize) -> Vec<Vec<Option<usize>>> {
    let mut matrix = vec![vec![None; cols]; rows];
    for (row, row_values) in matrix.iter_mut().enumerate() {
        row_values[0] = Some(row);
    }
    for col in 0..cols {
        matrix[0][col] = Some(col);
    }
    matrix
}

#[derive(Debug, Clone)]
struct AdjacencyEdge {
    edge_id: String,
    to: String,
    weight: u32,
}

fn build_adjacency(edges: &[GraphEdge]) -> HashMap<String, Vec<AdjacencyEdge>> {
    let mut adjacency: HashMap<String, Vec<AdjacencyEdge>> = HashMap::new();
    for edge in edges {
        adjacency
            .entry(edge.from.clone())
            .or_default()
            .push(AdjacencyEdge {
                edge_id: edge.id.clone(),
                to: edge.to.clone(),
                weight: edge.weight,
            });

        if !edge.directed {
            adjacency
                .entry(edge.to.clone())
                .or_default()
                .push(AdjacencyEdge {
                    edge_id: edge.id.clone(),
                    to: edge.from.clone(),
                    weight: edge.weight,
                });
        }
    }
    adjacency
}

fn graph_heuristic(
    node: &str,
    target: Option<&str>,
    positions: &HashMap<String, (f32, f32)>,
    min_positive_weight: Option<u32>,
) -> u32 {
    let Some(target) = target else {
        return 0;
    };
    let Some(min_positive_weight) = min_positive_weight else {
        return 0;
    };
    let (Some((x1, y1)), Some((x2, y2))) = (positions.get(node), positions.get(target)) else {
        return 0;
    };

    let dx = x1 - x2;
    let dy = y1 - y2;
    ((dx * dx + dy * dy).sqrt() * min_positive_weight as f32).floor() as u32
}

fn validate_graph(input: &GraphInput) -> Result<(), AlgorithmError> {
    if input.nodes.is_empty() {
        return Err(AlgorithmError::new("Graph input needs at least one node."));
    }

    let mut node_ids = HashSet::new();
    for node in &input.nodes {
        if node.id.trim().is_empty() {
            return Err(AlgorithmError::new("Graph node ids cannot be empty."));
        }
        if !node_ids.insert(node.id.clone()) {
            return Err(AlgorithmError::new(format!(
                "Graph contains duplicate node id '{}'.",
                node.id
            )));
        }
    }

    if !node_ids.contains(&input.source) {
        return Err(AlgorithmError::new(format!(
            "Source node '{}' does not exist.",
            input.source
        )));
    }

    if let Some(target) = &input.target {
        if !node_ids.contains(target) {
            return Err(AlgorithmError::new(format!(
                "Target node '{target}' does not exist."
            )));
        }
    }

    let mut edge_ids = HashSet::new();
    for edge in &input.edges {
        if edge.id.trim().is_empty() {
            return Err(AlgorithmError::new("Graph edge ids cannot be empty."));
        }
        if !edge_ids.insert(edge.id.clone()) {
            return Err(AlgorithmError::new(format!(
                "Graph contains duplicate edge id '{}'.",
                edge.id
            )));
        }
        if !node_ids.contains(&edge.from) {
            return Err(AlgorithmError::new(format!(
                "Edge '{}' starts at unknown node '{}'.",
                edge.id, edge.from
            )));
        }
        if !node_ids.contains(&edge.to) {
            return Err(AlgorithmError::new(format!(
                "Edge '{}' ends at unknown node '{}'.",
                edge.id, edge.to
            )));
        }
    }

    Ok(())
}

fn validate_mst_graph(input: &GraphInput) -> Result<(), AlgorithmError> {
    if input.edges.is_empty() {
        return Err(AlgorithmError::new(
            "MST algorithms require at least one weighted edge.",
        ));
    }
    if let Some(edge) = input.edges.iter().find(|edge| edge.directed) {
        return Err(AlgorithmError::new(format!(
            "MST algorithms require undirected edges; edge '{}' is directed.",
            edge.id
        )));
    }
    Ok(())
}

fn validate_topological_graph(input: &GraphInput) -> Result<(), AlgorithmError> {
    if input.edges.is_empty() {
        return Err(AlgorithmError::new(
            "Topological Sort requires at least one directed edge.",
        ));
    }
    if let Some(edge) = input.edges.iter().find(|edge| !edge.directed) {
        return Err(AlgorithmError::new(format!(
            "Topological Sort requires directed edges; edge '{}' is undirected.",
            edge.id
        )));
    }
    Ok(())
}

struct UnionFind {
    parent: HashMap<String, String>,
    rank: HashMap<String, usize>,
}

impl UnionFind {
    fn new(nodes: &[String]) -> Self {
        Self {
            parent: nodes
                .iter()
                .map(|node| (node.clone(), node.clone()))
                .collect::<HashMap<_, _>>(),
            rank: nodes
                .iter()
                .map(|node| (node.clone(), 0))
                .collect::<HashMap<_, _>>(),
        }
    }

    fn find(&mut self, node: &str) -> String {
        let parent = self
            .parent
            .get(node)
            .cloned()
            .unwrap_or_else(|| node.to_string());
        if parent != node {
            let root = self.find(&parent);
            self.parent.insert(node.to_string(), root.clone());
            root
        } else {
            parent
        }
    }

    fn connected(&mut self, left: &str, right: &str) -> bool {
        self.find(left) == self.find(right)
    }

    fn union(&mut self, left: &str, right: &str) {
        let left_root = self.find(left);
        let right_root = self.find(right);
        if left_root == right_root {
            return;
        }

        let left_rank = *self.rank.get(&left_root).unwrap_or(&0);
        let right_rank = *self.rank.get(&right_root).unwrap_or(&0);
        if left_rank < right_rank {
            self.parent.insert(left_root, right_root);
        } else if left_rank > right_rank {
            self.parent.insert(right_root, left_root);
        } else {
            self.parent.insert(right_root.clone(), left_root.clone());
            self.rank.insert(left_root, left_rank + 1);
        }
    }
}

fn reconstruct_path(
    source: &str,
    target: &str,
    previous: &HashMap<String, String>,
    distances: &HashMap<String, Option<u32>>,
) -> (Vec<String>, Option<u32>) {
    let total_distance = distances.get(target).copied().flatten();
    if total_distance.is_none() {
        return (Vec::new(), None);
    }

    if source == target {
        return (vec![source.to_string()], total_distance);
    }

    let mut path = vec![target.to_string()];
    let mut current = target;
    while current != source {
        let Some(parent) = previous.get(current) else {
            return (Vec::new(), None);
        };
        path.push(parent.clone());
        current = parent;
    }
    path.reverse();
    (path, total_distance)
}

fn example_graph() -> GraphInput {
    GraphInput {
        nodes: vec![
            GraphNode {
                id: "A".to_string(),
                label: "A".to_string(),
                x: 0.13,
                y: 0.48,
            },
            GraphNode {
                id: "B".to_string(),
                label: "B".to_string(),
                x: 0.35,
                y: 0.22,
            },
            GraphNode {
                id: "C".to_string(),
                label: "C".to_string(),
                x: 0.39,
                y: 0.72,
            },
            GraphNode {
                id: "D".to_string(),
                label: "D".to_string(),
                x: 0.62,
                y: 0.32,
            },
            GraphNode {
                id: "E".to_string(),
                label: "E".to_string(),
                x: 0.66,
                y: 0.78,
            },
            GraphNode {
                id: "F".to_string(),
                label: "F".to_string(),
                x: 0.87,
                y: 0.53,
            },
        ],
        edges: vec![
            edge("AB", "A", "B", 4),
            edge("AC", "A", "C", 2),
            edge("BC", "B", "C", 1),
            edge("BD", "B", "D", 5),
            edge("CD", "C", "D", 8),
            edge("CE", "C", "E", 10),
            edge("DE", "D", "E", 2),
            edge("DF", "D", "F", 6),
            edge("EF", "E", "F", 3),
        ],
        source: "A".to_string(),
        target: Some("F".to_string()),
    }
}

fn example_dag() -> GraphInput {
    GraphInput {
        nodes: vec![
            GraphNode {
                id: "A".to_string(),
                label: "A".to_string(),
                x: 0.12,
                y: 0.5,
            },
            GraphNode {
                id: "B".to_string(),
                label: "B".to_string(),
                x: 0.32,
                y: 0.24,
            },
            GraphNode {
                id: "C".to_string(),
                label: "C".to_string(),
                x: 0.32,
                y: 0.72,
            },
            GraphNode {
                id: "D".to_string(),
                label: "D".to_string(),
                x: 0.56,
                y: 0.32,
            },
            GraphNode {
                id: "E".to_string(),
                label: "E".to_string(),
                x: 0.58,
                y: 0.74,
            },
            GraphNode {
                id: "F".to_string(),
                label: "F".to_string(),
                x: 0.86,
                y: 0.52,
            },
        ],
        edges: vec![
            directed_edge("AB", "A", "B", 1),
            directed_edge("AC", "A", "C", 1),
            directed_edge("BD", "B", "D", 1),
            directed_edge("CD", "C", "D", 1),
            directed_edge("CE", "C", "E", 1),
            directed_edge("DF", "D", "F", 1),
            directed_edge("EF", "E", "F", 1),
        ],
        source: "A".to_string(),
        target: Some("F".to_string()),
    }
}

fn edge(id: &str, from: &str, to: &str, weight: u32) -> GraphEdge {
    GraphEdge {
        id: id.to_string(),
        from: from.to_string(),
        to: to.to_string(),
        weight,
        label: None,
        directed: false,
    }
}

fn directed_edge(id: &str, from: &str, to: &str, weight: u32) -> GraphEdge {
    GraphEdge {
        id: id.to_string(),
        from: from.to_string(),
        to: to.to_string(),
        weight,
        label: None,
        directed: true,
    }
}

#[cfg(test)]
mod tests {
    use std::collections::HashSet;

    use super::*;

    #[test]
    fn quicksort_trace_sorts_values() {
        let trace = trace_quicksort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPivot { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn quicksort_trace_handles_empty_input() {
        let trace = trace_quicksort(SortInput {
            values: Vec::new(),
            target_index: None,
        })
        .expect("trace");

        assert!(trace.events.is_empty());
        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: Vec::new() }
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn insertion_sort_trace_sorts_values() {
        let trace = trace_insertion_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn bubble_sort_trace_sorts_values() {
        let trace = trace_bubble_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn cocktail_shaker_sort_trace_sorts_values() {
        let trace = trace_cocktail_shaker_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn cocktail_shaker_sort_handles_empty_input() {
        let trace = trace_cocktail_shaker_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn odd_even_sort_trace_sorts_values() {
        let trace = trace_odd_even_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn odd_even_sort_handles_empty_input() {
        let trace = trace_odd_even_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn selection_sort_trace_sorts_values() {
        let trace = trace_selection_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn shell_sort_trace_sorts_values() {
        let trace = trace_shell_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn counting_sort_trace_sorts_values() {
        let trace = trace_counting_sort(SortInput {
            values: vec![9, 3, 7, 1, 4, 3],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn counting_sort_rejects_negative_values() {
        let error = trace_counting_sort(SortInput {
            values: vec![3, -1, 2],
            target_index: None,
        })
        .expect_err("invalid counting sort input");

        assert!(error.message().contains("non-negative"));
    }

    #[test]
    fn radix_sort_trace_sorts_values() {
        let trace = trace_radix_sort(SortInput {
            values: vec![90, 3, 17, 1, 40, 3],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 3, 17, 40, 90]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn radix_sort_handles_empty_input() {
        let trace = trace_radix_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn radix_sort_rejects_negative_values() {
        let error = trace_radix_sort(SortInput {
            values: vec![3, -1, 2],
            target_index: None,
        })
        .expect_err("invalid radix sort input");

        assert!(error.message().contains("non-negative"));
    }

    #[test]
    fn bucket_sort_trace_sorts_values() {
        let trace = trace_bucket_sort(SortInput {
            values: vec![42, 3, 17, 1, 40, 3],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 3, 17, 40, 42]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn bucket_sort_handles_empty_input() {
        let trace = trace_bucket_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn bucket_sort_rejects_negative_values() {
        let error = trace_bucket_sort(SortInput {
            values: vec![3, -1, 2],
            target_index: None,
        })
        .expect_err("invalid bucket sort input");

        assert!(error.message().contains("non-negative"));
    }

    #[test]
    fn comb_sort_trace_sorts_values() {
        let trace = trace_comb_sort(SortInput {
            values: vec![9, 3, 7, 1, 4, 8],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 8, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn comb_sort_handles_empty_input() {
        let trace = trace_comb_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn mergesort_trace_sorts_values() {
        let trace = trace_mergesort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn timsort_trace_sorts_values() {
        let trace = trace_timsort(SortInput {
            values: vec![
                20, 21, 22, 9, 3, 7, 1, 4, 30, 31, 18, 12, 11, 10, 40, 41, 5, 6,
            ],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![
                    1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 18, 20, 21, 22, 30, 31, 40, 41
                ]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn timsort_handles_empty_input() {
        let trace = trace_timsort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn heap_sort_trace_sorts_values() {
        let trace = trace_heap_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn pancake_sort_trace_sorts_values() {
        let trace = trace_pancake_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 3, 4, 7, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn pancake_sort_handles_empty_input() {
        let trace = trace_pancake_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn quickselect_trace_selects_target_index() {
        let trace = trace_quickselect(SortInput {
            values: vec![9, 3, 7, 1, 4],
            target_index: Some(2),
        })
        .expect("trace");

        let VisualizationState::Array { values } = &trace.final_state else {
            panic!("quickselect must finish with array state");
        };
        assert_eq!(values[2], 4);
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPivot { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert_valid_quickselect_trace(&trace);
    }

    #[test]
    fn quickselect_defaults_to_median_index() {
        let trace = trace_quickselect(SortInput {
            values: vec![10, 2, 8, 4, 6],
            target_index: None,
        })
        .expect("trace");

        let VisualizationState::Array { values } = &trace.final_state else {
            panic!("quickselect must finish with array state");
        };
        assert_eq!(values[2], 6);
        assert_valid_quickselect_trace(&trace);
    }

    #[test]
    fn quickselect_rejects_out_of_bounds_target() {
        let error = trace_quickselect(SortInput {
            values: vec![3, 1, 2],
            target_index: Some(3),
        })
        .expect_err("invalid quickselect target");

        assert!(error.message().contains("outside"));
    }

    #[test]
    fn bitonic_sort_trace_sorts_values() {
        let trace = trace_bitonic_sort(SortInput {
            values: vec![9, 3, 7, 1, 4, 8, 2, 6],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array {
                values: vec![1, 2, 3, 4, 6, 7, 8, 9]
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortPartition { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortCompare { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SortSwap { .. }))
        );
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn bitonic_sort_handles_empty_input() {
        let trace = trace_bitonic_sort(SortInput {
            values: vec![],
            target_index: None,
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Array { values: vec![] }
        );
        assert!(trace.events.is_empty());
        assert_valid_sort_trace(&trace);
    }

    #[test]
    fn bitonic_sort_rejects_non_power_of_two_lengths() {
        let error = trace_bitonic_sort(SortInput {
            values: vec![3, 1, 2],
            target_index: None,
        })
        .expect_err("invalid bitonic input");

        assert!(error.message().contains("power-of-two"));
    }

    #[test]
    fn bfs_trace_finds_shortest_unweighted_path() {
        let trace = trace_bfs(example_graph(), true).expect("trace");

        let path = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphPath {
                nodes,
                total_distance,
                ..
            } => Some((nodes.clone(), *total_distance)),
            _ => None,
        });

        assert_eq!(
            path,
            Some((
                vec![
                    "A".to_string(),
                    "B".to_string(),
                    "D".to_string(),
                    "F".to_string()
                ],
                Some(3)
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn dfs_trace_finds_depth_first_target_path() {
        let trace = trace_dfs(example_graph(), true).expect("trace");

        let path = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphPath {
                nodes,
                total_distance,
                ..
            } => Some((nodes.clone(), *total_distance)),
            _ => None,
        });

        assert_eq!(
            path,
            Some((
                vec![
                    "A".to_string(),
                    "B".to_string(),
                    "D".to_string(),
                    "F".to_string()
                ],
                Some(3)
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn dijkstra_trace_finds_shortest_path() {
        let trace = trace_dijkstra(example_graph(), true).expect("trace");

        let path = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphPath {
                nodes,
                total_distance,
                ..
            } => Some((nodes.clone(), *total_distance)),
            _ => None,
        });

        assert_eq!(
            path,
            Some((
                vec![
                    "A".to_string(),
                    "C".to_string(),
                    "B".to_string(),
                    "D".to_string(),
                    "E".to_string(),
                    "F".to_string()
                ],
                Some(13)
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn bellman_ford_trace_finds_shortest_path() {
        let trace = trace_bellman_ford(example_graph()).expect("trace");

        let path = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphPath {
                nodes,
                total_distance,
                ..
            } => Some((nodes.clone(), *total_distance)),
            _ => None,
        });

        assert_eq!(
            path,
            Some((
                vec![
                    "A".to_string(),
                    "C".to_string(),
                    "B".to_string(),
                    "D".to_string(),
                    "E".to_string(),
                    "F".to_string()
                ],
                Some(13)
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn a_star_trace_finds_shortest_path() {
        let trace = trace_a_star(example_graph(), true).expect("trace");

        let path = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphPath {
                nodes,
                total_distance,
                ..
            } => Some((nodes.clone(), *total_distance)),
            _ => None,
        });

        assert_eq!(
            path,
            Some((
                vec![
                    "A".to_string(),
                    "C".to_string(),
                    "B".to_string(),
                    "D".to_string(),
                    "E".to_string(),
                    "F".to_string()
                ],
                Some(13)
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn dijkstra_rejects_edges_with_unknown_nodes() {
        let mut graph = example_graph();
        graph.edges.push(GraphEdge {
            id: "bad".to_string(),
            from: "A".to_string(),
            to: "Z".to_string(),
            weight: 1,
            label: None,
            directed: false,
        });

        let error = trace_dijkstra(graph, true).expect_err("invalid graph");
        assert!(error.message().contains("unknown node"));
    }

    #[test]
    fn prim_mst_trace_finds_minimum_spanning_tree() {
        let trace = trace_prim_mst(example_graph()).expect("trace");

        let tree = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphSpanningTree {
                edge_ids,
                total_weight,
                ..
            } => Some((edge_ids.clone(), *total_weight)),
            _ => None,
        });

        assert_eq!(
            tree,
            Some((
                vec![
                    "AC".to_string(),
                    "BC".to_string(),
                    "BD".to_string(),
                    "DE".to_string(),
                    "EF".to_string()
                ],
                13
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn kruskal_trace_finds_minimum_spanning_tree() {
        let trace = trace_kruskal(example_graph()).expect("trace");

        let tree = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphSpanningTree {
                edge_ids,
                total_weight,
                ..
            } => Some((edge_ids.clone(), *total_weight)),
            _ => None,
        });

        assert_eq!(
            tree,
            Some((
                vec![
                    "BC".to_string(),
                    "AC".to_string(),
                    "DE".to_string(),
                    "EF".to_string(),
                    "BD".to_string()
                ],
                13
            ))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn prim_mst_rejects_directed_edges() {
        let mut graph = example_graph();
        graph.edges[0].directed = true;

        let error = trace_prim_mst(graph).expect_err("invalid graph");
        assert!(error.message().contains("undirected"));
    }

    #[test]
    fn kruskal_rejects_directed_edges() {
        let mut graph = example_graph();
        graph.edges[0].directed = true;

        let error = trace_kruskal(graph).expect_err("invalid graph");
        assert!(error.message().contains("undirected"));
    }

    #[test]
    fn topological_sort_trace_orders_dag() {
        let graph = example_dag();
        let trace = trace_topological_sort(graph.clone()).expect("trace");

        let order = trace.events.iter().find_map(|event| match event {
            TraceEvent::GraphPath { nodes, .. } => Some(nodes.clone()),
            _ => None,
        });
        let order = order.expect("topological path event");
        let positions = order
            .iter()
            .enumerate()
            .map(|(index, node)| (node.as_str(), index))
            .collect::<HashMap<_, _>>();

        assert_eq!(order.len(), graph.nodes.len());
        for edge in graph.edges {
            assert!(positions[edge.from.as_str()] < positions[edge.to.as_str()]);
        }
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphVisit { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphConsiderEdge { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphRelaxEdge { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphSettle { .. }))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn topological_sort_rejects_undirected_edges() {
        let mut graph = example_dag();
        graph.edges[0].directed = false;

        let error = trace_topological_sort(graph).expect_err("invalid graph");
        assert!(error.message().contains("directed"));
    }

    #[test]
    fn topological_sort_rejects_cycles() {
        let mut graph = example_dag();
        graph.edges.push(directed_edge("FB", "F", "B", 1));

        let error = trace_topological_sort(graph).expect_err("invalid graph");
        assert!(error.message().contains("acyclic"));
    }

    #[test]
    fn kmp_trace_finds_pattern_matches() {
        let trace = trace_kmp(SequenceInput {
            text: "ababcabcabababd".to_string(),
            pattern: "ababd".to_string(),
            words: Vec::new(),
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Sequence {
                text: "ababcabcabababd".to_string(),
                pattern: "ababd".to_string(),
                lps: vec![0, 0, 1, 2, 0],
                matches: vec![10],
                matrix: Vec::new(),
            }
        );
        assert_valid_sequence_trace(&trace);
    }

    #[test]
    fn kmp_rejects_empty_pattern() {
        let error = trace_kmp(SequenceInput {
            text: "abc".to_string(),
            pattern: String::new(),
            words: Vec::new(),
        })
        .expect_err("invalid sequence input");

        assert!(error.message().contains("pattern"));
    }

    #[test]
    fn boyer_moore_trace_finds_pattern_matches() {
        let trace = trace_boyer_moore(SequenceInput {
            text: "here is a simple example".to_string(),
            pattern: "example".to_string(),
            words: Vec::new(),
        })
        .expect("trace");

        assert_eq!(
            trace.final_state,
            VisualizationState::Sequence {
                text: "here is a simple example".to_string(),
                pattern: "example".to_string(),
                lps: Vec::new(),
                matches: vec![17],
                matrix: Vec::new(),
            }
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SequenceCompare { matched: false, .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::SequenceFallback { .. }))
        );
        assert_valid_sequence_trace(&trace);
    }

    #[test]
    fn boyer_moore_rejects_pattern_longer_than_text() {
        let error = trace_boyer_moore(SequenceInput {
            text: "abc".to_string(),
            pattern: "abcd".to_string(),
            words: Vec::new(),
        })
        .expect_err("invalid sequence input");

        assert!(error.message().contains("longer"));
    }

    #[test]
    fn prefix_trie_trace_builds_shared_prefix_tree() {
        let trace = trace_prefix_trie(SequenceInput {
            text: String::new(),
            pattern: String::new(),
            words: vec![
                "tea".to_string(),
                "team".to_string(),
                "ted".to_string(),
                "ten".to_string(),
            ],
        })
        .expect("trace");

        let VisualizationState::Graph {
            nodes, edges, path, ..
        } = &trace.final_state
        else {
            panic!("prefix trie must finish with graph state");
        };
        assert!(nodes.len() < 1 + "tea".len() + "team".len() + "ted".len() + "ten".len());
        assert!(edges.iter().all(|edge| edge.directed));
        assert!(edges.iter().any(|edge| edge.label.as_deref() == Some("t")));
        assert_eq!(path.len(), 4);
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphSelectEdge { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphConsiderEdge { .. }))
        );
        assert!(
            trace
                .events
                .iter()
                .any(|event| matches!(event, TraceEvent::GraphSettle { .. }))
        );
        assert_valid_graph_trace(&trace);
    }

    #[test]
    fn prefix_trie_rejects_empty_words() {
        let error = trace_prefix_trie(SequenceInput {
            text: String::new(),
            pattern: String::new(),
            words: vec!["tea".to_string(), String::new()],
        })
        .expect_err("invalid trie input");

        assert!(error.message().contains("cannot be empty"));
    }

    #[test]
    fn levenshtein_trace_computes_edit_distance() {
        let trace = trace_levenshtein(SequenceInput {
            text: "kitten".to_string(),
            pattern: "sitting".to_string(),
            words: Vec::new(),
        })
        .expect("trace");

        let VisualizationState::Sequence { matrix, .. } = &trace.final_state else {
            panic!("expected sequence state");
        };
        assert_eq!(
            matrix.last().and_then(|row| row.last()).copied().flatten(),
            Some(3)
        );
        assert_valid_sequence_trace(&trace);
    }

    #[test]
    fn levenshtein_rejects_empty_target() {
        let error = trace_levenshtein(SequenceInput {
            text: "abc".to_string(),
            pattern: String::new(),
            words: Vec::new(),
        })
        .expect_err("invalid sequence input");

        assert!(error.message().contains("target"));
    }

    #[test]
    fn handshake_trace_establishes_session() {
        let trace = trace_handshake(DistributedInput {
            peers: vec![
                DistributedPeer {
                    id: "a".to_string(),
                    label: "A".to_string(),
                    role: None,
                },
                DistributedPeer {
                    id: "b".to_string(),
                    label: "B".to_string(),
                    role: None,
                },
            ],
            initiator: "a".to_string(),
            responder: "b".to_string(),
            coordinator: None,
            latency_ms: 80,
            clock_offsets: Vec::new(),
            proposal_value: String::new(),
        })
        .expect("trace");

        let VisualizationState::Distributed {
            states, messages, ..
        } = &trace.final_state
        else {
            panic!("handshake must finish with distributed state");
        };
        assert_eq!(messages.len(), 3);
        assert!(messages.iter().any(|message| message.label == "SYN"));
        assert!(messages.iter().any(|message| message.label == "SYN-ACK"));
        assert!(messages.iter().any(|message| message.label == "ACK"));
        assert!(
            states
                .iter()
                .filter(|state| state.state == "established")
                .count()
                >= 2
        );
        assert!(trace.events.iter().any(|event| matches!(
            event,
            TraceEvent::DistributedDeliver { label, .. } if label == "ACK"
        )));
        assert_valid_distributed_trace(&trace);
    }

    #[test]
    fn handshake_rejects_same_initiator_and_responder() {
        let error = trace_handshake(DistributedInput {
            peers: vec![
                DistributedPeer {
                    id: "a".to_string(),
                    label: "A".to_string(),
                    role: None,
                },
                DistributedPeer {
                    id: "b".to_string(),
                    label: "B".to_string(),
                    role: None,
                },
            ],
            initiator: "a".to_string(),
            responder: "a".to_string(),
            coordinator: None,
            latency_ms: 80,
            clock_offsets: Vec::new(),
            proposal_value: String::new(),
        })
        .expect_err("invalid handshake input");

        assert!(error.message().contains("different"));
    }

    #[test]
    fn time_sync_trace_converges_peer_offsets() {
        let trace = trace_time_sync(DistributedInput {
            peers: vec![
                DistributedPeer {
                    id: "c".to_string(),
                    label: "Coordinator".to_string(),
                    role: None,
                },
                DistributedPeer {
                    id: "a".to_string(),
                    label: "A".to_string(),
                    role: None,
                },
                DistributedPeer {
                    id: "b".to_string(),
                    label: "B".to_string(),
                    role: None,
                },
            ],
            initiator: String::new(),
            responder: String::new(),
            coordinator: Some("c".to_string()),
            latency_ms: 70,
            clock_offsets: vec![
                DistributedClockOffset {
                    peer: "c".to_string(),
                    offset_ms: 0,
                },
                DistributedClockOffset {
                    peer: "a".to_string(),
                    offset_ms: 35,
                },
                DistributedClockOffset {
                    peer: "b".to_string(),
                    offset_ms: -18,
                },
            ],
            proposal_value: String::new(),
        })
        .expect("trace");

        let VisualizationState::Distributed {
            states, messages, ..
        } = &trace.final_state
        else {
            panic!("time sync must finish with distributed state");
        };
        assert_eq!(messages.len(), 6);
        assert!(states.iter().all(|state| state.state == "synced +0ms"));
        assert!(trace.events.iter().any(|event| matches!(
            event,
            TraceEvent::DistributedSend { label, .. } if label == "+18ms"
        )));
        assert_valid_distributed_trace(&trace);
    }

    #[test]
    fn time_sync_rejects_unknown_offset_peer() {
        let error = trace_time_sync(DistributedInput {
            peers: vec![
                DistributedPeer {
                    id: "c".to_string(),
                    label: "Coordinator".to_string(),
                    role: None,
                },
                DistributedPeer {
                    id: "a".to_string(),
                    label: "A".to_string(),
                    role: None,
                },
            ],
            initiator: String::new(),
            responder: String::new(),
            coordinator: Some("c".to_string()),
            latency_ms: 70,
            clock_offsets: vec![DistributedClockOffset {
                peer: "missing".to_string(),
                offset_ms: 10,
            }],
            proposal_value: String::new(),
        })
        .expect_err("invalid time sync input");

        assert!(error.message().contains("unknown peer"));
    }

    #[test]
    fn paxos_trace_chooses_value_after_quorum() {
        let trace = trace_paxos(DistributedInput {
            peers: paxos_test_peers(),
            initiator: String::new(),
            responder: String::new(),
            coordinator: None,
            latency_ms: 80,
            clock_offsets: Vec::new(),
            proposal_value: "blue".to_string(),
        })
        .expect("trace");

        let VisualizationState::Distributed {
            states, messages, ..
        } = &trace.final_state
        else {
            panic!("paxos must finish with distributed state");
        };
        assert_eq!(messages.len(), 12);
        assert!(
            states
                .iter()
                .any(|state| state.peer == "learner" && state.state == "chosen blue")
        );
        assert!(trace.events.iter().any(|event| matches!(
            event,
            TraceEvent::DistributedSend { label, .. } if label == "PROMISE"
        )));
        assert!(trace.events.iter().any(|event| matches!(
            event,
            TraceEvent::DistributedSend { label, .. } if label == "ACCEPTED"
        )));
        assert_valid_distributed_trace(&trace);
    }

    #[test]
    fn paxos_rejects_missing_acceptor_quorum() {
        let mut peers = paxos_test_peers();
        peers.retain(|peer| peer.id != "acceptor-c");
        let error = trace_paxos(DistributedInput {
            peers,
            initiator: String::new(),
            responder: String::new(),
            coordinator: None,
            latency_ms: 80,
            clock_offsets: Vec::new(),
            proposal_value: "blue".to_string(),
        })
        .expect_err("invalid paxos input");

        assert!(error.message().contains("three acceptor"));
    }

    fn paxos_test_peers() -> Vec<DistributedPeer> {
        vec![
            DistributedPeer {
                id: "proposer".to_string(),
                label: "Proposer".to_string(),
                role: Some("proposer".to_string()),
            },
            DistributedPeer {
                id: "acceptor-a".to_string(),
                label: "Acceptor A".to_string(),
                role: Some("acceptor".to_string()),
            },
            DistributedPeer {
                id: "acceptor-b".to_string(),
                label: "Acceptor B".to_string(),
                role: Some("acceptor".to_string()),
            },
            DistributedPeer {
                id: "acceptor-c".to_string(),
                label: "Acceptor C".to_string(),
                role: Some("acceptor".to_string()),
            },
            DistributedPeer {
                id: "learner".to_string(),
                label: "Learner".to_string(),
                role: Some("learner".to_string()),
            },
        ]
    }

    #[test]
    fn example_requests_generate_valid_traces() {
        for algorithm in [
            AlgorithmId::Quicksort,
            AlgorithmId::InsertionSort,
            AlgorithmId::BubbleSort,
            AlgorithmId::CocktailShakerSort,
            AlgorithmId::OddEvenSort,
            AlgorithmId::SelectionSort,
            AlgorithmId::ShellSort,
            AlgorithmId::CountingSort,
            AlgorithmId::RadixSort,
            AlgorithmId::BucketSort,
            AlgorithmId::CombSort,
            AlgorithmId::Mergesort,
            AlgorithmId::Timsort,
            AlgorithmId::HeapSort,
            AlgorithmId::PancakeSort,
            AlgorithmId::Quickselect,
            AlgorithmId::BitonicSort,
            AlgorithmId::Bfs,
            AlgorithmId::Dfs,
            AlgorithmId::Dijkstra,
            AlgorithmId::BellmanFord,
            AlgorithmId::AStar,
            AlgorithmId::PrimMst,
            AlgorithmId::Kruskal,
            AlgorithmId::TopologicalSort,
            AlgorithmId::Kmp,
            AlgorithmId::BoyerMoore,
            AlgorithmId::Levenshtein,
            AlgorithmId::PrefixTrie,
            AlgorithmId::Handshake,
            AlgorithmId::TimeSync,
            AlgorithmId::Paxos,
        ] {
            let trace = generate_trace(example_request(algorithm)).expect("trace");
            match algorithm {
                AlgorithmId::Quicksort
                | AlgorithmId::InsertionSort
                | AlgorithmId::BubbleSort
                | AlgorithmId::CocktailShakerSort
                | AlgorithmId::OddEvenSort
                | AlgorithmId::SelectionSort
                | AlgorithmId::ShellSort
                | AlgorithmId::CountingSort
                | AlgorithmId::RadixSort
                | AlgorithmId::BucketSort
                | AlgorithmId::CombSort
                | AlgorithmId::Mergesort
                | AlgorithmId::Timsort
                | AlgorithmId::HeapSort
                | AlgorithmId::PancakeSort
                | AlgorithmId::BitonicSort => assert_valid_sort_trace(&trace),
                AlgorithmId::Quickselect => assert_valid_quickselect_trace(&trace),
                AlgorithmId::Bfs
                | AlgorithmId::Dfs
                | AlgorithmId::Dijkstra
                | AlgorithmId::BellmanFord
                | AlgorithmId::AStar
                | AlgorithmId::PrimMst
                | AlgorithmId::Kruskal
                | AlgorithmId::TopologicalSort
                | AlgorithmId::PrefixTrie => assert_valid_graph_trace(&trace),
                AlgorithmId::Kmp | AlgorithmId::BoyerMoore | AlgorithmId::Levenshtein => {
                    assert_valid_sequence_trace(&trace)
                }
                AlgorithmId::Handshake | AlgorithmId::TimeSync | AlgorithmId::Paxos => {
                    assert_valid_distributed_trace(&trace)
                }
            }
        }
    }

    fn assert_valid_sort_trace(trace: &Trace) {
        let VisualizationState::Array { values } = &trace.initial_state else {
            panic!("sort trace must start with an array state");
        };
        assert!(matches!(
            trace.algorithm,
            AlgorithmId::Quicksort
                | AlgorithmId::InsertionSort
                | AlgorithmId::BubbleSort
                | AlgorithmId::CocktailShakerSort
                | AlgorithmId::OddEvenSort
                | AlgorithmId::SelectionSort
                | AlgorithmId::ShellSort
                | AlgorithmId::CountingSort
                | AlgorithmId::RadixSort
                | AlgorithmId::BucketSort
                | AlgorithmId::CombSort
                | AlgorithmId::Mergesort
                | AlgorithmId::Timsort
                | AlgorithmId::HeapSort
                | AlgorithmId::PancakeSort
                | AlgorithmId::BitonicSort
        ));
        assert_eq!(trace.metadata.event_count, trace.events.len());

        let len = values.len();
        for event in &trace.events {
            match event {
                TraceEvent::SortPivot { index, range, .. } => {
                    assert!(*index < len);
                    assert!(range[0] <= range[1]);
                    assert!(range[1] < len);
                }
                TraceEvent::SortCompare { indices, .. } | TraceEvent::SortSwap { indices, .. } => {
                    assert!(indices.iter().all(|index| *index < len));
                }
                TraceEvent::SortPartition {
                    range,
                    boundary,
                    scanner,
                    ..
                } => {
                    assert!(range[0] <= *boundary);
                    assert!(*boundary <= range[1]);
                    assert!(range[0] <= *scanner);
                    assert!(*scanner <= range[1]);
                    assert!(range[1] < len);
                }
                TraceEvent::SortMarkSorted { indices, .. } => {
                    assert!(indices.iter().all(|index| *index < len));
                }
                _ => panic!("sort trace contains non-sort event: {event:?}"),
            }
        }

        let VisualizationState::Array {
            values: final_values,
        } = &trace.final_state
        else {
            panic!("sort trace must finish with an array state");
        };
        assert!(final_values.windows(2).all(|pair| pair[0] <= pair[1]));
    }

    fn assert_valid_quickselect_trace(trace: &Trace) {
        let VisualizationState::Array { values } = &trace.initial_state else {
            panic!("quickselect trace must start with an array state");
        };
        assert_eq!(trace.algorithm, AlgorithmId::Quickselect);
        assert_eq!(trace.metadata.event_count, trace.events.len());

        let len = values.len();
        assert!(len > 0);
        let selected_index = trace
            .events
            .iter()
            .rev()
            .find_map(|event| match event {
                TraceEvent::SortMarkSorted { indices, .. } if indices.len() == 1 => {
                    Some(indices[0])
                }
                _ => None,
            })
            .expect("quickselect marks the selected index");
        assert!(selected_index < len);

        for event in &trace.events {
            match event {
                TraceEvent::SortPivot { index, range, .. } => {
                    assert!(*index < len);
                    assert!(range[0] <= range[1]);
                    assert!(range[1] < len);
                }
                TraceEvent::SortCompare { indices, .. } | TraceEvent::SortSwap { indices, .. } => {
                    assert!(indices.iter().all(|index| *index < len));
                }
                TraceEvent::SortPartition {
                    range,
                    boundary,
                    scanner,
                    ..
                } => {
                    assert!(range[0] <= *boundary);
                    assert!(*boundary <= range[1]);
                    assert!(range[0] <= *scanner);
                    assert!(*scanner <= range[1]);
                    assert!(range[1] < len);
                }
                TraceEvent::SortMarkSorted { indices, .. } => {
                    assert!(indices.iter().all(|index| *index < len));
                }
                _ => panic!("quickselect trace contains non-sort event: {event:?}"),
            }
        }

        let VisualizationState::Array {
            values: final_values,
        } = &trace.final_state
        else {
            panic!("quickselect trace must finish with an array state");
        };
        let mut sorted = values.clone();
        sorted.sort();
        let selected_value = final_values[selected_index];
        assert_eq!(selected_value, sorted[selected_index]);
        assert!(
            final_values[..selected_index]
                .iter()
                .all(|value| *value <= selected_value)
        );
        assert!(
            final_values[selected_index + 1..]
                .iter()
                .all(|value| *value >= selected_value)
        );
    }

    fn assert_valid_graph_trace(trace: &Trace) {
        let VisualizationState::Graph {
            nodes,
            edges,
            source,
            target,
            distances,
            ..
        } = &trace.initial_state
        else {
            panic!("graph trace must start with a graph state");
        };

        assert!(matches!(
            trace.algorithm,
            AlgorithmId::Bfs
                | AlgorithmId::Dfs
                | AlgorithmId::Dijkstra
                | AlgorithmId::BellmanFord
                | AlgorithmId::AStar
                | AlgorithmId::PrimMst
                | AlgorithmId::Kruskal
                | AlgorithmId::TopologicalSort
                | AlgorithmId::PrefixTrie
        ));
        assert_eq!(trace.metadata.event_count, trace.events.len());

        let node_ids = nodes
            .iter()
            .map(|node| node.id.as_str())
            .collect::<HashSet<_>>();
        let edge_ids = edges
            .iter()
            .map(|edge| edge.id.as_str())
            .collect::<HashSet<_>>();

        assert!(node_ids.contains(source.as_str()));
        if let Some(target) = target {
            assert!(node_ids.contains(target.as_str()));
        }
        assert!(
            distances
                .iter()
                .all(|item| node_ids.contains(item.node.as_str()))
        );

        for event in &trace.events {
            match event {
                TraceEvent::GraphVisit { node, .. } | TraceEvent::GraphSettle { node, .. } => {
                    assert!(node_ids.contains(node.as_str()));
                }
                TraceEvent::GraphRelaxEdge {
                    edge_id, from, to, ..
                } => {
                    assert!(edge_ids.contains(edge_id.as_str()));
                    assert!(node_ids.contains(from.as_str()));
                    assert!(node_ids.contains(to.as_str()));
                }
                TraceEvent::GraphPath { nodes, .. } => {
                    assert!(nodes.iter().all(|node| node_ids.contains(node.as_str())));
                }
                TraceEvent::GraphConsiderEdge {
                    edge_id, from, to, ..
                }
                | TraceEvent::GraphSelectEdge {
                    edge_id, from, to, ..
                }
                | TraceEvent::GraphRejectEdge {
                    edge_id, from, to, ..
                } => {
                    assert!(edge_ids.contains(edge_id.as_str()));
                    assert!(node_ids.contains(from.as_str()));
                    assert!(node_ids.contains(to.as_str()));
                }
                TraceEvent::GraphSpanningTree { edge_ids, .. } => {
                    let unique_edges = edge_ids.iter().collect::<HashSet<_>>();
                    assert_eq!(unique_edges.len(), edge_ids.len());
                    assert!(edge_ids.iter().all(|edge| edge_ids_in_graph(edge, edges)));
                }
                _ => panic!("graph trace contains non-graph event: {event:?}"),
            }
        }
    }

    fn edge_ids_in_graph(edge_id: &str, edges: &[GraphEdge]) -> bool {
        edges.iter().any(|edge| edge.id == edge_id)
    }

    fn assert_valid_sequence_trace(trace: &Trace) {
        let VisualizationState::Sequence { text, pattern, .. } = &trace.initial_state else {
            panic!("sequence trace must start with a sequence state");
        };
        assert!(matches!(
            trace.algorithm,
            AlgorithmId::Kmp | AlgorithmId::BoyerMoore | AlgorithmId::Levenshtein
        ));
        assert_eq!(trace.metadata.event_count, trace.events.len());

        let text_len = text.chars().count();
        let pattern_len = pattern.chars().count();
        assert!(text_len > 0);
        assert!(pattern_len > 0);

        for event in &trace.events {
            match event {
                TraceEvent::SequenceBuildPrefix {
                    pattern_index,
                    prefix_index,
                    lps,
                    ..
                } => {
                    assert!(*pattern_index < pattern_len);
                    assert!(*prefix_index <= pattern_len);
                    assert_eq!(lps.len(), pattern_len);
                    for (index, value) in lps.iter().enumerate() {
                        assert!(*value <= index);
                    }
                }
                TraceEvent::SequenceCompare {
                    text_index,
                    pattern_index,
                    ..
                } => {
                    assert!(*text_index < text_len);
                    assert!(*pattern_index < pattern_len);
                }
                TraceEvent::SequenceFallback {
                    from_pattern_index,
                    to_pattern_index,
                    ..
                } => {
                    assert!(*from_pattern_index <= pattern_len);
                    assert!(*to_pattern_index < pattern_len || *to_pattern_index == 0);
                    assert!(*to_pattern_index <= *from_pattern_index);
                }
                TraceEvent::SequenceMatch {
                    start_index,
                    end_index,
                    ..
                } => {
                    assert!(*start_index <= *end_index);
                    assert!(*end_index < text_len);
                    assert_eq!(*end_index - *start_index + 1, pattern_len);
                }
                TraceEvent::SequenceEditCell {
                    row,
                    col,
                    deletion,
                    insertion,
                    substitution,
                    value,
                    matrix,
                    ..
                } => {
                    assert!(*row <= text_len);
                    assert!(*col <= pattern_len);
                    assert!(*value <= *deletion);
                    assert!(*value <= *insertion);
                    assert!(*value <= *substitution);
                    assert_eq!(matrix.len(), text_len + 1);
                    assert!(matrix.iter().all(|row| row.len() == pattern_len + 1));
                }
                _ => panic!("sequence trace contains non-sequence event: {event:?}"),
            }
        }

        let VisualizationState::Sequence {
            lps,
            matches,
            text,
            pattern,
            matrix,
        } = &trace.final_state
        else {
            panic!("sequence trace must finish with a sequence state");
        };
        if matches!(trace.algorithm, AlgorithmId::Kmp | AlgorithmId::BoyerMoore) {
            if trace.algorithm == AlgorithmId::Kmp {
                assert_eq!(lps.len(), pattern_len);
            } else {
                assert!(lps.is_empty());
            }
            for start_index in matches {
                let candidate = text
                    .chars()
                    .skip(*start_index)
                    .take(pattern_len)
                    .collect::<String>();
                assert_eq!(candidate, *pattern);
            }
            assert!(matrix.is_empty());
        } else {
            assert_eq!(matrix.len(), text_len + 1);
            assert!(matrix.iter().all(|row| row.len() == pattern_len + 1));
            assert!(matrix[text_len][pattern_len].is_some());
        }
    }

    fn assert_valid_distributed_trace(trace: &Trace) {
        let VisualizationState::Distributed {
            peers,
            states,
            messages,
        } = &trace.initial_state
        else {
            panic!("distributed trace must start with a distributed state");
        };
        assert!(matches!(
            trace.algorithm,
            AlgorithmId::Handshake | AlgorithmId::TimeSync | AlgorithmId::Paxos
        ));
        assert_eq!(trace.metadata.event_count, trace.events.len());

        let peer_ids = peers
            .iter()
            .map(|peer| peer.id.as_str())
            .collect::<HashSet<_>>();
        assert!(
            states
                .iter()
                .all(|state| peer_ids.contains(state.peer.as_str()))
        );
        assert!(messages.is_empty());

        let mut known_messages = HashSet::<String>::new();
        for event in &trace.events {
            match event {
                TraceEvent::DistributedState { peer, state, .. } => {
                    assert!(peer_ids.contains(peer.as_str()));
                    assert!(!state.trim().is_empty());
                }
                TraceEvent::DistributedSend {
                    message_id,
                    from,
                    to,
                    label,
                    sent_at,
                    deliver_at,
                    ..
                } => {
                    assert!(known_messages.insert(message_id.clone()));
                    assert!(peer_ids.contains(from.as_str()));
                    assert!(peer_ids.contains(to.as_str()));
                    assert_ne!(from, to);
                    assert!(!label.trim().is_empty());
                    assert!(sent_at < deliver_at);
                }
                TraceEvent::DistributedDeliver {
                    message_id,
                    from,
                    to,
                    label,
                    ..
                } => {
                    assert!(known_messages.contains(message_id));
                    assert!(peer_ids.contains(from.as_str()));
                    assert!(peer_ids.contains(to.as_str()));
                    assert_ne!(from, to);
                    assert!(!label.trim().is_empty());
                }
                _ => panic!("distributed trace contains non-distributed event: {event:?}"),
            }
        }

        let VisualizationState::Distributed {
            peers: final_peers,
            states: final_states,
            messages: final_messages,
        } = &trace.final_state
        else {
            panic!("distributed trace must finish with distributed state");
        };
        assert_eq!(final_peers.len(), peers.len());
        assert!(
            final_states
                .iter()
                .all(|state| peer_ids.contains(state.peer.as_str()))
        );
        assert!(final_messages.iter().all(|message| {
            peer_ids.contains(message.from.as_str())
                && peer_ids.contains(message.to.as_str())
                && known_messages.contains(&message.id)
        }));
    }
}
