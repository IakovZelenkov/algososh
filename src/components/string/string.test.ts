import { reverseString } from "./stringUtils";

describe("Алгоритм разворота строки", () => {
  it("корректно разворачивает строку с чётным количеством символов", async () => {
    const initialString = ["a", "b"];
    await reverseString(initialString);
    expect(initialString).toEqual(["b", "a"]);
  });

  it("корректно разворачивает строку с нечётным количеством символов", async () => {
    const initialString = ["a", "b", "c"];
    await reverseString(initialString);
    expect(initialString).toEqual(["c", "b", "a"]);
  });

  it("корректно разворачивает строку с одним символом", async () => {
    const initialString = ["a"];
    await reverseString(initialString);
    expect(initialString).toEqual(["a"]);
  });

  it("корректно разворачивает пустую строку", async () => {
    const initialString: string[] = [];
    await reverseString(initialString);
    expect(initialString).toEqual([]);
  });
});
