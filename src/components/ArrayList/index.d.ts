/* eslint-disable no-unused-vars */
export interface IArrayList {
  insert: Function;
  remove: Function;
  push: Function;
  pop: Function;
  update: Function;
  swap: Function;
  bubbleSort: Function;
  insertionSort: Function;
  selectionSort: Function;
  quickSort: Function;
  mergeSort: Function;
  radixSort: Function;
}

export enum SortStatusEnum {
  DOING = 1,
  DONE = 2,
}
