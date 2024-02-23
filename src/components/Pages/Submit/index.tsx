import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useArticleStore } from "./Form/store";
import Copy from "./Copy";
import DisplayArticleMarkup from "./DisplayArticleMarkup";
import Form from "./Form";

const Submit: FC = () => {
  const [article, clear, upsert] = useArticleStore();
  return (
    <Container fluid>
      <Row>
        <Col sm={8} className="offset-md-2 content">
          <center>
            <h1>Tech Should Know</h1>
            <h2>social science for software people</h2>
          </center>
          <p>
            Use this editor to generate the markup correctly then open a PR to{" "}
            <a href="https://github.com/mbellotti/tech-should-know-data">
              this repo
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={7} className="mr-2 content">
          <Form store={article} upsert={upsert} />
        </Col>
        <Col sm={5} className="markup">
          <div className="copyBlock">
            <Copy className={"copy"} store={article} />
          </div>
          <DisplayArticleMarkup store={article} />
          <div className="clearBlock">
            <button
              className="btn"
              onClick={() => {
                clear();
              }}
            >
              Clear Markup
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Submit;
