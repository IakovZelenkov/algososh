export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  isEmpty: () => boolean;
  isFull: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private _container: (T | null)[] = [];
  private _head = 0;
  private _tail = 0;
  private readonly _size: number;
  private _length: number = 0;

  constructor(size: number) {
    this._size = size;
    this._container = new Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.isFull()) {
      throw new Error("Maximum length exceeded");
    }

    if (!this.isEmpty()) {
      this._tail++;
    }

    this._container[this._tail] = item;
    this._length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this._container[this._head] = null;
    this._length--;

    if (this._head !== this._size - 1) {
      if (this._head !== this._tail) {
        this._head++;
      }
    } else {
      this._tail++;
    }
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this._container[this._head];
  };

  toArray = () => {
    return this._container;
  };

  clear = () => {
    this._container.fill(null);
    this._head = 0;
    this._tail = 0;
    this._length = 0;
  };

  getHead = () => {
    return this._head;
  };

  getTail = () => {
    return this._tail;
  };

  isEmpty = () => {
    return this._length === 0;
  };

  isFull = () => {
    return this._tail >= this._size - 1;
  };
}
