interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peek: () => T | null;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    if (this.container.length === 0) return null;
    return this.container.pop();
  };

  peek = (): T | null => {
    if (this.container.length === 0) return null;
    return this.container[this.container.length - 1];
  };

  clear = () => {
    this.container = [];
  };

  toArray = (): T[] => {
    return [...this.container];
  };
}
