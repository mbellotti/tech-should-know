import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { Article, Tag } from "./Submit/Form/store/types";
const Home: FC = () => {
  const navigate = useNavigate();
  const data = useApi<{ articles: Article[]; tags: Tag[] }>("index.json");

  useEffect(() => {
    if (data) {
      const article =
        data.articles[Math.floor(Math.random() * data.articles.length)];
      const uri = "items/" + article.uri;

      navigate(uri);
    }
  }, [data]);

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="notes"></Col>
        <Col sm={6} className="content">
          <center>
            <h1>Tech Should Know</h1>
            <h2>social science for software people</h2>
          </center>
        </Col>
        <Col sm={3} className="notes"></Col>
      </Row>
    </Container>
  );
};

export default Home;
