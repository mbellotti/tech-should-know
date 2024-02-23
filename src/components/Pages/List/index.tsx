import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TagCloud from "./components/TagCloud";
import Profiles from "./components/Profiles";
import ArticleList from "../../ArticleList";
import useApi from "../../../hooks/useApi";
import { Article, Tag } from "../Submit/Form/store/types";
const Home: FC = () => {
  const [masterlist, setMasterlist] = useState<{
    articles: Article[];
    tags: Tag[];
  }>();

  const data = useApi<{
    articles: Article[];
    tags: Tag[];
  }>("index.json");

  useEffect(() => {
    if (data) {
      setMasterlist(data);
    }
  }, [data]);

  if (!masterlist) {
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
          <h3 className="mt-5">By Tag</h3>
          <TagCloud data={masterlist.tags} />
          <h3 className="mt-5">Featured Researchers</h3>
          <Profiles />
          <h3 className="mt-5">The Master List</h3>
          <ArticleList articles={masterlist.articles} />
        </Col>
        <Col sm={2} className="notes"></Col>
      </Row>
    </Container>
  );
};

export default Home;
