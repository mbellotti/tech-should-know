import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../constants";
import ArticleList from "../ArticleList";
import { Article, Tag } from "./Submit/Form/store/types";
import useApi from "../../hooks/useApi";
const TagPage: FC = () => {
  const url = API + "index.json";
  const { tag } = useParams();
  const [masterlist, setMasterlist] = useState({
    articles: [] as Article[],
  });

  const data = useApi<{ articles: Article[]; tags: Tag[] }>("index.json");

  useEffect(() => {
    if (data) {
      let articles: Article[] = [];
      for (var i = 0; i < data.tags.length; i++) {
        if (data.tags[i].text === tag) {
          articles = data.tags[i].items;
          break;
        }
      }
      setMasterlist({ articles: articles });
    }
  }, [data]);

  if (!data) {
    return <></>;
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="notes"></Col>
        <Col sm={8} className="content">
          <center>
            <h1>Tech Should Know</h1>
            <h2>social science for software people</h2>
          </center>
          <h3 className="mt-5">Tag: {tag}</h3>
          <ArticleList articles={masterlist.articles} />
        </Col>
        <Col sm={2} className="notes"></Col>
      </Row>
    </Container>
  );
};

export default TagPage;
