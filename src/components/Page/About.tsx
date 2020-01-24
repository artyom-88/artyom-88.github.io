/**
 * About page
 */
import React from "react";
import bio from "../../resources/bio.json";
import "./About.scss";
import Container from "./Container";

const items = bio.data.map((value: string, key: number) => (
  <div key={key} className="page-bio__item">
    {value}
  </div>
));

export default () => <Container title="Artyom Ganev" content={items} />;
