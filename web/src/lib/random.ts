import type { GraphInput, SequenceInput, SortInput } from "../types";

export function randomSortInput(size: number): SortInput {
  return {
    values: Array.from({ length: size }, () => 5 + Math.floor(Math.random() * 96)),
  };
}

export function randomGraphInput(size: number): GraphInput {
  const nodeCount = Math.max(4, Math.min(12, size));
  const nodes = Array.from({ length: nodeCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / nodeCount - Math.PI / 2;
    const jitter = 0.04 * Math.sin(index * 2.7);
    return {
      id: String.fromCharCode(65 + index),
      label: String.fromCharCode(65 + index),
      x: 0.5 + Math.cos(angle) * (0.34 + jitter),
      y: 0.5 + Math.sin(angle) * (0.34 - jitter),
    };
  });

  const edges = [];
  for (let index = 0; index < nodeCount - 1; index += 1) {
    edges.push({
      id: `${nodes[index].id}${nodes[index + 1].id}`,
      from: nodes[index].id,
      to: nodes[index + 1].id,
      weight: 1 + Math.floor(Math.random() * 9),
    });
  }

  for (let index = 0; index < nodeCount; index += 1) {
    const jump = 2 + Math.floor(Math.random() * Math.max(2, nodeCount / 2));
    const target = (index + jump) % nodeCount;
    const from = nodes[index].id;
    const to = nodes[target].id;
    const id = `${from}${to}`;
    if (from !== to && !edges.some((edge) => edge.id === id || edge.id === `${to}${from}`)) {
      edges.push({
        id,
        from,
        to,
        weight: 2 + Math.floor(Math.random() * 12),
      });
    }
  }

  return {
    nodes,
    edges,
    source: nodes[0].id,
    target: nodes[nodes.length - 1].id,
  };
}

export function randomSequenceInput(size: number): SequenceInput {
  const alphabet = ["a", "b", "c", "d"];
  const patternLength = Math.max(3, Math.min(8, Math.floor(size / 4)));
  const textLength = Math.max(patternLength + 4, Math.min(80, size));
  const pattern = Array.from(
    { length: patternLength },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  ).join("");
  const insertAt = Math.floor(Math.random() * (textLength - patternLength));
  const textChars = Array.from(
    { length: textLength },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  );
  textChars.splice(insertAt, patternLength, ...pattern);

  return {
    text: textChars.join(""),
    pattern,
  };
}
