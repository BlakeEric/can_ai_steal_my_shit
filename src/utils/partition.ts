type FilterFunction<T> = (val: T) => boolean;
type PartitionedArray<T> = [Array<T>, Array<T>];

export const partition = <TItem>(
  arr: Array<TItem>,
  filterFunction: FilterFunction<TItem>
) =>
  arr.reduce(
    (acc: PartitionedArray<TItem>, currentValue: TItem) => {
      const resultIndex = filterFunction(currentValue) ? 0 : 1;

      acc[resultIndex].push(currentValue);
      return acc;
    },
    [[], []]
  );
