import {useState} from 'react';
import {useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Home(){
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API + "index.json";
    const [request, setRequest] = useState(true);
  
    const getData = async() => {
      const api_call = await fetch(url);
      const data = await api_call.json();
      const a = data.articles[Math.floor(Math.random() * data.articles.length)];
  
      setRequest(false)
      const uri = "items/"+a.uri
      navigate(uri);
    }
    
    if (request) {
      getData();
    }
  
    return (
      <Container fluid>
        <Row>
          <Col sm={3} className='notes'>
          </Col>
          <Col sm={6} className="content">
            <center><h1>Tech Should Know</h1>
            <h2>social science for software people</h2></center>
           
          </Col>
          <Col sm={3} className='notes'>
          </Col>
        </Row>
      </Container>
    )
    
  }