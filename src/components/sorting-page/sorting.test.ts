import { bubbleSort, selectionSort } from "./sortingUtlis";

describe("bubbleSort", () => {
  it("корректно сортирует пустой массив (asc)", async () => {
    const initialArr: number[] = [];
    await bubbleSort(initialArr, "Ascending");
    expect(initialArr).toEqual([]);
  });

  it("корректно сортирует пустой массив (desc)", async () => {
    const initialArr: number[] = [];
    await bubbleSort(initialArr, "Descending");
    expect(initialArr).toEqual([]);
  });

  it("корректно сортирует массив из одного элемента (asc)", async () => {
    const initialArr: number[] = [5];
    await bubbleSort(initialArr, "Ascending");
    expect(initialArr).toEqual([5]);
  });

  it("корректно сортирует массив из одного элемента (desc)", async () => {
    const initialArr: number[] = [5];
    await bubbleSort(initialArr, "Descending");
    expect(initialArr).toEqual([5]);
  });

  it("корректно сортирует массив из нескольких элементов (asc)", async () => {
    const initialArr: number[] = [2, 5, 3, 4, 1];
    await bubbleSort(initialArr, "Ascending");
    expect(initialArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("корректно сортирует массив из нескольких элементов (desc)", async () => {
    const initialArr: number[] = [2, 5, 3, 4, 1];
    await bubbleSort(initialArr, "Descending");
    expect(initialArr).toEqual([5, 4, 3, 2, 1]);
  });
});

describe("selectionSort", () => {
  it("корректно сортирует пустой массив (asc)", async () => {
    const initialArr: number[] = [];
    await selectionSort(initialArr, "Ascending");
    expect(initialArr).toEqual([]);
  });

  it("корректно сортирует пустой массив (desc)", async () => {
    const initialArr: number[] = [];
    await selectionSort(initialArr, "Descending");
    expect(initialArr).toEqual([]);
  });

  it("корректно сортирует массив из одного элемента (asc)", async () => {
    const initialArr: number[] = [5];
    await selectionSort(initialArr, "Ascending");
    expect(initialArr).toEqual([5]);
  });

  it("корректно сортирует массив из одного элемента (desc)", async () => {
    const initialArr: number[] = [5];
    await selectionSort(initialArr, "Descending");
    expect(initialArr).toEqual([5]);
  });

  it("корректно сортирует массив из нескольких элементов (asc)", async () => {
    const initialArr: number[] = [2, 5, 3, 4, 1];
    await selectionSort(initialArr, "Ascending");
    expect(initialArr).toEqual([1, 2, 3, 4, 5]);
  });

  it("корректно сортирует массив из нескольких элементов (desc)", async () => {
    const initialArr: number[] = [2, 5, 3, 4, 1];
    await selectionSort(initialArr, "Descending");
    expect(initialArr).toEqual([5, 4, 3, 2, 1]);
  });
});
