export class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next ?? null;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAtIndex: (element: T, index: number) => void;
  removeAtIndex: (index: number) => void;
  removeHead: () => void;
  removeTail: () => void;
  toArray: () => T[];
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private _head: Node<T> | null = null;
  private _size: number = 0;

  insertAtIndex(element: T, index: number): void {
    if (index < 0 || index > this._size) {
      throw new Error("Enter a valid index");
    }

    const newNode = new Node(element);

    if (index === 0) {
      newNode.next = this._head;
      this._head = newNode;
    } else {
      let current = this._head;
      let previous: Node<T> | null = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        previous = current;
        current = current?.next ?? null;
        currentIndex++;
      }

      newNode.next = current;
      if (previous) {
        previous.next = newNode;
      }
    }

    this._size++;
  }

  removeAtIndex(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new Error("Enter a valid index");
    }

    let current = this._head;
    let previous: Node<T> | null = null;
    let currentIndex = 0;

    if (index === 0) {
      this._head = current?.next ?? null;
    } else {
      while (currentIndex < index) {
        previous = current;
        current = current?.next ?? null;
        currentIndex++;
      }

      if (previous && current) {
        previous.next = current.next;
      }
    }

    this._size--;
  }

  append(element: T): void {
    const node = new Node(element);
    let current = this._head;

    if (this._head === null) {
      this._head = node;
    } else {
      while (current?.next) {
        current = current.next;
      }
      current!.next = node;
    }
    this._size++;
  }

  prepend(element: T): void {
    const newNode = new Node(element);
    newNode.next = this._head;
    this._head = newNode;
    this._size++;
  }

  removeHead(): void {
    if (!this._head) return;
    this._head = this._head.next;
    this._size--;
  }

  removeTail(): void {
    if (!this._head) return;
    if (!this._head.next) {
      this._head = null;
    } else {
      let current = this._head;
      let previous: Node<T> | null = null;

      while (current?.next) {
        previous = current;
        current = current.next;
      }
      previous!.next = null;
    }
    this._size--;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this._head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  getSize(): number {
    return this._size;
  }

  print(): void {
    let curr = this._head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
