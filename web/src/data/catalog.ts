import type { AlgorithmId, AvailableAlgorithmId, PlannedAlgorithmId } from "../types";

export type CategoryId = "sorting" | "graph" | "sequence" | "distributed";

interface BaseAlgorithmCatalogItem {
  label: string;
  category: CategoryId;
  summary: string;
}

export interface AvailableAlgorithmCatalogItem extends BaseAlgorithmCatalogItem {
  id: AvailableAlgorithmId;
  status: "available";
}

export interface PlannedAlgorithmCatalogItem extends BaseAlgorithmCatalogItem {
  id: PlannedAlgorithmId;
  status: "planned";
}

export type AlgorithmCatalogItem = AvailableAlgorithmCatalogItem | PlannedAlgorithmCatalogItem;

export interface CategoryCatalogItem {
  id: CategoryId;
  label: string;
  summary: string;
}

export const categories: CategoryCatalogItem[] = [
  {
    id: "sorting",
    label: "Sorting",
    summary: "Array ordering, partitioning, and comparison-driven movement.",
  },
  {
    id: "graph",
    label: "Graph",
    summary: "Traversal, shortest paths, connectivity, and spanning structure.",
  },
  {
    id: "sequence",
    label: "Sequence",
    summary: "String matching, edit distance, tries, and pattern processing.",
  },
  {
    id: "distributed",
    label: "Distributed",
    summary: "Message passing, clocks, consensus, and protocol timelines.",
  },
];

export const algorithms: AlgorithmCatalogItem[] = [
  {
    id: "quicksort",
    label: "Quicksort",
    category: "sorting",
    status: "available",
    summary: "Partition an array around pivots until every range is ordered.",
  },
  {
    id: "insertionSort",
    label: "Insertion Sort",
    category: "sorting",
    status: "available",
    summary: "Build a sorted prefix by inserting each value into place.",
  },
  {
    id: "bubbleSort",
    label: "Bubble Sort",
    category: "sorting",
    status: "available",
    summary: "Repeatedly swap adjacent values until large items bubble right.",
  },
  {
    id: "cocktailShakerSort",
    label: "Cocktail Shaker Sort",
    category: "sorting",
    status: "available",
    summary: "Sweep adjacent swaps forward and backward through a shrinking range.",
  },
  {
    id: "oddEvenSort",
    label: "Odd-Even Sort",
    category: "sorting",
    status: "available",
    summary: "Alternate odd and even adjacent phases until no swaps remain.",
  },
  {
    id: "pancakeSort",
    label: "Pancake Sort",
    category: "sorting",
    status: "available",
    summary: "Flip prefixes to move each largest value into place.",
  },
  {
    id: "quickselect",
    label: "Quickselect",
    category: "sorting",
    status: "available",
    summary: "Partition around pivots until the requested rank is selected.",
  },
  {
    id: "bitonicSort",
    label: "Bitonic Sort",
    category: "sorting",
    status: "available",
    summary: "Run compare-exchange stages through a power-of-two sorting network.",
  },
  {
    id: "selectionSort",
    label: "Selection Sort",
    category: "sorting",
    status: "available",
    summary: "Select the smallest remaining value for each sorted position.",
  },
  {
    id: "shellSort",
    label: "Shell Sort",
    category: "sorting",
    status: "available",
    summary: "Sort distant subsequences, then tighten the gap to finish.",
  },
  {
    id: "countingSort",
    label: "Counting Sort",
    category: "sorting",
    status: "available",
    summary: "Count integer buckets, then rebuild the array in order.",
  },
  {
    id: "radixSort",
    label: "Radix Sort",
    category: "sorting",
    status: "available",
    summary: "Stabilize values by digit passes from least to most significant.",
  },
  {
    id: "bucketSort",
    label: "Bucket Sort",
    category: "sorting",
    status: "available",
    summary: "Distribute values into ranges, sort each bucket, then collect.",
  },
  {
    id: "combSort",
    label: "Comb Sort",
    category: "sorting",
    status: "available",
    summary: "Shrink comparison gaps until adjacent swaps finish the order.",
  },
  {
    id: "mergesort",
    label: "Mergesort",
    category: "sorting",
    status: "available",
    summary: "Split ranges recursively and merge sorted runs back together.",
  },
  {
    id: "timsort",
    label: "Timsort",
    category: "sorting",
    status: "available",
    summary: "Detect natural runs, polish them, and merge adaptively.",
  },
  {
    id: "heapSort",
    label: "Heap Sort",
    category: "sorting",
    status: "available",
    summary: "Build a max heap, then extract fixed values from the root.",
  },
  {
    id: "bfs",
    label: "Breadth-First Search",
    category: "graph",
    status: "available",
    summary: "Explore neighbors by layers to find unweighted shortest paths.",
  },
  {
    id: "dfs",
    label: "Depth-First Search",
    category: "graph",
    status: "available",
    summary: "Follow one branch deeply before backtracking through the graph.",
  },
  {
    id: "dijkstra",
    label: "Dijkstra",
    category: "graph",
    status: "available",
    summary: "Relax weighted edges from a source until the shortest path is known.",
  },
  {
    id: "bellmanFord",
    label: "Bellman-Ford",
    category: "graph",
    status: "available",
    summary: "Repeat edge relaxations to reveal shortest path distances.",
  },
  {
    id: "aStar",
    label: "A* Search",
    category: "graph",
    status: "available",
    summary: "Guide weighted pathfinding with a coordinate heuristic.",
  },
  {
    id: "primMst",
    label: "Prim MST",
    category: "graph",
    status: "available",
    summary: "Grow a minimum spanning tree from the lightest crossing edges.",
  },
  {
    id: "kruskal",
    label: "Kruskal",
    category: "graph",
    status: "available",
    summary: "Scan edges by weight and join components without cycles.",
  },
  {
    id: "topologicalSort",
    label: "Topological Sort",
    category: "graph",
    status: "available",
    summary: "Remove dependencies to produce a valid directed acyclic order.",
  },
  {
    id: "kmp",
    label: "Knuth-Morris-Pratt",
    category: "sequence",
    status: "available",
    summary: "Build a prefix table and scan text without rewinding.",
  },
  {
    id: "boyerMoore",
    label: "Boyer-Moore",
    category: "sequence",
    status: "planned",
    summary: "Use mismatch heuristics to skip ahead during pattern search.",
  },
  {
    id: "levenshtein",
    label: "Levenshtein Distance",
    category: "sequence",
    status: "available",
    summary: "Fill a dynamic-programming grid for edit distance.",
  },
  {
    id: "prefixTrie",
    label: "Prefix Tree",
    category: "sequence",
    status: "planned",
    summary: "Insert strings into a shared-prefix trie structure.",
  },
  {
    id: "handshake",
    label: "Handshake Protocol",
    category: "distributed",
    status: "planned",
    summary: "Visualize peer state transitions and message exchange.",
  },
  {
    id: "timeSync",
    label: "Time Synchronization",
    category: "distributed",
    status: "planned",
    summary: "Track clock offsets, samples, and convergence over time.",
  },
  {
    id: "paxos",
    label: "Paxos",
    category: "distributed",
    status: "planned",
    summary: "Animate proposer, acceptor, and learner message rounds.",
  },
];

export function firstAvailableAlgorithm(category: CategoryId): AvailableAlgorithmId | null {
  return (
    algorithms.find(
      (item): item is AvailableAlgorithmCatalogItem =>
        item.category === category && item.status === "available",
    )?.id ?? null
  );
}

export function categoryForAlgorithm(algorithm: AlgorithmId): CategoryId {
  return algorithms.find((item) => item.id === algorithm)?.category ?? "sorting";
}
