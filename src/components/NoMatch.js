import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function NoMatch(){
    return (
      <Container fluid>
        <Row>
          <Col sm={2} className='notes'>
          </Col>
          <Col sm={8} className="content">
            <center><h1>Tech Should Know</h1>
            <h2>social science for software people</h2>
            <br />
            <br />
            <p>404 - Nothing is here :(</p>
            </center>
            </Col>
          <Col sm={2} className='notes'>
          </Col>
        </Row>
      </Container>
    )
  }
  