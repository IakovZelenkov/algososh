import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button";

describe("Компонент Button", () => {
  const buttonText = "Button Text";

  it("корректно отображается с текстом", () => {
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается в заблокированном состоянии", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно работает c вызовом колбека при клике", () => {
    const onButtonClick = jest.fn();
    render(<Button text={buttonText} onClick={onButtonClick} />);
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
