import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
const NoMatch: FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="notes"></Col>
        <Col sm={8} className="content">
          <center>
            <h1>Tech Should Know</h1>
            <h2>social science for software people</h2>
            <br />
            <br />
            <p>404 - Nothing is here :(</p>
          </center>
        </Col>
        <Col sm={2} className="notes"></Col>
      </Row>
    </Container>
  );
};

export default NoMatch;
