import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="mt-5 p-5 border border-warming rounded">
      <Row className="justify-content-md-center">{children}</Row>
    </Container>
  );
};

export default FormContainer;
