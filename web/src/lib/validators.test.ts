import { describe, expect, it } from "vitest";

import {
  parseCustomInput,
  parseEditDistanceInput,
  parseGraphInput,
  parseKmpInput,
  parseSortInput,
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
