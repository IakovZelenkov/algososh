interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peek: () => T | null;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private _container: T[] = [];

  push = (item: T) => {
    this._container.push(item);
  };

  pop = () => {
    if (this._container.length === 0) return null;
    return this._container.pop();
  };

  peek = (): T | null => {
    if (this._container.length === 0) return null;
    return this._container[this._container.length - 1];
  };

  clear = () => {
    this._container = [];
  };

  toArray = (): T[] => {
    return [...this._container];
  };
}
