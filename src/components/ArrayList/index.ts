export class ArrayList<T> {
	cursors: Array<T>;
	actives: Array<T>;
	sorted: Array<T>;

	constructor(cursors: Array<T>,actives: Array<T>,sorted: Array<T>) {
		this.cursors = cursors;
		this.actives = actives;
		this.sorted = sorted;
	}

	insert() {};
	remove() {};
	push() {};
	pop() {};
	update() {};
	swap() {};
	bubbleSort() {};
	insertionSort() {};
	selectionSort() {};
	quickSort() {};
	mergeSort() {};
}