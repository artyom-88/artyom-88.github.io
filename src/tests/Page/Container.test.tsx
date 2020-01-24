import React from "react";
import renderer from "react-test-renderer";
import Container from "../../components/Page/Container";

test("Container", () => {
  const title = "title 1";
  const content = <div>text1</div>;
  const component = renderer.create(
    <Container title={title} content={content} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Container", () => {
  const content = <div>text1</div>;
  const component = renderer.create(<Container content={content} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
