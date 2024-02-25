import {useState} from 'react';
import {useParams} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {ArticleList} from './components/ArticleList.js'


export function ByProfile(){
    const url = process.env.REACT_APP_API + "index.json";
    const { name } = useParams();
    const [masterlist, setMasterlist] = useState({"articles":[]});
    const [request, setRequest] = useState(true);
  
    const matchName = function(authors){
      if(authors === undefined){
        return false
      }
  
      for(var i=0; i < authors.length; i++){
        let a = authors[i].toLowerCase()
        if (a.includes(name)){
            return true
        }
      }
      return false
    }
  
    const getData = async() => {
      const api_call = await fetch(url);
      const data = await api_call.json();
      const articles = data.articles.filter(t => matchName(t.authors))
      setMasterlist({"articles":articles})
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
            <h3 className="mt-5">Researcher: {name}</h3>
            <ArticleList articles={masterlist.articles} />
            </Col>
          <Col sm={2} className='notes'>
          </Col>
        </Row>
      </Container>
    )
  }