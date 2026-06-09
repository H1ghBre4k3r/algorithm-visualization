use std::collections::{HashMap, HashSet, VecDeque};
use std::fmt;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum AlgorithmId {
    Quicksort,
    InsertionSort,
    BubbleSort,
    SelectionSort,
    ShellSort,
    Mergesort,
    HeapSort,
    Bfs,
    Dfs,
    Dijkstra,
    BellmanFord,
    AStar,
    PrimMst,
    Kruskal,
    Kmp,
    Levenshtein,
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
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", content = "value", rename_all = "camelCase")]
pub enum AlgorithmOptions {
    Quicksort(QuicksortOptions),
    InsertionSort(InsertionSortOptions),
    BubbleSort(BubbleSortOptions),
    SelectionSort(SelectionSortOptions),
    ShellSort(ShellSortOptions),
    Mergesort(MergesortOptions),
    HeapSort(HeapSortOptions),
    Bfs(BfsOptions),
    Dfs(DfsOptions),
    Dijkstra(DijkstraOptions),
    BellmanFord(BellmanFordOptions),
    AStar(AStarOptions),
    PrimMst(PrimMstOptions),
    Kruskal(KruskalOptions),
    Kmp(KmpOptions),
    Levenshtein(LevenshteinOptions),
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
pub struct SelectionSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct ShellSortOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct MergesortOptions {}

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
pub struct KmpOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct LevenshteinOptions {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SortInput {
    pub values: Vec<i32>,
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
    pub directed: bool,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SequenceInput {
    pub text: String,
    pub pattern: String,
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
        (AlgorithmId::SelectionSort, InputData::Sort(input)) => trace_selection_sort(input),
        (AlgorithmId::ShellSort, InputData::Sort(input)) => trace_shell_sort(input),
        (AlgorithmId::Mergesort, InputData::Sort(input)) => trace_mergesort(input),
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
        (AlgorithmId::Kmp, InputData::Sequence(input)) => trace_kmp(input),
        (AlgorithmId::Levenshtein, InputData::Sequence(input)) => trace_levenshtein(input),
        (AlgorithmId::Quicksort, _) => Err(AlgorithmError::new(
            "Quicksort requires sort input with a values array.",
        )),
        (AlgorithmId::InsertionSort, _) => Err(AlgorithmError::new(
            "Insertion Sort requires sort input with a values array.",
        )),
        (AlgorithmId::BubbleSort, _) => Err(AlgorithmError::new(
            "Bubble Sort requires sort input with a values array.",
        )),
        (AlgorithmId::SelectionSort, _) => Err(AlgorithmError::new(
            "Selection Sort requires sort input with a values array.",
        )),
        (AlgorithmId::ShellSort, _) => Err(AlgorithmError::new(
            "Shell Sort requires sort input with a values array.",
        )),
        (AlgorithmId::Mergesort, _) => Err(AlgorithmError::new(
            "Mergesort requires sort input with a values array.",
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
        (AlgorithmId::Kmp, _) => Err(AlgorithmError::new(
            "Knuth-Morris-Pratt requires sequence input with text and pattern.",
        )),
        (AlgorithmId::Levenshtein, _) => Err(AlgorithmError::new(
            "Levenshtein Distance requires sequence input with text and pattern.",
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
            }),
            options: Some(AlgorithmOptions::BubbleSort(BubbleSortOptions::default())),
        },
        AlgorithmId::SelectionSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
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
            }),
            options: Some(AlgorithmOptions::ShellSort(ShellSortOptions::default())),
        },
        AlgorithmId::Mergesort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
            }),
            options: Some(AlgorithmOptions::Mergesort(MergesortOptions::default())),
        },
        AlgorithmId::HeapSort => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sort(SortInput {
                values: vec![42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
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
        AlgorithmId::Kmp => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sequence(SequenceInput {
                text: "ababcabcabababd".to_string(),
                pattern: "ababd".to_string(),
            }),
            options: Some(AlgorithmOptions::Kmp(KmpOptions::default())),
        },
        AlgorithmId::Levenshtein => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Sequence(SequenceInput {
                text: "kitten".to_string(),
                pattern: "sitting".to_string(),
            }),
            options: Some(AlgorithmOptions::Levenshtein(LevenshteinOptions::default())),
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

fn edge(id: &str, from: &str, to: &str, weight: u32) -> GraphEdge {
    GraphEdge {
        id: id.to_string(),
        from: from.to_string(),
        to: to.to_string(),
        weight,
        directed: false,
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
        let trace = trace_quicksort(SortInput { values: Vec::new() }).expect("trace");

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
    fn selection_sort_trace_sorts_values() {
        let trace = trace_selection_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
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
    fn mergesort_trace_sorts_values() {
        let trace = trace_mergesort(SortInput {
            values: vec![9, 3, 7, 1, 4],
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
    fn heap_sort_trace_sorts_values() {
        let trace = trace_heap_sort(SortInput {
            values: vec![9, 3, 7, 1, 4],
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
    fn kmp_trace_finds_pattern_matches() {
        let trace = trace_kmp(SequenceInput {
            text: "ababcabcabababd".to_string(),
            pattern: "ababd".to_string(),
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
        })
        .expect_err("invalid sequence input");

        assert!(error.message().contains("pattern"));
    }

    #[test]
    fn levenshtein_trace_computes_edit_distance() {
        let trace = trace_levenshtein(SequenceInput {
            text: "kitten".to_string(),
            pattern: "sitting".to_string(),
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
        })
        .expect_err("invalid sequence input");

        assert!(error.message().contains("target"));
    }

    #[test]
    fn example_requests_generate_valid_traces() {
        for algorithm in [
            AlgorithmId::Quicksort,
            AlgorithmId::InsertionSort,
            AlgorithmId::BubbleSort,
            AlgorithmId::SelectionSort,
            AlgorithmId::ShellSort,
            AlgorithmId::Mergesort,
            AlgorithmId::HeapSort,
            AlgorithmId::Bfs,
            AlgorithmId::Dfs,
            AlgorithmId::Dijkstra,
            AlgorithmId::BellmanFord,
            AlgorithmId::AStar,
            AlgorithmId::PrimMst,
            AlgorithmId::Kruskal,
            AlgorithmId::Kmp,
            AlgorithmId::Levenshtein,
        ] {
            let trace = generate_trace(example_request(algorithm)).expect("trace");
            match algorithm {
                AlgorithmId::Quicksort
                | AlgorithmId::InsertionSort
                | AlgorithmId::BubbleSort
                | AlgorithmId::SelectionSort
                | AlgorithmId::ShellSort
                | AlgorithmId::Mergesort
                | AlgorithmId::HeapSort => assert_valid_sort_trace(&trace),
                AlgorithmId::Bfs
                | AlgorithmId::Dfs
                | AlgorithmId::Dijkstra
                | AlgorithmId::BellmanFord
                | AlgorithmId::AStar
                | AlgorithmId::PrimMst
                | AlgorithmId::Kruskal => assert_valid_graph_trace(&trace),
                AlgorithmId::Kmp | AlgorithmId::Levenshtein => assert_valid_sequence_trace(&trace),
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
                | AlgorithmId::SelectionSort
                | AlgorithmId::ShellSort
                | AlgorithmId::Mergesort
                | AlgorithmId::HeapSort
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
            AlgorithmId::Kmp | AlgorithmId::Levenshtein
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
        if trace.algorithm == AlgorithmId::Kmp {
            assert_eq!(lps.len(), pattern_len);
            for start_index in matches {
                let candidate = text
                    .chars()
                    .skip(*start_index)
                    .take(pattern_len)
                    .collect::<String>();
                assert_eq!(candidate, *pattern);
            }
        } else {
            assert_eq!(matrix.len(), text_len + 1);
            assert!(matrix.iter().all(|row| row.len() == pattern_len + 1));
            assert!(matrix[text_len][pattern_len].is_some());
        }
    }
}
