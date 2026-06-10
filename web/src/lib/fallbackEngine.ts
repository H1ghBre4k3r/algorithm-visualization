import type {
  AlgorithmRequest,
  DistributedInput,
  DistributedMessage,
  DistributedPeerState,
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

  if (request.algorithm === "pancakeSort" && request.input.type === "sort") {
    return tracePancakeSort(request.input.value);
  }

  if (request.algorithm === "quickselect" && request.input.type === "sort") {
    return traceQuickselect(request.input.value);
  }

  if (request.algorithm === "bitonicSort" && request.input.type === "sort") {
    return traceBitonicSort(request.input.value);
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

  if (request.algorithm === "topologicalSort" && request.input.type === "graph") {
    return traceTopologicalSort(request.input.value);
  }

  if (request.algorithm === "kmp" && request.input.type === "sequence") {
    return traceKmp(request.input.value);
  }

  if (request.algorithm === "boyerMoore" && request.input.type === "sequence") {
    return traceBoyerMoore(request.input.value);
  }

  if (request.algorithm === "levenshtein" && request.input.type === "sequence") {
    return traceLevenshtein(request.input.value);
  }

  if (request.algorithm === "prefixTrie" && request.input.type === "sequence") {
    return tracePrefixTrie(request.input.value);
  }

  if (request.algorithm === "handshake" && request.input.type === "distributed") {
    return traceHandshake(request.input.value);
  }

  if (request.algorithm === "timeSync" && request.input.type === "distributed") {
    return traceTimeSync(request.input.value);
  }

  if (request.algorithm === "paxos" && request.input.type === "distributed") {
    return tracePaxos(request.input.value);
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

function traceQuickselect(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Quickselect input is capped at 128 values for interactive playback.");
  }
  if (values.length === 0) {
    throw new Error("Quickselect requires at least one value to select from.");
  }

  const targetIndex = input.targetIndex ?? Math.floor(values.length / 2);
  if (targetIndex < 0 || targetIndex >= values.length) {
    throw new Error(`Quickselect targetIndex ${targetIndex} is outside the values array.`);
  }

  let low = 0;
  let high = values.length - 1;
  while (true) {
    events.push({
      type: "sortPartition",
      range: [low, high],
      boundary: targetIndex,
      scanner: low,
      message: `Search range ${low}..${high} for index ${targetIndex}.`,
    });

    const pivotIndex = high;
    const pivotValue = values[pivotIndex];
    events.push({
      type: "sortPivot",
      index: pivotIndex,
      value: pivotValue,
      range: [low, high],
      message: `Choose ${pivotValue} at index ${pivotIndex} as the pivot.`,
    });

    const pivotFinal = quickselectPartition(values, low, high, events);
    if (pivotFinal === targetIndex) {
      events.push({
        type: "sortMarkSorted",
        indices: [targetIndex],
        message: `Index ${targetIndex} now holds the selected value ${values[targetIndex]}.`,
      });
      break;
    }

    if (targetIndex < pivotFinal) {
      high = pivotFinal - 1;
      events.push({
        type: "sortPartition",
        range: [low, high],
        boundary: targetIndex,
        scanner: low,
        message: `Target is left of pivot; keep range ${low}..${high}.`,
      });
    } else {
      low = pivotFinal + 1;
      events.push({
        type: "sortPartition",
        range: [low, high],
        boundary: targetIndex,
        scanner: low,
        message: `Target is right of pivot; keep range ${low}..${high}.`,
      });
    }
  }

  return {
    algorithm: "quickselect",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Quickselect",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Selected index ${targetIndex}: ${values[targetIndex]}.`,
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

function tracePancakeSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Pancake Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    for (let unsortedEnd = values.length - 1; unsortedEnd >= 1; unsortedEnd -= 1) {
      let maxIndex = 0;
      events.push({
        type: "sortPartition",
        range: [0, unsortedEnd],
        boundary: unsortedEnd,
        scanner: 0,
        message: `Find largest pancake for position ${unsortedEnd}.`,
      });

      for (let scanner = 1; scanner <= unsortedEnd; scanner += 1) {
        events.push({
          type: "sortCompare",
          indices: [maxIndex, scanner],
          message: `Compare current largest ${values[maxIndex]} with candidate ${values[scanner]}.`,
        });

        if (values[scanner] > values[maxIndex]) {
          maxIndex = scanner;
          events.push({
            type: "sortPartition",
            range: [0, unsortedEnd],
            boundary: maxIndex,
            scanner,
            message: `Largest pancake candidate ${values[maxIndex]} is now at index ${maxIndex}.`,
          });
        }
      }

      if (maxIndex === unsortedEnd) {
        events.push({
          type: "sortMarkSorted",
          indices: Array.from({ length: values.length - unsortedEnd }, (_, index) => unsortedEnd + index),
          message: `Value at index ${unsortedEnd} is already fixed.`,
        });
        continue;
      }

      if (maxIndex > 0) {
        events.push({
          type: "sortPartition",
          range: [0, maxIndex],
          boundary: maxIndex,
          scanner: 0,
          message: `Flip prefix 0..${maxIndex} to bring the largest pancake to front.`,
        });
        pancakeFlip(values, maxIndex, events);
      }

      events.push({
        type: "sortPartition",
        range: [0, unsortedEnd],
        boundary: unsortedEnd,
        scanner: 0,
        message: `Flip prefix 0..${unsortedEnd} to fix the largest pancake.`,
      });
      pancakeFlip(values, unsortedEnd, events);

      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: values.length - unsortedEnd }, (_, index) => unsortedEnd + index),
        message: `Value at index ${unsortedEnd} is fixed after pancake flips.`,
      });
    }

    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All pancakes are stacked in sorted order.",
    });
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "pancakeSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Pancake Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function pancakeFlip(values: number[], end: number, events: TraceEvent[]) {
  let left = 0;
  let right = end;

  while (left < right) {
    swap(values, left, right);
    events.push({
      type: "sortSwap",
      indices: [left, right],
      values: [...values],
      message: `Flip prefix by swapping positions ${left} and ${right}.`,
    });
    left += 1;
    right -= 1;
  }
}

function traceBitonicSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Bitonic Sort input is capped at 128 values for interactive playback.");
  }
  if (values.length > 1 && !isPowerOfTwo(values.length)) {
    throw new Error("Bitonic Sort requires a power-of-two number of values.");
  }

  if (values.length > 1) {
    bitonicSortRange(values, 0, values.length, true, events);
    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "Bitonic network complete; all values are sorted.",
    });
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "bitonicSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Bitonic Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function bitonicSortRange(
  values: number[],
  start: number,
  length: number,
  ascending: boolean,
  events: TraceEvent[],
) {
  if (length <= 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [start],
      message: `Single network lane ${start} is already ordered.`,
    });
    return;
  }

  const half = length / 2;
  const end = start + length - 1;
  events.push({
    type: "sortPartition",
    range: [start, end],
    boundary: start + half,
    scanner: start,
    message: `Build ${ascending ? "ascending" : "descending"} bitonic run across ${start}..${end}.`,
  });

  bitonicSortRange(values, start, half, true, events);
  bitonicSortRange(values, start + half, half, false, events);
  bitonicMerge(values, start, length, ascending, events);
}

function bitonicMerge(
  values: number[],
  start: number,
  length: number,
  ascending: boolean,
  events: TraceEvent[],
) {
  if (length <= 1) return;

  const half = length / 2;
  const end = start + length - 1;
  events.push({
    type: "sortPartition",
    range: [start, end],
    boundary: start + half,
    scanner: start,
    message: `Merge ${ascending ? "ascending" : "descending"} bitonic run across ${start}..${end}.`,
  });

  for (let offset = 0; offset < half; offset += 1) {
    const left = start + offset;
    const right = left + half;
    events.push({
      type: "sortCompare",
      indices: [left, right],
      message: `Compare network pair ${left} and ${right} for ${ascending ? "ascending" : "descending"} order.`,
    });

    const outOfOrder = ascending ? values[left] > values[right] : values[left] < values[right];
    if (outOfOrder) {
      swap(values, left, right);
      events.push({
        type: "sortSwap",
        indices: [left, right],
        values: [...values],
        message: `Exchange network pair ${left} and ${right}.`,
      });
    }
  }

  bitonicMerge(values, start, half, ascending, events);
  bitonicMerge(values, start + half, half, ascending, events);

  if (ascending) {
    events.push({
      type: "sortMarkSorted",
      indices: Array.from({ length }, (_, index) => start + index),
      message: `Ascending network range ${start}..${end} is ordered.`,
    });
  }
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

function quickselectPartition(values: number[], low: number, high: number, events: TraceEvent[]) {
  const pivotValue = values[high];
  let boundary = low;

  for (let scanner = low; scanner < high; scanner += 1) {
    events.push({
      type: "sortCompare",
      indices: [scanner, high],
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
          message: `Move ${values[boundary]} into the lower partition.`,
        });
      }
      boundary += 1;
    }
  }

  if (boundary !== high) {
    swap(values, boundary, high);
    events.push({
      type: "sortSwap",
      indices: [boundary, high],
      values: [...values],
      message: `Place pivot ${pivotValue} at index ${boundary}.`,
    });
  }

  events.push({
    type: "sortMarkSorted",
    indices: [boundary],
    message: `Pivot ${pivotValue} is fixed at index ${boundary}.`,
  });

  return boundary;
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

function traceTopologicalSort(input: GraphInput): Trace {
  validateGraph(input);
  validateTopologicalGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const indegree = new Map(nodeOrder.map((node) => [node, 0]));
  const outgoing = new Map<string, GraphEdge[]>(nodeOrder.map((node) => [node, []]));
  for (const edge of input.edges) {
    indegree.set(edge.to, (indegree.get(edge.to) ?? 0) + 1);
    outgoing.get(edge.from)?.push(edge);
  }

  const events: TraceEvent[] = [];
  const queue: string[] = [];
  for (const node of nodeOrder) {
    if ((indegree.get(node) ?? 0) === 0) {
      queue.push(node);
      events.push({
        type: "graphVisit",
        node,
        distance: 0,
        message: `Node ${node} starts with indegree 0.`,
      });
    }
  }

  const order: string[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    events.push({
      type: "graphSettle",
      node,
      distance: order.length,
      message: `Place node ${node} at topological position ${order.length}.`,
    });

    for (const edge of outgoing.get(node) ?? []) {
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.id,
        from: edge.from,
        to: edge.to,
        weight: edge.weight,
        message: `Remove dependency from ${edge.from} to ${edge.to}.`,
      });

      const previous = indegree.get(edge.to) ?? 0;
      const next = Math.max(0, previous - 1);
      indegree.set(edge.to, next);
      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.id,
        from: edge.from,
        to: edge.to,
        weight: edge.weight,
        previousDistance: previous,
        newDistance: next,
        improved: next === 0,
        message: `Indegree for ${edge.to} drops from ${previous} to ${next}.`,
      });

      if (next === 0) {
        queue.push(edge.to);
        events.push({
          type: "graphVisit",
          node: edge.to,
          distance: order.length,
          message: `Node ${edge.to} is ready; all prerequisites are settled.`,
        });
      }
    }
  }

  if (order.length !== nodeOrder.length) {
    throw new Error("Topological Sort requires an acyclic directed graph.");
  }

  events.push({
    type: "graphPath",
    nodes: order,
    totalDistance: order.length,
    message: `Topological order: ${order.join(" -> ")}.`,
  });

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({ node, distance: null }));
  const finalDistances = order.map<NodeDistance>((node, index) => ({ node, distance: index + 1 }));

  return {
    algorithm: "topologicalSort",
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
      path: order,
    },
    events,
    metadata: {
      algorithmName: "Topological Sort",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary: `Ordered ${order.length} nodes.`,
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

function traceBoyerMoore(input: SequenceInput): Trace {
  validateBoyerMooreSequence(input);

  const text = Array.from(input.text);
  const pattern = Array.from(input.pattern);
  const lastOccurrence = buildBadCharacterTable(pattern);
  const events: TraceEvent[] = [];
  const matches: number[] = [];
  let alignment = 0;

  while (alignment + pattern.length <= text.length) {
    let patternIndex = pattern.length;
    while (patternIndex > 0) {
      patternIndex -= 1;
      const textIndex = alignment + patternIndex;
      const matched = text[textIndex] === pattern[patternIndex];
      events.push({
        type: "sequenceCompare",
        textIndex,
        patternIndex,
        matched,
        message: `Compare text[${textIndex}] '${text[textIndex]}' with pattern[${patternIndex}] '${pattern[patternIndex]}' from right to left.`,
      });

      if (!matched) {
        const shift = badCharacterShift(text[textIndex], patternIndex, pattern.length, lastOccurrence);
        events.push({
          type: "sequenceFallback",
          fromPatternIndex: patternIndex,
          toPatternIndex: 0,
          message: `Mismatch on '${text[textIndex]}'; shift alignment right by ${shift} using the bad-character rule.`,
        });
        alignment += shift;
        break;
      }
    }

    if (patternIndex === 0 && text[alignment] === pattern[0]) {
      const startIndex = alignment;
      const endIndex = alignment + pattern.length - 1;
      matches.push(startIndex);
      events.push({
        type: "sequenceMatch",
        startIndex,
        endIndex,
        message: `Pattern found at text index ${startIndex}.`,
      });
      const shift = fullMatchShift(pattern, lastOccurrence);
      events.push({
        type: "sequenceFallback",
        fromPatternIndex: pattern.length,
        toPatternIndex: 0,
        message: `Shift alignment right by ${shift} after the match.`,
      });
      alignment += shift;
    }
  }

  return {
    algorithm: "boyerMoore",
    initialState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: [],
      matches: [],
      matrix: [],
    },
    finalState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: [],
      matches,
      matrix: [],
    },
    events,
    metadata: {
      algorithmName: "Boyer-Moore",
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

function buildBadCharacterTable(pattern: string[]) {
  const table = new Map<string, number>();
  for (const [index, character] of pattern.entries()) {
    table.set(character, index);
  }
  return table;
}

function badCharacterShift(
  mismatched: string,
  patternIndex: number,
  patternLength: number,
  lastOccurrence: Map<string, number>,
) {
  const lastIndex = lastOccurrence.get(mismatched);
  if (lastIndex === undefined) {
    return Math.max(1, Math.min(patternIndex + 1, patternLength));
  }
  if (lastIndex < patternIndex) {
    return patternIndex - lastIndex;
  }
  return 1;
}

function fullMatchShift(pattern: string[], lastOccurrence: Map<string, number>) {
  if (pattern.length <= 1) {
    return 1;
  }
  const lastIndex = lastOccurrence.get(pattern[pattern.length - 1]);
  return lastIndex !== undefined && lastIndex < pattern.length - 1 ? pattern.length - 1 - lastIndex : 1;
}

interface TrieBuildNode {
  id: string;
  label: string;
  depth: number;
  terminal: boolean;
  children: Map<string, number>;
}

function tracePrefixTrie(input: SequenceInput): Trace {
  validatePrefixTrie(input);

  const words = input.words ?? [];
  const nodes: TrieBuildNode[] = [
    {
      id: "n0",
      label: "root",
      depth: 0,
      terminal: false,
      children: new Map(),
    },
  ];
  const edges: GraphEdge[] = [];
  const events: TraceEvent[] = [];
  const terminalNodes: string[] = [];

  for (const word of words) {
    let current = 0;
    events.push({
      type: "graphVisit",
      node: nodes[current].id,
      distance: 0,
      message: `Start inserting word '${word}' at the root.`,
    });

    for (const character of Array.from(word)) {
      const existing = nodes[current].children.get(character);
      if (existing !== undefined) {
        const edgeId = trieEdgeId(nodes[current].id, nodes[existing].id);
        events.push({
          type: "graphConsiderEdge",
          edgeId,
          from: nodes[current].id,
          to: nodes[existing].id,
          weight: nodes[existing].depth,
          message: `Follow existing edge '${character}' for '${word}'.`,
        });
        current = existing;
        events.push({
          type: "graphVisit",
          node: nodes[current].id,
          distance: nodes[current].depth,
          message: `Move to prefix '${nodes[current].label}'.`,
        });
        continue;
      }

      const parent = current;
      const next: TrieBuildNode = {
        id: `n${nodes.length}`,
        label: character,
        depth: nodes[parent].depth + 1,
        terminal: false,
        children: new Map(),
      };
      const nextIndex = nodes.length;
      nodes.push(next);
      nodes[parent].children.set(character, nextIndex);
      const edge: GraphEdge = {
        id: trieEdgeId(nodes[parent].id, next.id),
        from: nodes[parent].id,
        to: next.id,
        weight: 1,
        label: character,
        directed: true,
      };
      edges.push(edge);
      events.push({
        type: "graphSelectEdge",
        edgeId: edge.id,
        from: edge.from,
        to: edge.to,
        weight: 1,
        totalWeight: edges.length,
        message: `Create node '${next.label}' with edge '${character}'.`,
      });
      current = nextIndex;
      events.push({
        type: "graphVisit",
        node: next.id,
        distance: next.depth,
        message: `Move to new prefix '${next.label}'.`,
      });
    }

    nodes[current].terminal = true;
    if (!terminalNodes.includes(nodes[current].id)) {
      terminalNodes.push(nodes[current].id);
    }
    events.push({
      type: "graphSettle",
      node: nodes[current].id,
      distance: nodes[current].depth,
      message: `Mark '${word}' as a terminal word.`,
    });
  }

  events.push({
    type: "graphPath",
    nodes: terminalNodes,
    totalDistance: terminalNodes.length,
    message: `Built trie for ${words.length} words with ${nodes.length} nodes.`,
  });

  const graphNodes = layoutTrieNodes(nodes);
  const distances = nodes.map<NodeDistance>((node) => ({
    node: node.id,
    distance: node.depth,
  }));

  return {
    algorithm: "prefixTrie",
    initialState: {
      type: "graph",
      nodes: graphNodes,
      edges,
      source: "n0",
      target: terminalNodes[terminalNodes.length - 1] ?? null,
      distances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: graphNodes,
      edges,
      source: "n0",
      target: terminalNodes[terminalNodes.length - 1] ?? null,
      distances,
      path: terminalNodes,
    },
    events,
    metadata: {
      algorithmName: "Prefix Tree",
      category: "Sequence",
      inputSize: words.length,
      eventCount: events.length,
      resultSummary: `Built ${nodes.length} trie nodes from ${words.length} words.`,
    },
  };
}

function trieEdgeId(from: string, to: string) {
  return `${from}-${to}`;
}

function layoutTrieNodes(nodes: TrieBuildNode[]) {
  const levels = new Map<number, TrieBuildNode[]>();
  for (const node of nodes) {
    const level = levels.get(node.depth) ?? [];
    level.push(node);
    levels.set(node.depth, level);
  }

  const maxDepth = Math.max(...nodes.map((node) => node.depth), 1);
  return nodes.map((node) => {
    const level = levels.get(node.depth) ?? [node];
    const index = level.findIndex((candidate) => candidate.id === node.id);
    const x = (index + 1) / (level.length + 1);
    const y = 0.12 + (node.depth / maxDepth) * 0.76;
    return {
      id: node.id,
      label: node.terminal ? `${node.label}*` : node.label,
      x,
      y,
    };
  });
}

function traceHandshake(input: DistributedInput): Trace {
  validateDistributedInput(input);

  const initiator = input.initiator ?? "";
  const responder = input.responder ?? "";
  const latency = Math.max(40, input.latencyMs ?? 120);
  const events: TraceEvent[] = [];
  const messages: DistributedMessage[] = [];
  const states = input.peers.map<DistributedPeerState>((peer) => ({ peer: peer.id, state: "idle" }));

  pushDistributedState(events, states, initiator, "syn-sent", "Initiator opens the handshake and prepares a SYN.");
  pushDistributedMessage(
    events,
    messages,
    {
      id: "syn",
      from: initiator,
      to: responder,
      label: "SYN",
      sentAt: 0,
      deliverAt: latency,
    },
    "Send SYN from initiator to responder.",
  );
  events.push({
    type: "distributedDeliver",
    messageId: "syn",
    from: initiator,
    to: responder,
    label: "SYN",
    message: "Responder receives SYN and allocates connection state.",
  });
  pushDistributedState(events, states, responder, "syn-received", "Responder records the half-open connection.");

  pushDistributedMessage(
    events,
    messages,
    {
      id: "synAck",
      from: responder,
      to: initiator,
      label: "SYN-ACK",
      sentAt: latency,
      deliverAt: latency * 2,
    },
    "Responder replies with SYN-ACK.",
  );
  events.push({
    type: "distributedDeliver",
    messageId: "synAck",
    from: responder,
    to: initiator,
    label: "SYN-ACK",
    message: "Initiator receives SYN-ACK and confirms the responder is ready.",
  });
  pushDistributedState(events, states, initiator, "established", "Initiator marks the session established.");

  pushDistributedMessage(
    events,
    messages,
    {
      id: "ack",
      from: initiator,
      to: responder,
      label: "ACK",
      sentAt: latency * 2,
      deliverAt: latency * 3,
    },
    "Initiator sends the final ACK.",
  );
  events.push({
    type: "distributedDeliver",
    messageId: "ack",
    from: initiator,
    to: responder,
    label: "ACK",
    message: "Responder receives ACK and completes the handshake.",
  });
  pushDistributedState(events, states, responder, "established", "Responder marks the session established.");

  const initialStates = input.peers.map<DistributedPeerState>((peer) => ({ peer: peer.id, state: "idle" }));
  return {
    algorithm: "handshake",
    initialState: {
      type: "distributed",
      peers: input.peers,
      states: initialStates,
      messages: [],
    },
    finalState: {
      type: "distributed",
      peers: input.peers,
      states,
      messages,
    },
    events,
    metadata: {
      algorithmName: "Handshake Protocol",
      category: "Distributed",
      inputSize: input.peers.length,
      eventCount: events.length,
      resultSummary: `${initiator} and ${responder} established a session in three messages.`,
    },
  };
}

function traceTimeSync(input: DistributedInput): Trace {
  validateTimeSyncInput(input);

  const coordinator = timeSyncCoordinator(input);
  const latency = Math.max(40, input.latencyMs ?? 120);
  const events: TraceEvent[] = [];
  const messages: DistributedMessage[] = [];
  const offsets = new Map((input.clockOffsets ?? []).map((offset) => [offset.peer, offset.offsetMs]));
  const states = input.peers.map<DistributedPeerState>((peer) => ({
    peer: peer.id,
    state: offsetState(offsets.get(peer.id) ?? 0),
  }));
  let tick = 0;

  pushDistributedState(
    events,
    states,
    coordinator,
    "coordinator",
    "Coordinator starts a round of clock synchronization.",
  );

  for (const peer of input.peers.filter((candidate) => candidate.id !== coordinator)) {
    const offset = offsets.get(peer.id) ?? 0;
    const probeId = `probe-${peer.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: probeId,
        from: coordinator,
        to: peer.id,
        label: "TIME?",
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `Coordinator requests a time sample from ${peer.label}.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId: probeId,
      from: coordinator,
      to: peer.id,
      label: "TIME?",
      message: `${peer.label} receives the time sample request.`,
    });
    pushDistributedState(events, states, peer.id, offsetState(offset), `${peer.label} reports local clock offset ${offset} ms.`);

    tick += latency;
    const reportId = `offset-${peer.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: reportId,
        from: peer.id,
        to: coordinator,
        label: signedMs(offset),
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `${peer.label} reports offset ${signedMs(offset)}.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId: reportId,
      from: peer.id,
      to: coordinator,
      label: signedMs(offset),
      message: `Coordinator receives ${peer.label}'s clock offset.`,
    });

    tick += latency;
    const adjustment = -offset;
    const adjustId = `adjust-${peer.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: adjustId,
        from: coordinator,
        to: peer.id,
        label: signedMs(adjustment),
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `Coordinator sends adjustment ${signedMs(adjustment)} to ${peer.label}.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId: adjustId,
      from: coordinator,
      to: peer.id,
      label: signedMs(adjustment),
      message: `${peer.label} receives the adjustment.`,
    });
    pushDistributedState(
      events,
      states,
      peer.id,
      "synced +0ms",
      `${peer.label} applies the adjustment and converges to coordinator time.`,
    );
    tick += latency;
  }

  pushDistributedState(events, states, coordinator, "synced +0ms", "Coordinator closes the synchronization round.");

  const initialStates = input.peers.map<DistributedPeerState>((peer) => ({
    peer: peer.id,
    state: offsetState(offsets.get(peer.id) ?? 0),
  }));
  return {
    algorithm: "timeSync",
    initialState: {
      type: "distributed",
      peers: input.peers,
      states: initialStates,
      messages: [],
    },
    finalState: {
      type: "distributed",
      peers: input.peers,
      states,
      messages,
    },
    events,
    metadata: {
      algorithmName: "Time Synchronization",
      category: "Distributed",
      inputSize: input.peers.length,
      eventCount: events.length,
      resultSummary: `Synchronized ${input.peers.length} peers to coordinator ${coordinator}.`,
    },
  };
}

function tracePaxos(input: DistributedInput): Trace {
  validatePaxosInput(input);

  const proposer = paxosRolePeers(input, "proposer")[0];
  const acceptors = paxosRolePeers(input, "acceptor");
  const learner = paxosRolePeers(input, "learner")[0];
  const proposal = input.proposalValue ?? "";
  const quorum = Math.floor(acceptors.length / 2) + 1;
  const latency = Math.max(40, input.latencyMs ?? 120);
  const events: TraceEvent[] = [];
  const messages: DistributedMessage[] = [];
  const states = input.peers.map<DistributedPeerState>((peer) => ({
    peer: peer.id,
    state: typeof peer.role === "string" && peer.role.trim() !== "" ? peer.role : "idle",
  }));
  let tick = 0;

  pushDistributedState(events, states, proposer.id, "prepare n=1", `${proposer.label} starts Paxos round n=1.`);

  for (const acceptor of acceptors) {
    const messageId = `prepare-${acceptor.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: messageId,
        from: proposer.id,
        to: acceptor.id,
        label: "PREPARE n=1",
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `${proposer.label} sends prepare n=1 to ${acceptor.label}.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId,
      from: proposer.id,
      to: acceptor.id,
      label: "PREPARE n=1",
      message: `${acceptor.label} receives prepare n=1.`,
    });
    pushDistributedState(events, states, acceptor.id, "promised n=1", `${acceptor.label} promises proposal number 1.`);
  }

  tick += latency;
  for (const acceptor of acceptors) {
    const messageId = `promise-${acceptor.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: messageId,
        from: acceptor.id,
        to: proposer.id,
        label: "PROMISE",
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `${acceptor.label} replies with a promise.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId,
      from: acceptor.id,
      to: proposer.id,
      label: "PROMISE",
      message: `${proposer.label} receives ${acceptor.label}'s promise.`,
    });
  }

  tick += latency;
  pushDistributedState(
    events,
    states,
    proposer.id,
    "quorum promised",
    `${proposer.label} observes ${quorum} promises and moves to accept.`,
  );

  for (const acceptor of acceptors) {
    const messageId = `accept-${acceptor.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: messageId,
        from: proposer.id,
        to: acceptor.id,
        label: `ACCEPT ${proposal}`,
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `${proposer.label} asks ${acceptor.label} to accept ${proposal}.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId,
      from: proposer.id,
      to: acceptor.id,
      label: `ACCEPT ${proposal}`,
      message: `${acceptor.label} receives accept for ${proposal}.`,
    });
    pushDistributedState(events, states, acceptor.id, `accepted ${proposal}`, `${acceptor.label} accepts ${proposal}.`);
  }

  tick += latency;
  for (const acceptor of acceptors) {
    const messageId = `accepted-${acceptor.id}`;
    pushDistributedMessage(
      events,
      messages,
      {
        id: messageId,
        from: acceptor.id,
        to: learner.id,
        label: "ACCEPTED",
        sentAt: tick,
        deliverAt: tick + latency,
      },
      `${acceptor.label} tells ${learner.label} the value was accepted.`,
    );
    events.push({
      type: "distributedDeliver",
      messageId,
      from: acceptor.id,
      to: learner.id,
      label: "ACCEPTED",
      message: `${learner.label} receives accepted from ${acceptor.label}.`,
    });
  }

  tick += latency;
  pushDistributedState(
    events,
    states,
    learner.id,
    `chosen ${proposal}`,
    `${learner.label} observes a quorum and chooses ${proposal}.`,
  );
  pushDistributedState(
    events,
    states,
    proposer.id,
    `chosen ${proposal}`,
    `${proposer.label} learns ${proposal} was chosen.`,
  );

  const initialStates = input.peers.map<DistributedPeerState>((peer) => ({
    peer: peer.id,
    state: typeof peer.role === "string" && peer.role.trim() !== "" ? peer.role : "idle",
  }));
  return {
    algorithm: "paxos",
    initialState: {
      type: "distributed",
      peers: input.peers,
      states: initialStates,
      messages: [],
    },
    finalState: {
      type: "distributed",
      peers: input.peers,
      states,
      messages,
    },
    events,
    metadata: {
      algorithmName: "Paxos",
      category: "Distributed",
      inputSize: input.peers.length,
      eventCount: events.length,
      resultSummary: `Chosen value ${proposal} with quorum ${quorum}/${acceptors.length}.`,
    },
  };
}

function pushDistributedState(
  events: TraceEvent[],
  states: DistributedPeerState[],
  peer: string,
  state: string,
  message: string,
) {
  const item = states.find((candidate) => candidate.peer === peer);
  if (item) item.state = state;
  events.push({
    type: "distributedState",
    peer,
    state,
    message,
  });
}

function pushDistributedMessage(
  events: TraceEvent[],
  messages: DistributedMessage[],
  distributedMessage: DistributedMessage,
  message: string,
) {
  events.push({
    type: "distributedSend",
    messageId: distributedMessage.id,
    from: distributedMessage.from,
    to: distributedMessage.to,
    label: distributedMessage.label,
    sentAt: distributedMessage.sentAt,
    deliverAt: distributedMessage.deliverAt,
    message,
  });
  messages.push(distributedMessage);
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

function validateTopologicalGraph(input: GraphInput) {
  if (input.edges.length === 0) {
    throw new Error("Topological Sort requires at least one directed edge.");
  }
  const undirectedEdge = input.edges.find((edge) => !edge.directed);
  if (undirectedEdge) {
    throw new Error(`Topological Sort requires directed edges; edge '${undirectedEdge.id}' is undirected.`);
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

function validateBoyerMooreSequence(input: SequenceInput) {
  const textLength = Array.from(input.text).length;
  const patternLength = Array.from(input.pattern).length;

  if (textLength === 0) {
    throw new Error("Boyer-Moore text cannot be empty.");
  }
  if (patternLength === 0) {
    throw new Error("Boyer-Moore pattern cannot be empty.");
  }
  if (patternLength > textLength) {
    throw new Error("Boyer-Moore pattern cannot be longer than the text.");
  }
  if (textLength > 160) {
    throw new Error("Boyer-Moore text is capped at 160 characters for interactive playback.");
  }
  if (patternLength > 48) {
    throw new Error("Boyer-Moore pattern is capped at 48 characters for interactive playback.");
  }
}

function validatePrefixTrie(input: SequenceInput) {
  const words = input.words ?? [];

  if (words.length === 0) {
    throw new Error("Prefix Tree words cannot be empty.");
  }
  if (words.length > 24) {
    throw new Error("Prefix Tree is capped at 24 words for interactive playback.");
  }

  for (const [index, word] of words.entries()) {
    if (word.trim() === "") {
      throw new Error(`Prefix Tree word at index ${index} cannot be empty.`);
    }
    if (Array.from(word).length > 18) {
      throw new Error(`Prefix Tree word at index ${index} is capped at 18 characters.`);
    }
  }
}

function validateDistributedInput(input: DistributedInput) {
  const initiator = input.initiator ?? "";
  const responder = input.responder ?? "";
  if (input.peers.length < 2) {
    throw new Error("Handshake Protocol needs at least two peers.");
  }
  if (input.peers.length > 8) {
    throw new Error("Handshake Protocol is capped at 8 peers for interactive playback.");
  }

  const peerIds = new Set<string>();
  for (const peer of input.peers) {
    if (peer.id.trim() === "") {
      throw new Error("Peer ids cannot be empty.");
    }
    if (peer.label.trim() === "") {
      throw new Error(`Peer '${peer.id}' needs a non-empty label.`);
    }
    if (peerIds.has(peer.id)) {
      throw new Error(`Duplicate peer id '${peer.id}'.`);
    }
    peerIds.add(peer.id);
  }
  if (!peerIds.has(initiator)) {
    throw new Error(`Initiator peer '${initiator}' does not exist.`);
  }
  if (!peerIds.has(responder)) {
    throw new Error(`Responder peer '${responder}' does not exist.`);
  }
  if (initiator === responder) {
    throw new Error("Initiator and responder must be different peers.");
  }
}

function validateTimeSyncInput(input: DistributedInput) {
  validateDistributedPeers(input, "Time Synchronization");
  const peerIds = new Set(input.peers.map((peer) => peer.id));
  const coordinator = timeSyncCoordinator(input);
  if (!peerIds.has(coordinator)) {
    throw new Error(`Coordinator peer '${coordinator}' does not exist.`);
  }

  const offsets = input.clockOffsets ?? [];
  if (offsets.length === 0) {
    throw new Error("Time Synchronization needs clockOffsets for the peers.");
  }
  const seen = new Set<string>();
  for (const offset of offsets) {
    if (!peerIds.has(offset.peer)) {
      throw new Error(`Clock offset references unknown peer '${offset.peer}'.`);
    }
    if (seen.has(offset.peer)) {
      throw new Error(`Duplicate clock offset for peer '${offset.peer}'.`);
    }
    seen.add(offset.peer);
  }
}

function validatePaxosInput(input: DistributedInput) {
  validateDistributedPeers(input, "Paxos");
  const proposers = paxosRolePeers(input, "proposer");
  const acceptors = paxosRolePeers(input, "acceptor");
  const learners = paxosRolePeers(input, "learner");

  if (proposers.length !== 1) {
    throw new Error("Paxos needs exactly one proposer peer.");
  }
  if (acceptors.length < 3) {
    throw new Error("Paxos needs at least three acceptor peers.");
  }
  if (learners.length < 1) {
    throw new Error("Paxos needs at least one learner peer.");
  }
  if (!input.proposalValue || input.proposalValue.trim() === "") {
    throw new Error("Paxos needs a non-empty proposalValue.");
  }
}

function validateDistributedPeers(input: DistributedInput, label: string) {
  if (input.peers.length < 2) {
    throw new Error(`${label} needs at least two peers.`);
  }
  if (input.peers.length > 8) {
    throw new Error(`${label} is capped at 8 peers for interactive playback.`);
  }
  const peerIds = new Set<string>();
  for (const peer of input.peers) {
    if (peer.id.trim() === "") {
      throw new Error("Peer ids cannot be empty.");
    }
    if (peer.label.trim() === "") {
      throw new Error(`Peer '${peer.id}' needs a non-empty label.`);
    }
    if (peerIds.has(peer.id)) {
      throw new Error(`Duplicate peer id '${peer.id}'.`);
    }
    peerIds.add(peer.id);
  }
}

function timeSyncCoordinator(input: DistributedInput) {
  return input.coordinator?.trim() ? input.coordinator : input.peers[0].id;
}

function paxosRolePeers(input: DistributedInput, role: string) {
  return input.peers.filter((peer) => peer.role === role);
}

function offsetState(offset: number) {
  return offset === 0 ? "synced +0ms" : `offset ${signedMs(offset)}`;
}

function signedMs(value: number) {
  return `${value >= 0 ? "+" : ""}${value}ms`;
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

function isPowerOfTwo(value: number) {
  return value === 0 || (value > 0 && (value & (value - 1)) === 0);
}
