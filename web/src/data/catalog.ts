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
    id: "dijkstra",
    label: "Dijkstra",
    category: "graph",
    status: "available",
    summary: "Relax weighted edges from a source until the shortest path is known.",
  },
  {
    id: "primMst",
    label: "Prim MST",
    category: "graph",
    status: "available",
    summary: "Grow a minimum spanning tree from the lightest crossing edges.",
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
