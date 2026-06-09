use std::collections::{HashMap, HashSet};
use std::fmt;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum AlgorithmId {
    Quicksort,
    Dijkstra,
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
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "type", content = "value", rename_all = "camelCase")]
pub enum AlgorithmOptions {
    Quicksort(QuicksortOptions),
    Dijkstra(DijkstraOptions),
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

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DijkstraOptions {
    #[serde(default)]
    pub stop_at_target: bool,
}

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
        (AlgorithmId::Dijkstra, InputData::Graph(input)) => {
            let stop_at_target = match request.options {
                Some(AlgorithmOptions::Dijkstra(options)) => options.stop_at_target,
                _ => true,
            };
            trace_dijkstra(input, stop_at_target)
        }
        (AlgorithmId::Quicksort, _) => Err(AlgorithmError::new(
            "Quicksort requires sort input with a values array.",
        )),
        (AlgorithmId::Dijkstra, _) => Err(AlgorithmError::new(
            "Dijkstra requires graph input with nodes, edges, source, and target.",
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
        AlgorithmId::Dijkstra => AlgorithmRequest {
            algorithm,
            input_mode: InputMode::Example,
            input: InputData::Graph(example_graph()),
            options: Some(AlgorithmOptions::Dijkstra(DijkstraOptions {
                stop_at_target: true,
            })),
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
    fn example_requests_generate_valid_traces() {
        for algorithm in [AlgorithmId::Quicksort, AlgorithmId::Dijkstra] {
            let trace = generate_trace(example_request(algorithm)).expect("trace");
            match algorithm {
                AlgorithmId::Quicksort => assert_valid_sort_trace(&trace),
                AlgorithmId::Dijkstra => assert_valid_graph_trace(&trace),
            }
        }
    }

    fn assert_valid_sort_trace(trace: &Trace) {
        let VisualizationState::Array { values } = &trace.initial_state else {
            panic!("sort trace must start with an array state");
        };
        assert_eq!(trace.algorithm, AlgorithmId::Quicksort);
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

        assert_eq!(trace.algorithm, AlgorithmId::Dijkstra);
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
                _ => panic!("graph trace contains non-graph event: {event:?}"),
            }
        }
    }
}
