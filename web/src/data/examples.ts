import type {
  AlgorithmRequest,
  AvailableAlgorithmId,
  DistributedInput,
  GraphInput,
  SequenceInput,
  SortInput,
} from "../types";

export const exampleSortInput: SortInput = {
  values: [42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
};

export const exampleQuickselectInput: SortInput = {
  values: [42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
  targetIndex: 4,
};

export const exampleBitonicInput: SortInput = {
  values: [42, 12, 77, 18, 93, 31, 64, 5],
};

export const exampleGraphInput: GraphInput = {
  nodes: [
    { id: "A", label: "A", x: 0.13, y: 0.48 },
    { id: "B", label: "B", x: 0.35, y: 0.22 },
    { id: "C", label: "C", x: 0.39, y: 0.72 },
    { id: "D", label: "D", x: 0.62, y: 0.32 },
    { id: "E", label: "E", x: 0.66, y: 0.78 },
    { id: "F", label: "F", x: 0.87, y: 0.53 },
  ],
  edges: [
    { id: "AB", from: "A", to: "B", weight: 4 },
    { id: "AC", from: "A", to: "C", weight: 2 },
    { id: "BC", from: "B", to: "C", weight: 1 },
    { id: "BD", from: "B", to: "D", weight: 5 },
    { id: "CD", from: "C", to: "D", weight: 8 },
    { id: "CE", from: "C", to: "E", weight: 10 },
    { id: "DE", from: "D", to: "E", weight: 2 },
    { id: "DF", from: "D", to: "F", weight: 6 },
    { id: "EF", from: "E", to: "F", weight: 3 },
  ],
  source: "A",
  target: "F",
};

export const exampleDagInput: GraphInput = {
  nodes: [
    { id: "A", label: "A", x: 0.12, y: 0.5 },
    { id: "B", label: "B", x: 0.32, y: 0.24 },
    { id: "C", label: "C", x: 0.32, y: 0.72 },
    { id: "D", label: "D", x: 0.56, y: 0.32 },
    { id: "E", label: "E", x: 0.58, y: 0.74 },
    { id: "F", label: "F", x: 0.86, y: 0.52 },
  ],
  edges: [
    { id: "AB", from: "A", to: "B", weight: 1, directed: true },
    { id: "AC", from: "A", to: "C", weight: 1, directed: true },
    { id: "BD", from: "B", to: "D", weight: 1, directed: true },
    { id: "CD", from: "C", to: "D", weight: 1, directed: true },
    { id: "CE", from: "C", to: "E", weight: 1, directed: true },
    { id: "DF", from: "D", to: "F", weight: 1, directed: true },
    { id: "EF", from: "E", to: "F", weight: 1, directed: true },
  ],
  source: "A",
  target: "F",
};

export const exampleSequenceInput: SequenceInput = {
  text: "ababcabcabababd",
  pattern: "ababd",
};

export const exampleBoyerMooreInput: SequenceInput = {
  text: "here is a simple example",
  pattern: "example",
};

export const exampleEditDistanceInput: SequenceInput = {
  text: "kitten",
  pattern: "sitting",
};

export const examplePrefixTrieInput: SequenceInput = {
  text: "",
  pattern: "",
  words: ["tea", "team", "ted", "ten", "to", "ton"],
};

export const exampleHandshakeInput: DistributedInput = {
  peers: [
    { id: "client", label: "Client" },
    { id: "server", label: "Server" },
    { id: "observer", label: "Observer" },
  ],
  initiator: "client",
  responder: "server",
  latencyMs: 120,
};

export function exampleRequest(algorithm: AvailableAlgorithmId): AlgorithmRequest {
  if (
    algorithm === "quicksort" ||
    algorithm === "insertionSort" ||
    algorithm === "bubbleSort" ||
    algorithm === "cocktailShakerSort" ||
    algorithm === "oddEvenSort" ||
    algorithm === "pancakeSort" ||
    algorithm === "quickselect" ||
    algorithm === "bitonicSort" ||
    algorithm === "selectionSort" ||
    algorithm === "shellSort" ||
    algorithm === "countingSort" ||
    algorithm === "radixSort" ||
    algorithm === "bucketSort" ||
    algorithm === "combSort" ||
    algorithm === "mergesort" ||
    algorithm === "timsort" ||
    algorithm === "heapSort"
  ) {
    return {
      algorithm,
      inputMode: "example",
      input: {
        type: "sort",
        value: structuredClone(
          algorithm === "quickselect"
            ? exampleQuickselectInput
            : algorithm === "bitonicSort"
              ? exampleBitonicInput
              : exampleSortInput,
        ),
      },
      options:
        algorithm === "quicksort"
          ? { type: "quicksort", value: { pivotStrategy: "last" } }
          : algorithm === "insertionSort"
            ? { type: "insertionSort", value: {} }
            : algorithm === "bubbleSort"
              ? { type: "bubbleSort", value: {} }
              : algorithm === "cocktailShakerSort"
                ? { type: "cocktailShakerSort", value: {} }
                : algorithm === "oddEvenSort"
                  ? { type: "oddEvenSort", value: {} }
                  : algorithm === "pancakeSort"
                    ? { type: "pancakeSort", value: {} }
                    : algorithm === "quickselect"
                      ? { type: "quickselect", value: {} }
                      : algorithm === "bitonicSort"
                        ? { type: "bitonicSort", value: {} }
                        : algorithm === "selectionSort"
                          ? { type: "selectionSort", value: {} }
                          : algorithm === "shellSort"
                            ? { type: "shellSort", value: {} }
                            : algorithm === "countingSort"
                              ? { type: "countingSort", value: {} }
                              : algorithm === "radixSort"
                                ? { type: "radixSort", value: {} }
                                : algorithm === "bucketSort"
                                  ? { type: "bucketSort", value: {} }
                                  : algorithm === "combSort"
                                    ? { type: "combSort", value: {} }
                                    : algorithm === "mergesort"
                                      ? { type: "mergesort", value: {} }
                                      : algorithm === "timsort"
                                        ? { type: "timsort", value: {} }
                                        : { type: "heapSort", value: {} },
    };
  }

  if (algorithm === "kmp") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sequence", value: structuredClone(exampleSequenceInput) },
      options: { type: "kmp", value: {} },
    };
  }

  if (algorithm === "boyerMoore") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sequence", value: structuredClone(exampleBoyerMooreInput) },
      options: { type: "boyerMoore", value: {} },
    };
  }

  if (algorithm === "levenshtein") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sequence", value: structuredClone(exampleEditDistanceInput) },
      options: { type: "levenshtein", value: {} },
    };
  }

  if (algorithm === "prefixTrie") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sequence", value: structuredClone(examplePrefixTrieInput) },
      options: { type: "prefixTrie", value: {} },
    };
  }

  if (algorithm === "handshake") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "distributed", value: structuredClone(exampleHandshakeInput) },
      options: { type: "handshake", value: {} },
    };
  }

  if (algorithm === "bfs" || algorithm === "dfs") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "graph", value: structuredClone(exampleGraphInput) },
      options:
        algorithm === "bfs"
          ? { type: "bfs", value: { stopAtTarget: true } }
          : { type: "dfs", value: { stopAtTarget: true } },
    };
  }

  if (algorithm === "primMst" || algorithm === "kruskal") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "graph", value: structuredClone(exampleGraphInput) },
      options:
        algorithm === "primMst"
          ? { type: "primMst", value: {} }
          : { type: "kruskal", value: {} },
    };
  }

  if (algorithm === "topologicalSort") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "graph", value: structuredClone(exampleDagInput) },
      options: { type: "topologicalSort", value: {} },
    };
  }

  return {
    algorithm,
    inputMode: "example",
    input: { type: "graph", value: structuredClone(exampleGraphInput) },
    options:
      algorithm === "bellmanFord"
        ? { type: "bellmanFord", value: {} }
        : algorithm === "aStar"
          ? { type: "aStar", value: { stopAtTarget: true } }
        : { type: "dijkstra", value: { stopAtTarget: true } },
  };
}

export function customTemplate(algorithm: AvailableAlgorithmId): string {
  const input =
    algorithm === "quicksort" ||
    algorithm === "insertionSort" ||
    algorithm === "bubbleSort" ||
    algorithm === "cocktailShakerSort" ||
    algorithm === "oddEvenSort" ||
    algorithm === "pancakeSort" ||
    algorithm === "quickselect" ||
    algorithm === "bitonicSort" ||
    algorithm === "selectionSort" ||
    algorithm === "shellSort" ||
    algorithm === "countingSort" ||
    algorithm === "radixSort" ||
    algorithm === "bucketSort" ||
    algorithm === "combSort" ||
    algorithm === "mergesort" ||
    algorithm === "timsort" ||
    algorithm === "heapSort"
      ? algorithm === "quickselect"
        ? exampleQuickselectInput
        : algorithm === "bitonicSort"
          ? exampleBitonicInput
        : exampleSortInput
      : algorithm === "kmp"
        ? exampleSequenceInput
        : algorithm === "boyerMoore"
          ? exampleBoyerMooreInput
        : algorithm === "levenshtein"
          ? exampleEditDistanceInput
        : algorithm === "prefixTrie"
          ? examplePrefixTrieInput
        : algorithm === "handshake"
          ? exampleHandshakeInput
          : algorithm === "topologicalSort"
            ? exampleDagInput
          : exampleGraphInput;
  return JSON.stringify(input, null, 2);
}
