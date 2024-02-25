import Card from 'react-bootstrap/Card';
import Notes from './Notes.js';
import { Interweave } from 'interweave';

export function Annotation({idx, item}) {
  
    return(
      <Notes
        top={"#inline-"+idx}
        bottomBoundary={"#release-"+idx}
      >
      <Card id={'note-'+idx}
            key={"note-"+idx}
            text='light'
            className="mb-2 card-bg"
          >
            <Card.Body>
              <Card.Text>
              <Interweave content={item.text} />
              </Card.Text>
            </Card.Body>
          </Card>
          </Notes>
    )
  }