import renderer from "react-test-renderer";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Компонент Circle", () => {
  it("корректно отображается без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с буквами", () => {
    const tree = renderer.create(<Circle letter={"test"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с head", () => {
    const tree = renderer.create(<Circle head={"test"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<div>test</div>} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с tail", () => {
    const tree = renderer.create(<Circle tail={"test"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<div>test</div>} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с index", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается с пропом isSmall ===  true", () => {
    const tree = renderer.create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается в состоянии default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается в состоянии changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректно отображается в состоянии modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
