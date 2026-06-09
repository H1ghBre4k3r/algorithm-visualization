import { describe, expect, it } from "vitest";

import { parseGraphInput, parseSequenceInput, parseSortInput } from "./validators";

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

describe("parseSequenceInput", () => {
  it("accepts KMP text and pattern", () => {
    expect(parseSequenceInput('{"text":"ababcabcabababd","pattern":"ababd"}')).toEqual({
      text: "ababcabcabababd",
      pattern: "ababd",
    });
  });

  it("rejects patterns longer than the text", () => {
    expect(() => parseSequenceInput('{"text":"abc","pattern":"abcd"}')).toThrow("longer");
  });
});
