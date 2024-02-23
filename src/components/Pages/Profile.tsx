import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../constants";
import ArticleList from "../ArticleList";
import { Article, Tag } from "./Submit/Form/store/types";
import useApi from "../../hooks/useApi";
const Profile: FC = () => {
  const { name } = useParams();
  const [masterlist, setMasterlist] = useState({
    articles: [] as Article[],
  });

  const matchName = function (authors: string[]) {
    if (authors === undefined || !name) {
      return false;
    }

    for (var i = 0; i < authors.length; i++) {
      let a = authors[i].toLowerCase();
      if (a.includes(name)) {
        return true;
      }
    }
    return false;
  };

  const data = useApi<{ articles: Article[]; tags: Tag[] }>("index.json");

  useEffect(() => {
    if (data) {
      const articles = data.articles.filter((t) => matchName(t.authors));
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
          <h3 className="mt-5">Researcher: {name}</h3>
          <ArticleList articles={masterlist.articles} />
        </Col>
        <Col sm={2} className="notes"></Col>
      </Row>
    </Container>
  );
};

export default Profile;
