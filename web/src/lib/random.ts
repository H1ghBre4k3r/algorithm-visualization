import type { DistributedInput, GraphInput, SequenceInput, SortInput } from "../types";

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

export function randomDagInput(size: number): GraphInput {
  const nodeCount = Math.max(4, Math.min(12, size));
  const nodes = Array.from({ length: nodeCount }, (_, index) => {
    const column = nodeCount === 1 ? 0 : index / (nodeCount - 1);
    const lane = index % 3;
    return {
      id: String.fromCharCode(65 + index),
      label: String.fromCharCode(65 + index),
      x: 0.1 + column * 0.8,
      y: [0.28, 0.5, 0.72][lane] + Math.sin(index * 1.9) * 0.035,
    };
  });

  const edges = [];
  for (let index = 0; index < nodeCount - 1; index += 1) {
    edges.push({
      id: `${nodes[index].id}${nodes[index + 1].id}`,
      from: nodes[index].id,
      to: nodes[index + 1].id,
      weight: 1 + Math.floor(Math.random() * 9),
      directed: true,
    });
  }

  for (let fromIndex = 0; fromIndex < nodeCount - 2; fromIndex += 1) {
    const maxJump = Math.min(nodeCount - fromIndex - 1, 4);
    const jump = 2 + Math.floor(Math.random() * Math.max(1, maxJump - 1));
    const toIndex = fromIndex + jump;
    const from = nodes[fromIndex].id;
    const to = nodes[toIndex].id;
    const id = `${from}${to}`;
    if (!edges.some((edge) => edge.id === id)) {
      edges.push({
        id,
        from,
        to,
        weight: 1 + Math.floor(Math.random() * 9),
        directed: true,
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

export function randomEditDistanceInput(size: number): SequenceInput {
  const alphabet = ["a", "b", "c", "d", "e", "f"];
  const sourceLength = Math.max(3, Math.min(18, Math.floor(size / 2)));
  const targetLength = Math.max(3, Math.min(18, Math.ceil(size / 2)));
  const build = (length: number) =>
    Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");

  return {
    text: build(sourceLength),
    pattern: build(targetLength),
  };
}

export function randomTrieInput(size: number): SequenceInput {
  const families = [
    ["tea", "team", "teal", "ted", "ten", "tent", "to", "ton"],
    ["car", "card", "care", "cart", "cat", "cater", "can", "cane"],
    ["star", "start", "stare", "stack", "stamp", "stay", "stone", "store"],
    ["flow", "flower", "flown", "flight", "flint", "flip", "fleet", "flee"],
  ];
  const family = families[Math.floor(Math.random() * families.length)];
  const wordCount = Math.max(4, Math.min(16, size));
  const shuffled = [...family].sort(() => Math.random() - 0.5);
  const words = shuffled.slice(0, Math.min(wordCount, family.length));

  while (words.length < wordCount) {
    const stem = family[Math.floor(Math.random() * family.length)];
    const suffix = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const candidate = `${stem}${suffix}`;
    if (!words.includes(candidate)) {
      words.push(candidate);
    }
  }

  return {
    text: "",
    pattern: "",
    words,
  };
}

export function randomDistributedInput(size: number): DistributedInput {
  const peerCount = Math.max(2, Math.min(8, size));
  const peers = Array.from({ length: peerCount }, (_, index) => ({
    id: `p${index + 1}`,
    label: index === 0 ? "Client" : index === 1 ? "Server" : `Peer ${index + 1}`,
  }));

  return {
    peers,
    initiator: peers[0].id,
    responder: peers[1].id,
    latencyMs: 80 + Math.floor(Math.random() * 160),
  };
}
