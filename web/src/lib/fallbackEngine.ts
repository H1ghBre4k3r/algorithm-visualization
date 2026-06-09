import type {
  AlgorithmRequest,
  GraphEdge,
  GraphInput,
  NodeDistance,
  SequenceInput,
  SortInput,
  Trace,
  TraceEvent,
} from "../types";

export function generateTraceFallback(request: AlgorithmRequest): Trace {
  if (request.algorithm === "quicksort" && request.input.type === "sort") {
    return traceQuicksort(request.input.value);
  }

  if (request.algorithm === "insertionSort" && request.input.type === "sort") {
    return traceInsertionSort(request.input.value);
  }

  if (request.algorithm === "bubbleSort" && request.input.type === "sort") {
    return traceBubbleSort(request.input.value);
  }

  if (request.algorithm === "cocktailShakerSort" && request.input.type === "sort") {
    return traceCocktailShakerSort(request.input.value);
  }

  if (request.algorithm === "oddEvenSort" && request.input.type === "sort") {
    return traceOddEvenSort(request.input.value);
  }

  if (request.algorithm === "selectionSort" && request.input.type === "sort") {
    return traceSelectionSort(request.input.value);
  }

  if (request.algorithm === "shellSort" && request.input.type === "sort") {
    return traceShellSort(request.input.value);
  }

  if (request.algorithm === "countingSort" && request.input.type === "sort") {
    return traceCountingSort(request.input.value);
  }

  if (request.algorithm === "radixSort" && request.input.type === "sort") {
    return traceRadixSort(request.input.value);
  }

  if (request.algorithm === "bucketSort" && request.input.type === "sort") {
    return traceBucketSort(request.input.value);
  }

  if (request.algorithm === "combSort" && request.input.type === "sort") {
    return traceCombSort(request.input.value);
  }

  if (request.algorithm === "mergesort" && request.input.type === "sort") {
    return traceMergesort(request.input.value);
  }

  if (request.algorithm === "timsort" && request.input.type === "sort") {
    return traceTimsort(request.input.value);
  }

  if (request.algorithm === "heapSort" && request.input.type === "sort") {
    return traceHeapSort(request.input.value);
  }

  if (request.algorithm === "dijkstra" && request.input.type === "graph") {
    const stopAtTarget =
      request.options?.type === "dijkstra" ? request.options.value.stopAtTarget : true;
    return traceDijkstra(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "bellmanFord" && request.input.type === "graph") {
    return traceBellmanFord(request.input.value);
  }

  if (request.algorithm === "aStar" && request.input.type === "graph") {
    const stopAtTarget = request.options?.type === "aStar" ? request.options.value.stopAtTarget : true;
    return traceAStar(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "bfs" && request.input.type === "graph") {
    const stopAtTarget = request.options?.type === "bfs" ? request.options.value.stopAtTarget : true;
    return traceBfs(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "dfs" && request.input.type === "graph") {
    const stopAtTarget = request.options?.type === "dfs" ? request.options.value.stopAtTarget : true;
    return traceDfs(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "primMst" && request.input.type === "graph") {
    return tracePrimMst(request.input.value);
  }

  if (request.algorithm === "kruskal" && request.input.type === "graph") {
    return traceKruskal(request.input.value);
  }

  if (request.algorithm === "kmp" && request.input.type === "sequence") {
    return traceKmp(request.input.value);
  }

  if (request.algorithm === "levenshtein" && request.input.type === "sequence") {
    return traceLevenshtein(request.input.value);
  }

  throw new Error("Algorithm and input type do not match.");
}

function traceQuicksort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Quicksort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 0) {
    quicksortRange(values, 0, values.length - 1, events);
    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All values are in sorted order.",
    });
  }

  return {
    algorithm: "quicksort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Quicksort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceInsertionSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Insertion Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 0) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Start with the first value as the sorted prefix.",
    });
  }

  for (let index = 1; index < values.length; index += 1) {
    let cursor = index;
    events.push({
      type: "sortPartition",
      range: [0, index],
      boundary: index,
      scanner: index,
      message: `Insert value ${values[index]} into the sorted prefix.`,
    });

    while (cursor > 0) {
      events.push({
        type: "sortCompare",
        indices: [cursor - 1, cursor],
        message: `Compare ${values[cursor - 1]} and ${values[cursor]} around insertion cursor ${cursor}.`,
      });

      if (values[cursor - 1] <= values[cursor]) {
        break;
      }

      swap(values, cursor - 1, cursor);
      events.push({
        type: "sortSwap",
        indices: [cursor - 1, cursor],
        values: [...values],
        message: `Shift ${values[cursor - 1]} left into the sorted prefix.`,
      });
      cursor -= 1;
    }

    events.push({
      type: "sortMarkSorted",
      indices: Array.from({ length: index + 1 }, (_, sortedIndex) => sortedIndex),
      message: `Positions 0 through ${index} are sorted.`,
    });
  }

  return {
    algorithm: "insertionSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Insertion Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceBubbleSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Bubble Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    for (let pass = 0; pass < values.length; pass += 1) {
      const unsortedEnd = values.length - 1 - pass;
      let swapped = false;

      for (let index = 0; index < unsortedEnd; index += 1) {
        events.push({
          type: "sortCompare",
          indices: [index, index + 1],
          message: `Compare adjacent values ${values[index]} and ${values[index + 1]}.`,
        });

        if (values[index] > values[index + 1]) {
          swap(values, index, index + 1);
          swapped = true;
          events.push({
            type: "sortSwap",
            indices: [index, index + 1],
            values: [...values],
            message: `Swap values at positions ${index} and ${index + 1}.`,
          });
        }
      }

      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: values.length - unsortedEnd }, (_, offset) => unsortedEnd + offset),
        message: `Value at index ${unsortedEnd} has bubbled into place.`,
      });

      if (!swapped) {
        events.push({
          type: "sortMarkSorted",
          indices: values.map((_, index) => index),
          message: "No swaps in this pass; all values are sorted.",
        });
        break;
      }
    }
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "bubbleSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Bubble Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceCocktailShakerSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Cocktail Shaker Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    let start = 0;
    let end = values.length - 1;
    let swapped = true;

    while (swapped && start < end) {
      swapped = false;
      events.push({
        type: "sortPartition",
        range: [start, end],
        boundary: end,
        scanner: start,
        message: `Sweep forward from ${start} to ${end}.`,
      });

      for (let index = start; index < end; index += 1) {
        events.push({
          type: "sortCompare",
          indices: [index, index + 1],
          message: `Forward compare ${values[index]} and ${values[index + 1]}.`,
        });

        if (values[index] > values[index + 1]) {
          swap(values, index, index + 1);
          swapped = true;
          events.push({
            type: "sortSwap",
            indices: [index, index + 1],
            values: [...values],
            message: `Swap positions ${index} and ${index + 1}.`,
          });
        }
      }

      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: values.length - end }, (_, offset) => end + offset),
        message: `Value at index ${end} is fixed after the forward sweep.`,
      });

      if (!swapped) {
        break;
      }

      swapped = false;
      end -= 1;
      events.push({
        type: "sortPartition",
        range: [start, end],
        boundary: start,
        scanner: end,
        message: `Sweep backward from ${end} to ${start}.`,
      });

      for (let index = end; index > start; index -= 1) {
        events.push({
          type: "sortCompare",
          indices: [index - 1, index],
          message: `Backward compare ${values[index - 1]} and ${values[index]}.`,
        });

        if (values[index - 1] > values[index]) {
          swap(values, index - 1, index);
          swapped = true;
          events.push({
            type: "sortSwap",
            indices: [index - 1, index],
            values: [...values],
            message: `Swap positions ${index - 1} and ${index}.`,
          });
        }
      }

      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: start + 1 }, (_, index) => index),
        message: `Value at index ${start} is fixed after the backward sweep.`,
      });
      start += 1;
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "Bidirectional sweeps complete; values are sorted.",
    });
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "cocktailShakerSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Cocktail Shaker Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceOddEvenSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Odd-Even Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    let sorted = false;
    let pass = 0;

    while (!sorted) {
      sorted = true;

      for (const phaseStart of [1, 0]) {
        const phaseName = phaseStart === 1 ? "odd" : "even";
        events.push({
          type: "sortPartition",
          range: [0, values.length - 1],
          boundary: phaseStart,
          scanner: phaseStart,
          message: `Pass ${pass}: compare ${phaseName}-indexed pairs.`,
        });

        let index = phaseStart;
        while (index + 1 < values.length) {
          events.push({
            type: "sortCompare",
            indices: [index, index + 1],
            message: `Compare ${values[index]} and ${values[index + 1]} in the ${phaseName} phase.`,
          });

          if (values[index] > values[index + 1]) {
            swap(values, index, index + 1);
            sorted = false;
            events.push({
              type: "sortSwap",
              indices: [index, index + 1],
              values: [...values],
              message: `Swap adjacent pair ${index} and ${index + 1}.`,
            });
          }

          index += 2;
        }
      }

      pass += 1;
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "Odd and even phases made no swaps; values are sorted.",
    });
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "oddEvenSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Odd-Even Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceSelectionSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Selection Sort input is capped at 128 values for interactive playback.");
  }

  for (let start = 0; start < values.length; start += 1) {
    let minIndex = start;
    events.push({
      type: "sortPartition",
      range: [start, values.length - 1],
      boundary: minIndex,
      scanner: start,
      message: `Scan for the smallest value from index ${start}.`,
    });

    for (let scanner = start + 1; scanner < values.length; scanner += 1) {
      events.push({
        type: "sortCompare",
        indices: [minIndex, scanner],
        message: `Compare current minimum ${values[minIndex]} with candidate ${values[scanner]}.`,
      });

      if (values[scanner] < values[minIndex]) {
        minIndex = scanner;
        events.push({
          type: "sortPartition",
          range: [start, values.length - 1],
          boundary: minIndex,
          scanner,
          message: `New minimum candidate ${values[minIndex]} found at index ${minIndex}.`,
        });
      }
    }

    if (minIndex !== start) {
      swap(values, start, minIndex);
      events.push({
        type: "sortSwap",
        indices: [start, minIndex],
        values: [...values],
        message: `Move the selected minimum into position ${start}.`,
      });
    }

    events.push({
      type: "sortMarkSorted",
      indices: Array.from({ length: start + 1 }, (_, index) => index),
      message: `Positions 0 through ${start} are sorted.`,
    });
  }

  return {
    algorithm: "selectionSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Selection Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceShellSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Shell Sort input is capped at 128 values for interactive playback.");
  }

  for (let gap = Math.floor(values.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    events.push({
      type: "sortPartition",
      range: [0, Math.max(0, values.length - 1)],
      boundary: gap,
      scanner: gap,
      message: `Start a gapped insertion pass with gap ${gap}.`,
    });

    for (let index = gap; index < values.length; index += 1) {
      const value = values[index];
      let cursor = index;
      events.push({
        type: "sortPartition",
        range: [0, values.length - 1],
        boundary: gap,
        scanner: index,
        message: `Insert value ${value} through the gap-${gap} subsequence.`,
      });

      while (cursor >= gap) {
        events.push({
          type: "sortCompare",
          indices: [cursor - gap, cursor],
          message: `Compare ${values[cursor - gap]} and ${value} across gap ${gap}.`,
        });

        if (values[cursor - gap] <= value) {
          break;
        }

        values[cursor] = values[cursor - gap];
        events.push({
          type: "sortSwap",
          indices: [cursor - gap, cursor],
          values: [...values],
          message: `Shift ${values[cursor]} from index ${cursor - gap} to ${cursor}.`,
        });
        cursor -= gap;
      }

      if (cursor !== index) {
        values[cursor] = value;
        events.push({
          type: "sortSwap",
          indices: [cursor, index],
          values: [...values],
          message: `Place ${value} at index ${cursor}.`,
        });
      }
    }

    if (gap === 1) {
      events.push({
        type: "sortMarkSorted",
        indices: values.map((_, index) => index),
        message: "Final gap pass complete; all values are sorted.",
      });
    }
  }

  if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "shellSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Shell Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceCountingSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Counting Sort input is capped at 128 values for interactive playback.");
  }

  const negativeValue = values.find((value) => value < 0);
  if (negativeValue !== undefined) {
    throw new Error(`Counting Sort requires non-negative integers; found ${negativeValue}.`);
  }

  const maxValue = Math.max(0, ...values);
  if (maxValue > 512) {
    throw new Error("Counting Sort supports values up to 512 for interactive playback.");
  }

  const counts = Array.from({ length: maxValue + 1 }, () => 0);
  values.forEach((value, index) => {
    counts[value] += 1;
    events.push({
      type: "sortCompare",
      indices: [index, index],
      message: `Count value ${value}; bucket ${value} now holds ${counts[value]}.`,
    });
  });

  let writeIndex = 0;
  counts.forEach((count, bucket) => {
    if (count === 0) {
      return;
    }

    events.push({
      type: "sortPartition",
      range: [writeIndex, Math.max(0, values.length - 1)],
      boundary: writeIndex,
      scanner: writeIndex,
      message: `Write ${count} occurrence(s) of value ${bucket}.`,
    });

    for (let copy = 0; copy < count; copy += 1) {
      values[writeIndex] = bucket;
      events.push({
        type: "sortSwap",
        indices: [writeIndex, writeIndex],
        values: [...values],
        message: `Place value ${bucket} at index ${writeIndex}.`,
      });
      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: writeIndex + 1 }, (_, index) => index),
        message: `Positions 0 through ${writeIndex} are reconstructed.`,
      });
      writeIndex += 1;
    }
  });

  return {
    algorithm: "countingSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Counting Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceRadixSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Radix Sort input is capped at 128 values for interactive playback.");
  }

  const negativeValue = values.find((value) => value < 0);
  if (negativeValue !== undefined) {
    throw new Error(`Radix Sort requires non-negative integers; found ${negativeValue}.`);
  }

  const maxValue = Math.max(0, ...values);
  if (maxValue > 512) {
    throw new Error("Radix Sort supports values up to 512 for interactive playback.");
  }

  if (values.length > 0) {
    for (let place = 1; place <= Math.max(1, maxValue); place *= 10) {
      events.push({
        type: "sortPartition",
        range: [0, values.length - 1],
        boundary: 0,
        scanner: 0,
        message: `Distribute values by the digit in place ${place}.`,
      });

      const buckets = Array.from({ length: 10 }, () => [] as number[]);
      values.forEach((value, index) => {
        const digit = Math.floor(value / place) % 10;
        buckets[digit].push(value);
        events.push({
          type: "sortCompare",
          indices: [index, index],
          message: `Place value ${value} into digit bucket ${digit}.`,
        });
      });

      let writeIndex = 0;
      buckets.forEach((bucket, digit) => {
        if (bucket.length === 0) {
          return;
        }

        events.push({
          type: "sortPartition",
          range: [writeIndex, values.length - 1],
          boundary: writeIndex,
          scanner: writeIndex,
          message: `Collect digit bucket ${digit}.`,
        });

        for (const value of bucket) {
          values[writeIndex] = value;
          events.push({
            type: "sortSwap",
            indices: [writeIndex, writeIndex],
            values: [...values],
            message: `Write ${value} from bucket ${digit} to index ${writeIndex}.`,
          });
          writeIndex += 1;
        }
      });
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All digit passes complete; values are sorted.",
    });
  }

  return {
    algorithm: "radixSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Radix Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceBucketSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Bucket Sort input is capped at 128 values for interactive playback.");
  }

  const negativeValue = values.find((value) => value < 0);
  if (negativeValue !== undefined) {
    throw new Error(`Bucket Sort requires non-negative integers; found ${negativeValue}.`);
  }

  const maxValue = Math.max(0, ...values);
  if (maxValue > 512) {
    throw new Error("Bucket Sort supports values up to 512 for interactive playback.");
  }

  if (values.length > 0) {
    const bucketCount = Math.min(10, Math.max(1, Math.ceil(Math.sqrt(values.length))));
    events.push({
      type: "sortPartition",
      range: [0, values.length - 1],
      boundary: 0,
      scanner: 0,
      message: `Split values into ${bucketCount} bucket ranges.`,
    });

    const buckets = Array.from({ length: bucketCount }, () => [] as number[]);
    values.forEach((value, index) => {
      const bucketIndex = Math.min(
        bucketCount - 1,
        Math.floor((value * bucketCount) / (maxValue + 1)),
      );
      buckets[bucketIndex].push(value);
      events.push({
        type: "sortCompare",
        indices: [index, index],
        message: `Place value ${value} into bucket ${bucketIndex}.`,
      });
    });

    let writeIndex = 0;
    buckets.forEach((bucket, bucketIndex) => {
      if (bucket.length === 0) {
        return;
      }

      bucket.sort((left, right) => left - right);
      events.push({
        type: "sortPartition",
        range: [writeIndex, values.length - 1],
        boundary: writeIndex,
        scanner: writeIndex,
        message: `Sort and collect bucket ${bucketIndex}.`,
      });

      for (const value of bucket) {
        values[writeIndex] = value;
        events.push({
          type: "sortSwap",
          indices: [writeIndex, writeIndex],
          values: [...values],
          message: `Write ${value} from bucket ${bucketIndex} to index ${writeIndex}.`,
        });
        writeIndex += 1;
      }
    });

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All bucket ranges are collected in sorted order.",
    });
  }

  return {
    algorithm: "bucketSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Bucket Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceCombSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Comb Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    let gap = values.length;
    let swapped = true;

    while (gap > 1 || swapped) {
      gap = Math.max(1, Math.floor((gap * 10) / 13));
      swapped = false;

      events.push({
        type: "sortPartition",
        range: [0, values.length - 1],
        boundary: gap,
        scanner: 0,
        message: `Scan values with gap ${gap}.`,
      });

      let index = 0;
      while (index + gap < values.length) {
        const paired = index + gap;
        events.push({
          type: "sortCompare",
          indices: [index, paired],
          message: `Compare values ${values[index]} and ${values[paired]} at gap ${gap}.`,
        });

        if (values[index] > values[paired]) {
          swap(values, index, paired);
          swapped = true;
          events.push({
            type: "sortSwap",
            indices: [index, paired],
            values: [...values],
            message: `Swap positions ${index} and ${paired}.`,
          });
        }

        index += 1;
      }
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "No gap pass needs a swap; values are sorted.",
    });
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "combSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Comb Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceMergesort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Mergesort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 0) {
    mergesortRange(values, 0, values.length - 1, events);
    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All values are in sorted order.",
    });
  }

  return {
    algorithm: "mergesort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Mergesort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function mergesortRange(values: number[], start: number, end: number, events: TraceEvent[]) {
  if (start >= end) {
    events.push({
      type: "sortMarkSorted",
      indices: [start],
      message: `Single value at index ${start} is sorted.`,
    });
    return;
  }

  const middle = start + Math.floor((end - start) / 2);
  events.push({
    type: "sortPartition",
    range: [start, end],
    boundary: middle,
    scanner: start,
    message: `Split range ${start}..${end} at ${middle}.`,
  });

  mergesortRange(values, start, middle, events);
  mergesortRange(values, middle + 1, end, events);
  mergeRanges(values, start, middle, end, events);
}

function mergeRanges(values: number[], start: number, middle: number, end: number, events: TraceEvent[]) {
  const left = values.slice(start, middle + 1);
  const right = values.slice(middle + 1, end + 1);
  let leftIndex = 0;
  let rightIndex = 0;
  let writeIndex = start;

  while (leftIndex < left.length && rightIndex < right.length) {
    events.push({
      type: "sortCompare",
      indices: [start + leftIndex, middle + 1 + rightIndex],
      message: `Compare merge candidates ${left[leftIndex]} and ${right[rightIndex]}.`,
    });

    if (left[leftIndex] <= right[rightIndex]) {
      values[writeIndex] = left[leftIndex];
      leftIndex += 1;
    } else {
      values[writeIndex] = right[rightIndex];
      rightIndex += 1;
    }
    events.push({
      type: "sortSwap",
      indices: [writeIndex, writeIndex],
      values: [...values],
      message: `Write merged value at index ${writeIndex}.`,
    });
    writeIndex += 1;
  }

  while (leftIndex < left.length) {
    values[writeIndex] = left[leftIndex];
    events.push({
      type: "sortSwap",
      indices: [writeIndex, writeIndex],
      values: [...values],
      message: `Copy remaining left value to index ${writeIndex}.`,
    });
    leftIndex += 1;
    writeIndex += 1;
  }

  while (rightIndex < right.length) {
    values[writeIndex] = right[rightIndex];
    events.push({
      type: "sortSwap",
      indices: [writeIndex, writeIndex],
      values: [...values],
      message: `Copy remaining right value to index ${writeIndex}.`,
    });
    rightIndex += 1;
    writeIndex += 1;
  }

  events.push({
    type: "sortMarkSorted",
    indices: Array.from({ length: end - start + 1 }, (_, index) => start + index),
    message: `Merged range ${start}..${end}.`,
  });
}

function traceTimsort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Timsort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 0) {
    const minRun = values.length < 16 ? values.length : 16;
    let start = 0;
    let runs: Array<[number, number]> = [];

    while (start < values.length) {
      let end = start + 1;
      while (end < values.length) {
        events.push({
          type: "sortCompare",
          indices: [end - 1, end],
          message: `Detect run by comparing ${values[end - 1]} and ${values[end]}.`,
        });
        if (values[end - 1] <= values[end]) {
          end += 1;
        } else {
          break;
        }
      }

      const targetEnd = Math.min(start + minRun, values.length);
      if (end < targetEnd) {
        end = targetEnd;
      }

      events.push({
        type: "sortPartition",
        range: [start, end - 1],
        boundary: start,
        scanner: start,
        message: `Prepare natural run ${start}..${end - 1}.`,
      });
      timsortInsertionRun(values, start, end, events);
      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: end - start }, (_, index) => start + index),
        message: `Run ${start}..${end - 1} is internally sorted.`,
      });
      runs.push([start, end]);
      start = end;
    }

    while (runs.length > 1) {
      const merged: Array<[number, number]> = [];
      let index = 0;
      while (index < runs.length) {
        if (index + 1 >= runs.length) {
          merged.push(runs[index]);
          index += 1;
          continue;
        }

        const [leftStart, leftEnd] = runs[index];
        const [, rightEnd] = runs[index + 1];
        events.push({
          type: "sortPartition",
          range: [leftStart, rightEnd - 1],
          boundary: leftEnd,
          scanner: leftStart,
          message: `Merge runs ${leftStart}..${leftEnd - 1} and ${leftEnd}..${rightEnd - 1}.`,
        });
        timsortMergeRuns(values, leftStart, leftEnd, rightEnd, events);
        merged.push([leftStart, rightEnd]);
        index += 2;
      }
      runs = merged;
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All runs are merged into sorted order.",
    });
  }

  return {
    algorithm: "timsort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Timsort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function timsortInsertionRun(values: number[], start: number, end: number, events: TraceEvent[]) {
  for (let index = start + 1; index < end; index += 1) {
    let cursor = index;
    events.push({
      type: "sortPartition",
      range: [start, end - 1],
      boundary: cursor,
      scanner: cursor,
      message: `Insertion-sort run value at index ${index}.`,
    });

    while (cursor > start) {
      events.push({
        type: "sortCompare",
        indices: [cursor - 1, cursor],
        message: `Compare run values ${values[cursor - 1]} and ${values[cursor]}.`,
      });

      if (values[cursor - 1] <= values[cursor]) {
        break;
      }

      swap(values, cursor - 1, cursor);
      events.push({
        type: "sortSwap",
        indices: [cursor - 1, cursor],
        values: [...values],
        message: `Shift value left inside run ${start}..${end - 1}.`,
      });
      cursor -= 1;
    }
  }
}

function timsortMergeRuns(
  values: number[],
  start: number,
  middle: number,
  end: number,
  events: TraceEvent[],
) {
  const left = values.slice(start, middle);
  const right = values.slice(middle, end);
  let leftIndex = 0;
  let rightIndex = 0;
  let writeIndex = start;

  while (leftIndex < left.length && rightIndex < right.length) {
    events.push({
      type: "sortCompare",
      indices: [start + leftIndex, middle + rightIndex],
      message: `Compare run heads ${left[leftIndex]} and ${right[rightIndex]}.`,
    });

    if (left[leftIndex] <= right[rightIndex]) {
      values[writeIndex] = left[leftIndex];
      leftIndex += 1;
    } else {
      values[writeIndex] = right[rightIndex];
      rightIndex += 1;
    }

    events.push({
      type: "sortSwap",
      indices: [writeIndex, writeIndex],
      values: [...values],
      message: `Write merged run value at index ${writeIndex}.`,
    });
    writeIndex += 1;
  }

  while (leftIndex < left.length) {
    values[writeIndex] = left[leftIndex];
    events.push({
      type: "sortSwap",
      indices: [writeIndex, writeIndex],
      values: [...values],
      message: `Copy remaining left run value to index ${writeIndex}.`,
    });
    leftIndex += 1;
    writeIndex += 1;
  }

  while (rightIndex < right.length) {
    values[writeIndex] = right[rightIndex];
    events.push({
      type: "sortSwap",
      indices: [writeIndex, writeIndex],
      values: [...values],
      message: `Copy remaining right run value to index ${writeIndex}.`,
    });
    rightIndex += 1;
    writeIndex += 1;
  }

  events.push({
    type: "sortMarkSorted",
    indices: Array.from({ length: end - start }, (_, index) => start + index),
    message: `Merged Timsort run ${start}..${end - 1}.`,
  });
}

function traceHeapSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Heap Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    for (let root = Math.floor(values.length / 2) - 1; root >= 0; root -= 1) {
      events.push({
        type: "sortPartition",
        range: [0, values.length - 1],
        boundary: root,
        scanner: root,
        message: `Sift index ${root} while building the max heap.`,
      });
      heapSiftDown(values, root, values.length, events);
    }

    for (let end = values.length - 1; end >= 1; end -= 1) {
      events.push({
        type: "sortCompare",
        indices: [0, end],
        message: `Move heap maximum ${values[0]} into sorted position ${end}.`,
      });
      swap(values, 0, end);
      events.push({
        type: "sortSwap",
        indices: [0, end],
        values: [...values],
        message: `Swap heap root with index ${end}.`,
      });
      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: values.length - end }, (_, index) => end + index),
        message: `Positions ${end} through ${values.length - 1} are fixed.`,
      });
      heapSiftDown(values, 0, end, events);
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All values are in sorted order.",
    });
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "heapSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Heap Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function heapSiftDown(values: number[], rootStart: number, heapSize: number, events: TraceEvent[]) {
  let root = rootStart;

  while (true) {
    const left = root * 2 + 1;
    if (left >= heapSize) break;

    const right = left + 1;
    let largest = root;
    events.push({
      type: "sortCompare",
      indices: [root, left],
      message: `Compare heap parent ${values[root]} with left child ${values[left]}.`,
    });
    if (values[left] > values[largest]) largest = left;

    if (right < heapSize) {
      events.push({
        type: "sortCompare",
        indices: [largest, right],
        message: `Compare heap candidate ${values[largest]} with right child ${values[right]}.`,
      });
      if (values[right] > values[largest]) largest = right;
    }

    events.push({
      type: "sortPartition",
      range: [0, heapSize - 1],
      boundary: root,
      scanner: largest,
      message: `Sift heap index ${root} toward ${largest}.`,
    });

    if (largest === root) break;

    swap(values, root, largest);
    events.push({
      type: "sortSwap",
      indices: [root, largest],
      values: [...values],
      message: `Swap heap parent ${root} with child ${largest}.`,
    });
    root = largest;
  }
}

function quicksortRange(values: number[], low: number, high: number, events: TraceEvent[]) {
  if (low >= high) {
    events.push({
      type: "sortMarkSorted",
      indices: [low],
      message: `Value at index ${low} is fixed.`,
    });
    return;
  }

  const pivotIndex = high;
  const pivotValue = values[pivotIndex];
  events.push({
    type: "sortPivot",
    index: pivotIndex,
    value: pivotValue,
    range: [low, high],
    message: `Choose ${pivotValue} at index ${pivotIndex} as the pivot.`,
  });

  let boundary = low;
  for (let scanner = low; scanner < high; scanner += 1) {
    events.push({
      type: "sortCompare",
      indices: [scanner, pivotIndex],
      message: `Compare ${values[scanner]} at index ${scanner} with pivot ${pivotValue}.`,
    });
    events.push({
      type: "sortPartition",
      range: [low, high],
      boundary,
      scanner,
      message: `Partition boundary is at index ${boundary}.`,
    });

    if (values[scanner] <= pivotValue) {
      if (boundary !== scanner) {
        swap(values, boundary, scanner);
        events.push({
          type: "sortSwap",
          indices: [boundary, scanner],
          values: [...values],
          message: `Move ${values[boundary]} into the left partition.`,
        });
      }
      boundary += 1;
    }
  }

  if (boundary !== pivotIndex) {
    swap(values, boundary, pivotIndex);
    events.push({
      type: "sortSwap",
      indices: [boundary, pivotIndex],
      values: [...values],
      message: `Place pivot ${pivotValue} at index ${boundary}.`,
    });
  }

  events.push({
    type: "sortMarkSorted",
    indices: [boundary],
    message: `Pivot ${pivotValue} is fixed at index ${boundary}.`,
  });

  if (boundary > low) {
    const leftHigh = boundary - 1;
    if (low === leftHigh) {
      events.push({
        type: "sortMarkSorted",
        indices: [low],
        message: `Value at index ${low} is fixed.`,
      });
    } else {
      quicksortRange(values, low, leftHigh, events);
    }
  }

  if (boundary < high) {
    const rightLow = boundary + 1;
    if (rightLow === high) {
      events.push({
        type: "sortMarkSorted",
        indices: [rightLow],
        message: `Value at index ${rightLow} is fixed.`,
      });
    } else {
      quicksortRange(values, rightLow, high, events);
    }
  }
}

function traceBfs(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const adjacency = buildAdjacency(input.edges);
  const distances = new Map<string, number | null>(nodeOrder.map((node) => [node, null]));
  const previous = new Map<string, string>();
  const discovered = new Set<string>([input.source]);
  const queue = [input.source];
  const events: TraceEvent[] = [];

  distances.set(input.source, 0);

  while (queue.length > 0) {
    const node = queue.shift() as string;
    const distance = distances.get(node) ?? 0;

    events.push({
      type: "graphVisit",
      node,
      distance,
      message: `Visit node ${node} at breadth-first depth ${distance}.`,
    });

    if (stopAtTarget && input.target === node) {
      events.push({
        type: "graphSettle",
        node,
        distance,
        message: `Reached target node ${node}.`,
      });
      break;
    }

    for (const edge of adjacency.get(node) ?? []) {
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        message: `Inspect edge ${edge.edgeId} from ${node} to ${edge.to}.`,
      });

      if (discovered.has(edge.to)) {
        const previousDistance = distances.get(edge.to) ?? null;
        events.push({
          type: "graphRelaxEdge",
          edgeId: edge.edgeId,
          from: node,
          to: edge.to,
          weight: edge.weight,
          previousDistance,
          newDistance: previousDistance,
          improved: false,
          message: `${edge.to} was already discovered.`,
        });
        continue;
      }

      const nextDistance = distance + 1;
      discovered.add(edge.to);
      queue.push(edge.to);
      distances.set(edge.to, nextDistance);
      previous.set(edge.to, node);
      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        previousDistance: null,
        newDistance: nextDistance,
        improved: true,
        message: `Discover ${edge.to} at depth ${nextDistance}.`,
      });
    }

    events.push({
      type: "graphSettle",
      node,
      distance,
      message: `Finish scanning node ${node}.`,
    });
  }

  const [path, totalDistance] = input.target
    ? reconstructPath(input.source, input.target, previous, distances)
    : [[], null];

  if (input.target) {
    events.push({
      type: "graphPath",
      nodes: path,
      totalDistance,
      message:
        totalDistance === null
          ? "No path reaches the selected target."
          : `Shortest unweighted path has ${totalDistance} edges.`,
    });
  }

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: node === input.source ? 0 : null,
  }));
  const finalDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: distances.get(node) ?? null,
  }));

  return {
    algorithm: "bfs",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: initialDistances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: finalDistances,
      path,
    },
    events,
    metadata: {
      algorithmName: "Breadth-First Search",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Shortest unweighted path has ${totalDistance} edges.`,
    },
  };
}

function traceDfs(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const adjacency = buildAdjacency(input.edges);
  const distances = new Map<string, number | null>(nodeOrder.map((node) => [node, null]));
  const previous = new Map<string, string>();
  const visited = new Set<string>();
  const stack: Array<[string, number]> = [[input.source, 0]];
  const events: TraceEvent[] = [];

  distances.set(input.source, 0);

  while (stack.length > 0) {
    const [node, depth] = stack.pop() as [string, number];
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    distances.set(node, depth);
    events.push({
      type: "graphVisit",
      node,
      distance: depth,
      message: `Visit node ${node} at depth-first depth ${depth}.`,
    });

    if (stopAtTarget && input.target === node) {
      events.push({
        type: "graphSettle",
        node,
        distance: depth,
        message: `Reached target node ${node}.`,
      });
      break;
    }

    const edges = adjacency.get(node) ?? [];
    for (const edge of edges) {
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        message: `Inspect edge ${edge.edgeId} from ${node} to ${edge.to}.`,
      });
    }

    for (const edge of [...edges].reverse()) {
      if (visited.has(edge.to) || stack.some(([queued]) => queued === edge.to)) {
        const previousDistance = distances.get(edge.to) ?? null;
        events.push({
          type: "graphRelaxEdge",
          edgeId: edge.edgeId,
          from: node,
          to: edge.to,
          weight: edge.weight,
          previousDistance,
          newDistance: previousDistance,
          improved: false,
          message: `${edge.to} is already scheduled or visited.`,
        });
        continue;
      }

      const nextDepth = depth + 1;
      distances.set(edge.to, nextDepth);
      previous.set(edge.to, node);
      stack.push([edge.to, nextDepth]);
      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        previousDistance: null,
        newDistance: nextDepth,
        improved: true,
        message: `Push ${edge.to} onto the DFS stack at depth ${nextDepth}.`,
      });
    }

    events.push({
      type: "graphSettle",
      node,
      distance: depth,
      message: `Finish node ${node}.`,
    });
  }

  const [path, totalDistance] = input.target
    ? reconstructPath(input.source, input.target, previous, distances)
    : [[], null];

  if (input.target) {
    events.push({
      type: "graphPath",
      nodes: path,
      totalDistance,
      message:
        totalDistance === null
          ? "No path reaches the selected target."
          : `Depth-first target path has ${totalDistance} edges.`,
    });
  }

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: node === input.source ? 0 : null,
  }));
  const finalDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: distances.get(node) ?? null,
  }));

  return {
    algorithm: "dfs",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: initialDistances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: finalDistances,
      path,
    },
    events,
    metadata: {
      algorithmName: "Depth-First Search",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Depth-first target path has ${totalDistance} edges.`,
    },
  };
}

function traceDijkstra(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const distances = new Map<string, number | null>();
  const previous = new Map<string, string>();
  const unvisited = new Set(nodeOrder);
  const adjacency = buildAdjacency(input.edges);
  const events: TraceEvent[] = [];

  for (const node of nodeOrder) {
    distances.set(node, node === input.source ? 0 : null);
  }

  while (unvisited.size > 0) {
    const current = pickNearestUnvisited(nodeOrder, unvisited, distances);
    if (!current) {
      break;
    }

    events.push({
      type: "graphVisit",
      node: current.node,
      distance: current.distance,
      message: `Visit node ${current.node} at distance ${current.distance}.`,
    });

    for (const edge of adjacency.get(current.node) ?? []) {
      const previousDistance = distances.get(edge.to) ?? null;
      const candidate = current.distance + edge.weight;
      const improved = previousDistance === null || candidate < previousDistance;

      if (improved) {
        distances.set(edge.to, candidate);
        previous.set(edge.to, current.node);
      }

      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: current.node,
        to: edge.to,
        weight: edge.weight,
        previousDistance,
        newDistance: improved ? candidate : previousDistance,
        improved,
        message: improved
          ? `Update ${edge.to} to distance ${candidate}.`
          : `Keep ${edge.to} at its current best distance.`,
      });
    }

    unvisited.delete(current.node);
    events.push({
      type: "graphSettle",
      node: current.node,
      distance: current.distance,
      message: `Settle node ${current.node}.`,
    });

    if (stopAtTarget && input.target === current.node) {
      break;
    }
  }

  const [path, totalDistance] = input.target
    ? reconstructPath(input.source, input.target, previous, distances)
    : [[], null];

  if (input.target) {
    events.push({
      type: "graphPath",
      nodes: path,
      totalDistance,
      message:
        totalDistance === null
          ? "No path reaches the selected target."
          : `Shortest path has total distance ${totalDistance}.`,
    });
  }

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: node === input.source ? 0 : null,
  }));
  const finalDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: distances.get(node) ?? null,
  }));

  return {
    algorithm: "dijkstra",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: initialDistances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: finalDistances,
      path,
    },
    events,
    metadata: {
      algorithmName: "Dijkstra",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Shortest path distance is ${totalDistance}.`,
    },
  };
}

function traceBellmanFord(input: GraphInput): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const distances = new Map<string, number | null>(nodeOrder.map((node) => [node, null]));
  const previous = new Map<string, string>();
  const adjacency = buildAdjacency(input.edges);
  const events: TraceEvent[] = [];
  distances.set(input.source, 0);

  for (let pass = 0; pass < Math.max(0, input.nodes.length - 1); pass += 1) {
    let changed = false;
    events.push({
      type: "graphVisit",
      node: input.source,
      distance: pass,
      message: `Start Bellman-Ford relaxation pass ${pass + 1}.`,
    });

    for (const from of nodeOrder) {
      for (const edge of adjacency.get(from) ?? []) {
        const fromDistance = distances.get(from) ?? null;
        const previousDistance = distances.get(edge.to) ?? null;
        const candidate = fromDistance === null ? null : fromDistance + edge.weight;
        const improved = candidate !== null && (previousDistance === null || candidate < previousDistance);

        if (improved) {
          distances.set(edge.to, candidate);
          previous.set(edge.to, from);
          changed = true;
        }

        events.push({
          type: "graphRelaxEdge",
          edgeId: edge.edgeId,
          from,
          to: edge.to,
          weight: edge.weight,
          previousDistance,
          newDistance: improved ? candidate : previousDistance,
          improved,
          message:
            candidate === null
              ? `Skip edge ${edge.edgeId} because ${from} is unreachable.`
              : improved
                ? `Update ${edge.to} to distance ${candidate}.`
                : `Keep ${edge.to} at its current best distance.`,
        });
      }
    }

    if (!changed) {
      events.push({
        type: "graphSettle",
        node: input.source,
        distance: pass,
        message: `No distances changed on pass ${pass + 1}; stop early.`,
      });
      break;
    }
  }

  const [path, totalDistance] = input.target
    ? reconstructPath(input.source, input.target, previous, distances)
    : [[], null];

  if (input.target) {
    events.push({
      type: "graphPath",
      nodes: path,
      totalDistance,
      message:
        totalDistance === null
          ? "No path reaches the selected target."
          : `Shortest path has total distance ${totalDistance}.`,
    });
  }

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: node === input.source ? 0 : null,
  }));
  const finalDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: distances.get(node) ?? null,
  }));

  return {
    algorithm: "bellmanFord",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: initialDistances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: finalDistances,
      path,
    },
    events,
    metadata: {
      algorithmName: "Bellman-Ford",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Shortest path distance is ${totalDistance}.`,
    },
  };
}

function traceAStar(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const positions = new Map(input.nodes.map((node) => [node.id, { x: node.x, y: node.y }]));
  const positiveWeights = input.edges.map((edge) => edge.weight).filter((weight) => weight > 0);
  const minPositiveWeight = positiveWeights.length > 0 ? Math.min(...positiveWeights) : null;
  const distances = new Map<string, number | null>(nodeOrder.map((node) => [node, null]));
  const previous = new Map<string, string>();
  const adjacency = buildAdjacency(input.edges);
  const open = new Set<string>([input.source]);
  const settled = new Set<string>();
  const events: TraceEvent[] = [];
  distances.set(input.source, 0);

  while (open.size > 0) {
    const current = pickLowestEstimate(nodeOrder, open, distances, input.target ?? null, positions, minPositiveWeight);
    if (!current) {
      break;
    }

    open.delete(current.node);
    events.push({
      type: "graphVisit",
      node: current.node,
      distance: current.distance,
      message: `Expand ${current.node} with distance ${current.distance} and estimated total ${current.estimate}.`,
    });

    for (const edge of adjacency.get(current.node) ?? []) {
      const previousDistance = distances.get(edge.to) ?? null;
      const candidate = current.distance + edge.weight;
      const improved = previousDistance === null || candidate < previousDistance;

      if (improved) {
        distances.set(edge.to, candidate);
        previous.set(edge.to, current.node);
        if (!settled.has(edge.to)) {
          open.add(edge.to);
        }
      }

      const nextHeuristic = graphHeuristic(edge.to, input.target ?? null, positions, minPositiveWeight);
      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: current.node,
        to: edge.to,
        weight: edge.weight,
        previousDistance,
        newDistance: improved ? candidate : previousDistance,
        improved,
        message: improved
          ? `Update ${edge.to} to distance ${candidate}; estimated total ${candidate + nextHeuristic}.`
          : `Keep ${edge.to} at its current best distance.`,
      });
    }

    settled.add(current.node);
    events.push({
      type: "graphSettle",
      node: current.node,
      distance: current.distance,
      message:
        current.heuristic === 0
          ? `Settle node ${current.node}.`
          : `Settle node ${current.node}; heuristic contribution was ${current.heuristic}.`,
    });

    if (stopAtTarget && input.target === current.node) {
      break;
    }
  }

  const [path, totalDistance] = input.target
    ? reconstructPath(input.source, input.target, previous, distances)
    : [[], null];

  if (input.target) {
    events.push({
      type: "graphPath",
      nodes: path,
      totalDistance,
      message:
        totalDistance === null
          ? "No path reaches the selected target."
          : `A* path has total distance ${totalDistance}.`,
    });
  }

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: node === input.source ? 0 : null,
  }));
  const finalDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: distances.get(node) ?? null,
  }));

  return {
    algorithm: "aStar",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: initialDistances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: finalDistances,
      path,
    },
    events,
    metadata: {
      algorithmName: "A* Search",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `A* path distance is ${totalDistance}.`,
    },
  };
}

function tracePrimMst(input: GraphInput): Trace {
  validateGraph(input);
  validateMstGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const visited = new Set<string>([input.source]);
  const selectedEdges: string[] = [];
  const events: TraceEvent[] = [
    {
      type: "graphVisit",
      node: input.source,
      distance: 0,
      message: `Start the spanning tree at node ${input.source}.`,
    },
  ];
  let totalWeight = 0;

  while (visited.size < input.nodes.length) {
    let best: { edge: GraphEdge; index: number; from: string; to: string } | null = null;

    for (const [index, edge] of input.edges.entries()) {
      const fromVisited = visited.has(edge.from);
      const toVisited = visited.has(edge.to);

      if (fromVisited === toVisited) {
        if (fromVisited) {
          events.push({
            type: "graphRejectEdge",
            edgeId: edge.id,
            from: edge.from,
            to: edge.to,
            weight: edge.weight,
            message: `Reject edge ${edge.id} because both endpoints are already in the tree.`,
          });
        }
        continue;
      }

      const from = fromVisited ? edge.from : edge.to;
      const to = fromVisited ? edge.to : edge.from;
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.id,
        from,
        to,
        weight: edge.weight,
        message: `Consider edge ${edge.id} from ${from} to ${to} with weight ${edge.weight}.`,
      });

      if (!best || edge.weight < best.edge.weight || (edge.weight === best.edge.weight && index < best.index)) {
        best = { edge, index, from, to };
      }
    }

    if (!best) {
      throw new Error("Prim MST requires a connected graph to span every node.");
    }

    visited.add(best.to);
    selectedEdges.push(best.edge.id);
    totalWeight += best.edge.weight;
    events.push({
      type: "graphSelectEdge",
      edgeId: best.edge.id,
      from: best.from,
      to: best.to,
      weight: best.edge.weight,
      totalWeight,
      message: `Select edge ${best.edge.id} and add node ${best.to} to the tree.`,
    });
    events.push({
      type: "graphSettle",
      node: best.to,
      distance: totalWeight,
      message: `Node ${best.to} is now connected to the spanning tree.`,
    });
  }

  events.push({
    type: "graphSpanningTree",
    edgeIds: selectedEdges,
    totalWeight,
    message: `Minimum spanning tree complete with total weight ${totalWeight}.`,
  });

  const distances = nodeOrder.map<NodeDistance>((node) => ({ node, distance: null }));

  return {
    algorithm: "primMst",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: null,
      distances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: null,
      distances,
      path: selectedEdges,
    },
    events,
    metadata: {
      algorithmName: "Prim MST",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary: `MST total weight is ${totalWeight}.`,
    },
  };
}

function traceKruskal(input: GraphInput): Trace {
  validateGraph(input);
  validateMstGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const unionFind = new UnionFind(nodeOrder);
  const selectedEdges: string[] = [];
  const events: TraceEvent[] = [];
  let totalWeight = 0;

  const edgesByWeight = input.edges
    .map((edge, index) => ({ edge, index }))
    .sort((left, right) => left.edge.weight - right.edge.weight || left.index - right.index);

  for (const { edge } of edgesByWeight) {
    events.push({
      type: "graphConsiderEdge",
      edgeId: edge.id,
      from: edge.from,
      to: edge.to,
      weight: edge.weight,
      message: `Consider edge ${edge.id} with weight ${edge.weight} in sorted order.`,
    });

    if (unionFind.connected(edge.from, edge.to)) {
      events.push({
        type: "graphRejectEdge",
        edgeId: edge.id,
        from: edge.from,
        to: edge.to,
        weight: edge.weight,
        message: `Reject edge ${edge.id} because it would create a cycle.`,
      });
      continue;
    }

    unionFind.union(edge.from, edge.to);
    selectedEdges.push(edge.id);
    totalWeight += edge.weight;
    events.push({
      type: "graphSelectEdge",
      edgeId: edge.id,
      from: edge.from,
      to: edge.to,
      weight: edge.weight,
      totalWeight,
      message: `Select edge ${edge.id} and merge its two components.`,
    });

    if (selectedEdges.length === Math.max(0, input.nodes.length - 1)) {
      break;
    }
  }

  if (selectedEdges.length !== Math.max(0, input.nodes.length - 1)) {
    throw new Error("Kruskal requires a connected graph to span every node.");
  }

  events.push({
    type: "graphSpanningTree",
    edgeIds: selectedEdges,
    totalWeight,
    message: `Minimum spanning tree complete with total weight ${totalWeight}.`,
  });

  const distances = nodeOrder.map<NodeDistance>((node) => ({ node, distance: null }));

  return {
    algorithm: "kruskal",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: null,
      distances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: null,
      distances,
      path: selectedEdges,
    },
    events,
    metadata: {
      algorithmName: "Kruskal",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary: `MST total weight is ${totalWeight}.`,
    },
  };
}

function traceKmp(input: SequenceInput): Trace {
  validateSequence(input);

  const text = Array.from(input.text);
  const pattern = Array.from(input.pattern);
  const events: TraceEvent[] = [];
  const lps = buildLpsTrace(pattern, events);
  const matches: number[] = [];
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    const matched = text[textIndex] === pattern[patternIndex];
    events.push({
      type: "sequenceCompare",
      textIndex,
      patternIndex,
      matched,
      message: `Compare text[${textIndex}] '${text[textIndex]}' with pattern[${patternIndex}] '${pattern[patternIndex]}'.`,
    });

    if (matched) {
      textIndex += 1;
      patternIndex += 1;

      if (patternIndex === pattern.length) {
        const startIndex = textIndex - pattern.length;
        const endIndex = textIndex - 1;
        matches.push(startIndex);
        events.push({
          type: "sequenceMatch",
          startIndex,
          endIndex,
          message: `Pattern found at text index ${startIndex}.`,
        });
        const fallback = lps[patternIndex - 1];
        events.push({
          type: "sequenceFallback",
          fromPatternIndex: patternIndex,
          toPatternIndex: fallback,
          message: `Resume from prefix length ${fallback}.`,
        });
        patternIndex = fallback;
      }
    } else if (patternIndex !== 0) {
      const fallback = lps[patternIndex - 1];
      events.push({
        type: "sequenceFallback",
        fromPatternIndex: patternIndex,
        toPatternIndex: fallback,
        message: `Mismatch: fall back from pattern index ${patternIndex} to ${fallback}.`,
      });
      patternIndex = fallback;
    } else {
      textIndex += 1;
    }
  }

  return {
    algorithm: "kmp",
    initialState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: Array(pattern.length).fill(0),
      matches: [],
      matrix: [],
    },
    finalState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps,
      matches,
      matrix: [],
    },
    events,
    metadata: {
      algorithmName: "Knuth-Morris-Pratt",
      category: "Sequence",
      inputSize: text.length,
      eventCount: events.length,
      resultSummary:
        matches.length === 0 ? "No pattern matches found." : `Found ${matches.length} pattern match(es).`,
    },
  };
}

function traceLevenshtein(input: SequenceInput): Trace {
  validateEditDistance(input);

  const source = Array.from(input.text);
  const target = Array.from(input.pattern);
  const rows = source.length + 1;
  const cols = target.length + 1;
  const matrix = initialEditMatrix(rows, cols);
  const events: TraceEvent[] = [];

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = source[row - 1] === target[col - 1] ? 0 : 1;
      const deletion = (matrix[row - 1][col] ?? 0) + 1;
      const insertion = (matrix[row][col - 1] ?? 0) + 1;
      const substitution = (matrix[row - 1][col - 1] ?? 0) + cost;
      const value = Math.min(deletion, insertion, substitution);
      const operation =
        value === substitution && cost === 0
          ? "match"
          : value === substitution
            ? "substitute"
            : value === deletion
              ? "delete"
              : "insert";

      matrix[row][col] = value;
      events.push({
        type: "sequenceEditCell",
        row,
        col,
        deletion,
        insertion,
        substitution,
        value,
        operation,
        matrix: cloneMatrix(matrix),
        message: `Set cell (${row}, ${col}) to ${value} using ${operation}.`,
      });
    }
  }

  const distance = matrix[rows - 1][cols - 1] ?? 0;
  return {
    algorithm: "levenshtein",
    initialState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: [],
      matches: [],
      matrix: initialEditMatrix(rows, cols),
    },
    finalState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: [],
      matches: [],
      matrix,
    },
    events,
    metadata: {
      algorithmName: "Levenshtein Distance",
      category: "Sequence",
      inputSize: Math.max(source.length, target.length),
      eventCount: events.length,
      resultSummary: `Edit distance is ${distance}.`,
    },
  };
}

function initialEditMatrix(rows: number, cols: number) {
  const matrix: Array<Array<number | null>> = Array.from({ length: rows }, () => Array(cols).fill(null));
  for (let row = 0; row < rows; row += 1) matrix[row][0] = row;
  for (let col = 0; col < cols; col += 1) matrix[0][col] = col;
  return matrix;
}

function cloneMatrix(matrix: Array<Array<number | null>>) {
  return matrix.map((row) => [...row]);
}

function buildLpsTrace(pattern: string[], events: TraceEvent[]) {
  const lps = Array(pattern.length).fill(0);
  let prefixIndex = 0;
  let patternIndex = 1;

  while (patternIndex < pattern.length) {
    events.push({
      type: "sequenceBuildPrefix",
      patternIndex,
      prefixIndex,
      lps: [...lps],
      message: `Build prefix: compare pattern[${patternIndex}] with pattern[${prefixIndex}].`,
    });

    if (pattern[patternIndex] === pattern[prefixIndex]) {
      prefixIndex += 1;
      lps[patternIndex] = prefixIndex;
      events.push({
        type: "sequenceBuildPrefix",
        patternIndex,
        prefixIndex,
        lps: [...lps],
        message: `Set lps[${patternIndex}] to ${prefixIndex}.`,
      });
      patternIndex += 1;
    } else if (prefixIndex !== 0) {
      const fallback = lps[prefixIndex - 1];
      events.push({
        type: "sequenceFallback",
        fromPatternIndex: prefixIndex,
        toPatternIndex: fallback,
        message: `Prefix mismatch: fall back to prefix length ${fallback}.`,
      });
      prefixIndex = fallback;
    } else {
      lps[patternIndex] = 0;
      events.push({
        type: "sequenceBuildPrefix",
        patternIndex,
        prefixIndex,
        lps: [...lps],
        message: `Set lps[${patternIndex}] to 0.`,
      });
      patternIndex += 1;
    }
  }

  return lps;
}

interface AdjacentEdge {
  edgeId: string;
  to: string;
  weight: number;
}

function buildAdjacency(edges: GraphEdge[]) {
  const adjacency = new Map<string, AdjacentEdge[]>();
  for (const edge of edges) {
    const forward = adjacency.get(edge.from) ?? [];
    forward.push({ edgeId: edge.id, to: edge.to, weight: edge.weight });
    adjacency.set(edge.from, forward);

    if (!edge.directed) {
      const backward = adjacency.get(edge.to) ?? [];
      backward.push({ edgeId: edge.id, to: edge.from, weight: edge.weight });
      adjacency.set(edge.to, backward);
    }
  }
  return adjacency;
}

function pickNearestUnvisited(
  nodeOrder: string[],
  unvisited: Set<string>,
  distances: Map<string, number | null>,
) {
  let best: { node: string; distance: number } | null = null;

  for (const node of nodeOrder) {
    if (!unvisited.has(node)) {
      continue;
    }

    const distance = distances.get(node);
    if (distance === null || distance === undefined) {
      continue;
    }

    if (!best || distance < best.distance) {
      best = { node, distance };
    }
  }

  return best;
}

function pickLowestEstimate(
  nodeOrder: string[],
  open: Set<string>,
  distances: Map<string, number | null>,
  target: string | null,
  positions: Map<string, { x: number; y: number }>,
  minPositiveWeight: number | null,
) {
  let best: { node: string; distance: number; estimate: number; heuristic: number } | null = null;

  for (const node of nodeOrder) {
    if (!open.has(node)) {
      continue;
    }

    const distance = distances.get(node);
    if (distance === null || distance === undefined) {
      continue;
    }

    const heuristic = graphHeuristic(node, target, positions, minPositiveWeight);
    const estimate = distance + heuristic;
    if (
      !best ||
      estimate < best.estimate ||
      (estimate === best.estimate &&
        (heuristic < best.heuristic || (heuristic === best.heuristic && distance < best.distance)))
    ) {
      best = { node, distance, estimate, heuristic };
    }
  }

  return best;
}

function graphHeuristic(
  node: string,
  target: string | null,
  positions: Map<string, { x: number; y: number }>,
  minPositiveWeight: number | null,
) {
  if (!target || minPositiveWeight === null) {
    return 0;
  }

  const current = positions.get(node);
  const destination = positions.get(target);
  if (!current || !destination) {
    return 0;
  }

  const dx = current.x - destination.x;
  const dy = current.y - destination.y;
  return Math.floor(Math.hypot(dx, dy) * minPositiveWeight);
}

function reconstructPath(
  source: string,
  target: string,
  previous: Map<string, string>,
  distances: Map<string, number | null>,
): [string[], number | null] {
  const totalDistance = distances.get(target) ?? null;
  if (totalDistance === null) {
    return [[], null];
  }

  if (source === target) {
    return [[source], totalDistance];
  }

  const path = [target];
  let current = target;
  while (current !== source) {
    const parent = previous.get(current);
    if (!parent) {
      return [[], null];
    }
    path.push(parent);
    current = parent;
  }

  path.reverse();
  return [path, totalDistance];
}

function validateGraph(input: GraphInput) {
  if (input.nodes.length === 0) {
    throw new Error("Graph input needs at least one node.");
  }

  const nodes = new Set(input.nodes.map((node) => node.id));
  if (!nodes.has(input.source)) {
    throw new Error(`Source node '${input.source}' does not exist.`);
  }
  if (input.target && !nodes.has(input.target)) {
    throw new Error(`Target node '${input.target}' does not exist.`);
  }
  for (const edge of input.edges) {
    if (!nodes.has(edge.from) || !nodes.has(edge.to)) {
      throw new Error(`Edge '${edge.id}' references an unknown node.`);
    }
  }
}

function validateMstGraph(input: GraphInput) {
  if (input.edges.length === 0) {
    throw new Error("MST algorithms require at least one weighted edge.");
  }
  const directedEdge = input.edges.find((edge) => edge.directed);
  if (directedEdge) {
    throw new Error(`MST algorithms require undirected edges; edge '${directedEdge.id}' is directed.`);
  }
}

class UnionFind {
  private parent = new Map<string, string>();
  private rank = new Map<string, number>();

  constructor(nodes: string[]) {
    for (const node of nodes) {
      this.parent.set(node, node);
      this.rank.set(node, 0);
    }
  }

  connected(left: string, right: string) {
    return this.find(left) === this.find(right);
  }

  union(left: string, right: string) {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (leftRoot === rightRoot) return;

    const leftRank = this.rank.get(leftRoot) ?? 0;
    const rightRank = this.rank.get(rightRoot) ?? 0;
    if (leftRank < rightRank) {
      this.parent.set(leftRoot, rightRoot);
    } else if (leftRank > rightRank) {
      this.parent.set(rightRoot, leftRoot);
    } else {
      this.parent.set(rightRoot, leftRoot);
      this.rank.set(leftRoot, leftRank + 1);
    }
  }

  private find(node: string): string {
    const parent = this.parent.get(node) ?? node;
    if (parent === node) return parent;

    const root = this.find(parent);
    this.parent.set(node, root);
    return root;
  }
}

function validateSequence(input: SequenceInput) {
  const textLength = Array.from(input.text).length;
  const patternLength = Array.from(input.pattern).length;

  if (textLength === 0) {
    throw new Error("KMP text cannot be empty.");
  }
  if (patternLength === 0) {
    throw new Error("KMP pattern cannot be empty.");
  }
  if (patternLength > textLength) {
    throw new Error("KMP pattern cannot be longer than the text.");
  }
  if (textLength > 160) {
    throw new Error("KMP text is capped at 160 characters for interactive playback.");
  }
  if (patternLength > 48) {
    throw new Error("KMP pattern is capped at 48 characters for interactive playback.");
  }
}

function validateEditDistance(input: SequenceInput) {
  const textLength = Array.from(input.text).length;
  const patternLength = Array.from(input.pattern).length;

  if (textLength === 0) {
    throw new Error("Levenshtein source text cannot be empty.");
  }
  if (patternLength === 0) {
    throw new Error("Levenshtein target text cannot be empty.");
  }
  if (textLength > 24) {
    throw new Error("Levenshtein source text is capped at 24 characters for interactive playback.");
  }
  if (patternLength > 24) {
    throw new Error("Levenshtein target text is capped at 24 characters for interactive playback.");
  }
}

function swap(values: number[], left: number, right: number) {
  const next = values[left];
  values[left] = values[right];
  values[right] = next;
}
