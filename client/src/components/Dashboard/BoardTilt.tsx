import React from "react";
import "./dashboard.css";
import { Container, Content, Header } from "rsuite";

interface IProps {
  title: string;
  logo: React.ReactNode;
}

export default function BoardTilt({ title, logo }: IProps) {
  return (
    <Container className="board__tilt">
      <Header>{title}</Header>
      <Content>{logo}</Content>
    </Container>
  );
}
