import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ArticleStore } from "../Submit/Form/store/types";
import Authors from "./components/Authors";
import ExtraTags from "./components/ExtraTags";
import Extras from "./components/Extras";
import { Interweave } from "interweave";
import Annotation from "./components/Annotation";
import useApi from "../../../hooks/useApi";

const Content: FC = () => {
  const { uuid } = useParams();
  const [article, setArticle] = useState<ArticleStore | null>(null);

  const data = useApi<ArticleStore>("articles/" + uuid + ".json");

  useEffect(() => {
    if (data) {
      setArticle(data);
    }
  }, [data]);

  if (!article) {
    return <></>;
  }

  const notes = article.notes.map((d) => (
    <Annotation idx={d.id} text={d.text} key={d.id} />
  ));

  const left = notes.filter((_, idx) => idx % 2 === 0);
  const right = notes.filter((_, idx) => idx % 2 === 1);

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="notes">
          {left}
        </Col>
        <Col sm={6}>
          <center>
            <h1>{article.title}</h1>
            <Authors authors={article.authors} />
          </center>
          <Container fluid>
            <Row>
              <Col sm={10} className="abst offset-sm-1">
                <Interweave content={article.abstract} />
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Interweave content={article.content} />
          </Container>
          <div className="my-3 px-5" id="submissionBy">
            <em>
              annotated by
              <a href={article.submissionBy.link}>
                {article.submissionBy.name}
              </a>
            </em>
          </div>
          <Extras references={article.references || []} works={article.works} />
          <ExtraTags tags={article.tags} />
        </Col>
        <Col sm={3} className="notes">
          {right}
        </Col>
      </Row>
    </Container>
  );
};
export default Content;
