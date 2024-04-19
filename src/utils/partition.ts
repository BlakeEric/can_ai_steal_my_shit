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

const users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true },
];

partition(users, (o) => o.active);
