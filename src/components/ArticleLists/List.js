import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {ArticleList} from './components/ArticleList.js'
import {Profiles} from './components/Profiles.js'
import {TagCloud} from './components/TagCloud.js'


export function List(){
    const url = process.env.REACT_APP_API + "index.json";
    const [masterlist, setMasterlist] = useState({"articles":[], "tags":[]});
    const [request, setRequest] = useState(true);
  
    const getData = async() => {
      const api_call = await fetch(url);
      const data = await api_call.json();
      setMasterlist(data)
      setRequest(false)
    }
    
    if (request) {
      getData();
    }
  
     return (
      <Container fluid>
        <Row>
          <Col sm={2} className='notes'>
          </Col>
          <Col sm={8} className="content">
            <center><h1>Tech Should Know</h1>
            <h2>social science for software people</h2></center>
            <h3 className="mt-5">By Tag</h3>
            <TagCloud data={masterlist.tags} />
            <h3 className="mt-5">Featured Researchers</h3>
            <Profiles />
            <h3 className="mt-5">The Master List</h3>
            <ArticleList articles={masterlist.articles} />
            </Col>
          <Col sm={2} className='notes'>
          </Col>
        </Row>
      </Container>
    )
  }