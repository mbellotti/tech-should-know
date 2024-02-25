import {useState} from 'react';
import {useParams} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Annotation} from './components/Annotation.js'
import {Authors} from './components/Authors.js'
import {Abstract} from './components/Abstract.js'
import {Article} from './components/Article.js'
import {Extras} from './components/Extras.js'
import {ArticleTags} from './components/Tags.js'

export function Content(){
    const { uuid } = useParams();
    const url = process.env.REACT_APP_API + "articles/" +uuid + ".json";
    const [article, setArticle] = useState({"notes":[], "authors":[], "references":[], "works":[], "tags":[], "submissionBy":{"name":"", "link":""}});
    const [request, setRequest] = useState(true);
  
    const getData = async() => {
      const api_call = await fetch(url);
      const data = await api_call.json();
      setArticle(data)
      setRequest(false)
    }
    
    if (request) {
      getData();
    }
  
    const notes = article.notes.map((d) =>
        <Annotation idx={d.id} item={d}/>
      )
    const left = notes.filter((_, idx) => idx % 2 === 0)
    const right = notes.filter((_, idx) => idx % 2 === 1)
  
    return(
      <Container fluid>
        <Row>
          <Col sm={3} className='notes'>
            {left}
          </Col>
          <Col sm={6}>
            <center><h1>{article.title}</h1>
            <Authors authors={article.authors} />
            </center>
            <Abstract text={article.abstract} />
            <Article text={article.content}></Article>
            <div className="my-3 px-5" id="submissionBy">
              <em>annotated by <a href={article.submissionBy.link}>{article.submissionBy.name}</a></em>
            </div>
            <Extras references={article.references || []} works={article.works} />
            <ArticleTags tags={article.tags} />
          </Col>
          <Col sm={3} className='notes'>
            {right}
          </Col>
        </Row>
      </Container>
    );
  }