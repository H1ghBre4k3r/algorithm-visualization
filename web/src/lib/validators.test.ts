import { describe, expect, it } from "vitest";

import {
  parseBoyerMooreInput,
  parseCustomInput,
  parseDistributedInput,
  parseEditDistanceInput,
  parseGraphInput,
  parseKmpInput,
  parsePrefixTrieInput,
  parseSortInput,
  parseTimeSyncInput,
} from "./validators";

describe("parseSortInput", () => {
  it("accepts a raw array", () => {
    expect(parseSortInput("[3, 1, 2]")).toEqual({ values: [3, 1, 2] });
  });

  it("accepts an object with values", () => {
    expect(parseSortInput('{"values":[9,4,7]}')).toEqual({ values: [9, 4, 7] });
  });

  it("rejects non-integer values", () => {
    expect(() => parseSortInput("[1, 2.5]")).toThrow("integer");
  });

  it("routes counting sort custom input through the sort parser", () => {
    expect(parseCustomInput("countingSort", '{"values":[4,0,2]}')).toEqual({
      type: "sort",
      value: { values: [4, 0, 2] },
    });
  });

  it("routes radix sort custom input through the sort parser", () => {
    expect(parseCustomInput("radixSort", '{"values":[40,2,11]}')).toEqual({
      type: "sort",
      value: { values: [40, 2, 11] },
    });
  });

  it("routes bucket sort custom input through the sort parser", () => {
    expect(parseCustomInput("bucketSort", '{"values":[9,1,4]}')).toEqual({
      type: "sort",
      value: { values: [9, 1, 4] },
    });
  });

  it("routes comb sort custom input through the sort parser", () => {
    expect(parseCustomInput("combSort", '{"values":[8,3,5]}')).toEqual({
      type: "sort",
      value: { values: [8, 3, 5] },
    });
  });

  it("routes cocktail shaker sort custom input through the sort parser", () => {
    expect(parseCustomInput("cocktailShakerSort", '{"values":[7,2,6]}')).toEqual({
      type: "sort",
      value: { values: [7, 2, 6] },
    });
  });

  it("routes timsort custom input through the sort parser", () => {
    expect(parseCustomInput("timsort", '{"values":[11,4,8]}')).toEqual({
      type: "sort",
      value: { values: [11, 4, 8] },
    });
  });

  it("routes odd-even sort custom input through the sort parser", () => {
    expect(parseCustomInput("oddEvenSort", '{"values":[6,1,5]}')).toEqual({
      type: "sort",
      value: { values: [6, 1, 5] },
    });
  });

  it("routes pancake sort custom input through the sort parser", () => {
    expect(parseCustomInput("pancakeSort", '{"values":[5,1,4]}')).toEqual({
      type: "sort",
      value: { values: [5, 1, 4] },
    });
  });

  it("routes quickselect custom input with a target index through the sort parser", () => {
    expect(parseCustomInput("quickselect", '{"values":[8,3,5],"targetIndex":1}')).toEqual({
      type: "sort",
      value: { values: [8, 3, 5], targetIndex: 1 },
    });
  });

  it("rejects quickselect target indexes outside the values array", () => {
    expect(() => parseCustomInput("quickselect", '{"values":[8,3,5],"targetIndex":3}')).toThrow(
      "targetIndex",
    );
  });

  it("routes bitonic sort custom input through the sort parser", () => {
    expect(parseCustomInput("bitonicSort", '{"values":[8,3,5,1]}')).toEqual({
      type: "sort",
      value: { values: [8, 3, 5, 1] },
    });
  });

  it("rejects bitonic sort input that is not a power of two", () => {
    expect(() => parseCustomInput("bitonicSort", '{"values":[8,3,5]}')).toThrow("power-of-two");
  });
});

describe("parseGraphInput", () => {
  const graph = {
    nodes: [
      { id: "A", label: "A", x: 0.2, y: 0.4 },
      { id: "B", label: "B", x: 0.7, y: 0.5 },
    ],
    edges: [{ id: "AB", from: "A", to: "B", weight: 3 }],
    source: "A",
    target: "B",
  };

  it("accepts a valid graph", () => {
    expect(parseGraphInput(JSON.stringify(graph))).toMatchObject({
      source: "A",
      target: "B",
      edges: [{ id: "AB", weight: 3 }],
    });
  });

  it("rejects edges pointing at missing nodes", () => {
    expect(() =>
      parseGraphInput(
        JSON.stringify({
          ...graph,
          edges: [{ id: "AZ", from: "A", to: "Z", weight: 3 }],
        }),
      ),
    ).toThrow("unknown node");
  });

  it("routes topological sort custom input through directed DAG validation", () => {
    expect(
      parseCustomInput(
        "topologicalSort",
        JSON.stringify({
          nodes: [
            { id: "A", label: "A", x: 0.2, y: 0.3 },
            { id: "B", label: "B", x: 0.5, y: 0.5 },
            { id: "C", label: "C", x: 0.8, y: 0.7 },
          ],
          edges: [
            { id: "AB", from: "A", to: "B", weight: 1, directed: true },
            { id: "BC", from: "B", to: "C", weight: 1, directed: true },
          ],
          source: "A",
          target: "C",
        }),
      ),
    ).toMatchObject({
      type: "graph",
      value: {
        edges: [
          { id: "AB", directed: true },
          { id: "BC", directed: true },
        ],
      },
    });
  });

  it("rejects topological sort input with undirected edges", () => {
    expect(() =>
      parseCustomInput(
        "topologicalSort",
        JSON.stringify({
          ...graph,
          edges: [{ id: "AB", from: "A", to: "B", weight: 3 }],
        }),
      ),
    ).toThrow("directed");
  });

  it("rejects topological sort input with cycles", () => {
    expect(() =>
      parseCustomInput(
        "topologicalSort",
        JSON.stringify({
          nodes: [
            { id: "A", label: "A", x: 0.2, y: 0.3 },
            { id: "B", label: "B", x: 0.7, y: 0.6 },
          ],
          edges: [
            { id: "AB", from: "A", to: "B", weight: 1, directed: true },
            { id: "BA", from: "B", to: "A", weight: 1, directed: true },
          ],
          source: "A",
          target: "B",
        }),
      ),
    ).toThrow("acyclic");
  });
});

describe("parseKmpInput", () => {
  it("accepts KMP text and pattern", () => {
    expect(parseKmpInput('{"text":"ababcabcabababd","pattern":"ababd"}')).toEqual({
      text: "ababcabcabababd",
      pattern: "ababd",
    });
  });

  it("rejects patterns longer than the text", () => {
    expect(() => parseKmpInput('{"text":"abc","pattern":"abcd"}')).toThrow("longer");
  });
});

describe("parseBoyerMooreInput", () => {
  it("accepts Boyer-Moore text and pattern", () => {
    expect(parseBoyerMooreInput('{"text":"here is a simple example","pattern":"example"}')).toEqual({
      text: "here is a simple example",
      pattern: "example",
    });
  });

  it("routes Boyer-Moore custom input through the sequence parser", () => {
    expect(parseCustomInput("boyerMoore", '{"text":"bananas","pattern":"ana"}')).toEqual({
      type: "sequence",
      value: { text: "bananas", pattern: "ana" },
    });
  });

  it("rejects Boyer-Moore patterns longer than the text", () => {
    expect(() => parseBoyerMooreInput('{"text":"abc","pattern":"abcd"}')).toThrow("Boyer-Moore");
  });
});

describe("parseEditDistanceInput", () => {
  it("accepts source and target strings", () => {
    expect(parseEditDistanceInput('{"text":"kitten","pattern":"sitting"}')).toEqual({
      text: "kitten",
      pattern: "sitting",
    });
  });

  it("allows the target to be longer than the source", () => {
    expect(parseEditDistanceInput('{"text":"abc","pattern":"abcd"}')).toEqual({
      text: "abc",
      pattern: "abcd",
    });
  });
});

describe("parsePrefixTrieInput", () => {
  it("accepts a words array", () => {
    expect(parsePrefixTrieInput('{"words":["tea","team","ted"]}')).toEqual({
      text: "",
      pattern: "",
      words: ["tea", "team", "ted"],
    });
  });

  it("routes Prefix Tree custom input through the sequence parser", () => {
    expect(parseCustomInput("prefixTrie", '{"words":["car","card","care"]}')).toEqual({
      type: "sequence",
      value: { text: "", pattern: "", words: ["car", "card", "care"] },
    });
  });

  it("rejects empty word lists", () => {
    expect(() => parsePrefixTrieInput('{"words":[]}')).toThrow("non-empty words");
  });

  it("rejects empty words", () => {
    expect(() => parsePrefixTrieInput('{"words":["tea",""]}')).toThrow("cannot be empty");
  });
});

describe("parseDistributedInput", () => {
  const handshake = {
    peers: [
      { id: "client", label: "Client" },
      { id: "server", label: "Server" },
    ],
    initiator: "client",
    responder: "server",
    latencyMs: 100,
  };

  it("accepts handshake peer input", () => {
    expect(parseDistributedInput(JSON.stringify(handshake))).toEqual(handshake);
  });

  it("routes Handshake custom input through the distributed parser", () => {
    expect(parseCustomInput("handshake", JSON.stringify(handshake))).toEqual({
      type: "distributed",
      value: handshake,
    });
  });

  it("rejects missing initiator peers", () => {
    expect(() =>
      parseDistributedInput(JSON.stringify({ ...handshake, initiator: "missing" })),
    ).toThrow("does not exist");
  });

  it("rejects identical initiator and responder", () => {
    expect(() =>
      parseDistributedInput(JSON.stringify({ ...handshake, responder: "client" })),
    ).toThrow("different");
  });
});

describe("parseTimeSyncInput", () => {
  const timeSync = {
    peers: [
      { id: "coordinator", label: "Coordinator" },
      { id: "edge", label: "Edge" },
    ],
    coordinator: "coordinator",
    latencyMs: 90,
    clockOffsets: [
      { peer: "coordinator", offsetMs: 0 },
      { peer: "edge", offsetMs: 25 },
    ],
  };

  it("accepts coordinator and clock offsets", () => {
    expect(parseTimeSyncInput(JSON.stringify(timeSync))).toEqual(timeSync);
  });

  it("routes Time Synchronization custom input through the distributed parser", () => {
    expect(parseCustomInput("timeSync", JSON.stringify(timeSync))).toEqual({
      type: "distributed",
      value: timeSync,
    });
  });

  it("rejects unknown clock-offset peers", () => {
    expect(() =>
      parseTimeSyncInput(
        JSON.stringify({
          ...timeSync,
          clockOffsets: [{ peer: "missing", offsetMs: 10 }],
        }),
      ),
    ).toThrow("unknown peer");
  });

  it("rejects missing clock offsets", () => {
    expect(() => parseTimeSyncInput(JSON.stringify({ ...timeSync, clockOffsets: [] }))).toThrow(
      "clockOffsets",
    );
  });
});
