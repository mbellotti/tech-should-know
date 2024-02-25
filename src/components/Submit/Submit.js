import {useState, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CopyIcon } from '../Icons.js';

import { Submission } from './components/Form.js';
import { EditorModal } from './components/Notes/Upsert.js';
import { ClearForm } from './utils/form.js';

export function Submit(){
    const value = useRef(JSON.parse(localStorage.getItem('tsk-value')) ||  {"paperName":"",
    "paperAuthor":"",
    "submitName":"",
    "submitLink":"",
    "abstract":"",
    "article":"",
    "doi":"",
    "references":[],
    "notes":[],
    "links":[{link_title: '', link_url: ''}]
  });
  
  const markup = useRef({"title":"",
    "authors":[],
    "abstract":"",
    "content":"",
    "submissionBy":{"name":"","link":""},
    "notes":[],      //{"text":"",id:0}
    "references":[], //{"cite":"","doi":""}
    "works":[]       //{"title":"","link":""}
  });
  
    const txt = JSON.stringify(markup.current, null, 2)
  
    const [iconClass, setIconClass] = useState('copy');
  
    const clearMarkup =  function(value, markup){
      markup.current = {"title":"",
      "authors":[],
      "abstract":"",
      "content":"",
      "submissionBy":{"name":"","link":""},
      "notes":[],
      "references":[],
      "works":[],
      "tags":[],
    } 
  
      value.current = {"paperName":"",
      "paperAuthor":"",
      "submitName":"",
      "submitLink":"",
      "abstract":"",
      "article":"",
      "doi":"",
      "references":[],
      "notes":[],
      "links":[],
      "tags": [],
    }
  
      localStorage.removeItem('tsk-value')
      document.getElementById("dispalyMarkup").innerText = JSON.stringify(markup, null, 2)
      ClearForm();
  }
  
    const copyMarkup = () => {
      const type = "text/plain"
      const blob = new Blob([markup.current], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.writeText(data)
      .then(()=>setIconClass("copied"))
      .catch(() => console.log("Error: failed to copy"))
    }
  
    return (
      <Container fluid>
        <Row>
          <Col sm={8} className="offset-md-2 content">
            <center><h1>Tech Should Know</h1>
            <h2>social science for software people</h2></center>
            <p>Use this editor to generate the markup correctly then open a PR to <a href="https://github.com/mbellotti/tech-should-know-data">this repo</a></p>
        </Col></Row>
        <Row><Col sm={7} className="mr-2 content">
          <Submission value={value} markup={markup}/>
          </Col>
          <Col sm={5} className='markup'>
            <div className="copyBlock">
            <CopyIcon iconClass={iconClass} onClick={() => {copyMarkup()}}/>
            </div>
            <div id="dispalyMarkup" className="markupBody">
          {txt}
          </div>
          <div className="clearBlock">
            <button className="btn" onClick={() => {clearMarkup(value, markup)}}>Clear Markup</button>
          </div>
  
          </Col>
        </Row>
        <EditorModal value={value} markup={markup} />
      </Container>
    )
    
  }
  