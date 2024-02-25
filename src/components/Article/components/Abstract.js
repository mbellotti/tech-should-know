import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Interweave } from 'interweave';

export function Abstract({text}){
    return (
      <Container fluid>
        <Row>
            <Col sm={10} className='abst offset-sm-1'>
              <Interweave content={text} />
            </Col>
        </Row>
      </Container>
    )
  }