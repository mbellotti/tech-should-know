import {useState, useRef} from 'react';
import { Routes, Route, Outlet, useParams, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Notes from './Notes.js';
import { Interweave } from 'interweave';
import { CopyIcon } from './Icons.js';
import { NoteEditor, SubmitForm, ClearForm } from './Editor.js';

import './App.css';

const API = "https://raw.githubusercontent.com/mbellotti/tech-should-know-data/main/"


function Annotation({idx, item}) {
  
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

function Abstract({text}){
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

function Authors({authors}){
  if(authors.length > 1){
    return <h4>{authors.join(", ")}</h4>
  }
  return <h2>{authors[0]}</h2>
}

function Article({text}){
  return (
    <Interweave content={text} />
  )
}

function Content(){
  const { uuid } = useParams();
  const url = API + "articles/" +uuid + ".json";
  const [article, setArticle] = useState({"notes":[], "authors":[]});
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

  const notes = article.notes.map((d,idx) =>
      <Annotation idx={idx} item={d}/>
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
        </Col>
        <Col sm={3} className='notes'>
          {right}
        </Col>
      </Row>
    </Container>
  );
}

function Layout() {
  return (
    <Container fluid>
      <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
        <img src="/book.svg" width="30" height="30" class="d-inline-block align-middle m-1" alt=""/>
        <span className="d-sm-none d-md-inline">TechShouldKnow</span><span className="d-none d-sm-inline d-md-none">TSK</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/items">List</Nav.Link>
            <Nav.Link href="/submit"><span className="link-callout">Submit</span></Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </Container>
  );
}

function Home(){
  const navigate = useNavigate();
  const url = API + "index.json";
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

function About(){
  return (
    <Container fluid>
      <Row>
        <Col sm={2} className='notes'>
        </Col>
        <Col sm={8} className="content">
          <center><h1>Tech Should Know</h1>
          <h2>social science for software people</h2></center>
          <h3 className="mt-5">What Is This?</h3>
          <p>Computers haven't been purely about computating in a long time. Modern computers shape how we interact with each other and the world around us. They define how we discover information, what we buy, how we think about our lives ... all things that social science has spent decades researching.</p>
         <p>There's a lot that social scientists know that software people are forced to learn via trial and error. And yet, how is any practitioner supposed to find nudgets of insight spread out across so many different disciplines?</p>
         <p>This is a primer on some of the best and most relevant research for software people. Things that will make you think differently about how you build your systems, how you run them and what they do in the first place.</p>
          <h3>Who's Responsible For This?</h3>
          <img src="/84338978_148269803308700_513760480813693438_n.jpg" width="350" height="300" className="m-3"/>
          <p>TSK is mainly a product of <a href="https://www.linkedin.com/in/bellmar/">Marianne Bellotti's</a> sheer stubbornness. She got sick of constantly being told that STEM people don't value social sciences by people who were not in STEM in the first place. At the same time, software engineers were constantly telling her "this is interesting, you should write a book about this."</p>
          <p>Well ... the book may one day happen. But for the time being it seemed like more fun to help connect technical people with new schools of thought. Point them in the right direction and let them go exploring!</p>
          <p>You may be more familiar with Marianne's book on legacy modernization, <a href="https://nostarch.com/kill-it-fire"><em>Kill It With Fire: Manage Aging Computer Systems (and Future Proof Modern Ones)</em></a></p>
          <p>Otherwise, She has built data infrastructure for the United Nations, run incident response at United States Digital Service, founded the Platform Services team at Auth0 (a portfolio that included shared services, untrusted code execution, and developer tools). She will eventually brow beat some publisher into distributing her opus on modeling systems. She can be found on most social networks under the handle <a href="https://www.linkedin.com/in/bellmar/">bellmar</a>.</p>
          <h3>Who Contributes?</h3>
          { /* 
          <p>Here's a non-ordered, chaotically neutral list of all the people who have graciously added annotated papers to the collection</p>
          */}
          <p><small>Want to see your name here? <a href="/submit">Submit an annotated paper!</a></small></p>
          <h3>What Types of Papers?</h3>
          <p>First and foremost, papers must be from a <em><u>social science</u></em> perspective. There are many amazing math and computer science papers out there that of course all technical people would benefit from reading, but the goal of this project is to expose technologists to schools of thought and bodies of knowledge that they <strong>WOULD NOT</strong> otherwise be exposed to because they belong to a "non-technical" field or discipline. If you're looking for great math and CS papers, <a href="https://paperswelove.org/">Papers We Love</a> never fails to deliver.</p>
          <p>I also prefer that the paper in question be freely available for download through some legitimate means. The means a university site, the author's CV, or any number of open science repos, not Sci-hub (although I do love Sci-hub). While the whole concept of this site is to post articles with commentary/analysis (and therefore fair use), I'd like to be able to link back to the original paper if for no other reason than it helps people discover more works by the same author or colleagues in the space.</p>
         <h3>What Else?</h3>
         <p>Icons by <a href="https://thenounproject.com/grega.cresnar/">Grega Cresnar</a> and <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a></p>
         </Col>
        <Col sm={2} className='notes'>
        </Col>
      </Row>
    </Container>
  )
}

function Reading(){
  return(
    <Outlet />
  )
}


function List(){
  const url = API + "index.json";
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
          <h3 className="mt-5">The Master List</h3>
          <ArticleList articles={masterlist.articles} />
          </Col>
        <Col sm={2} className='notes'>
        </Col>
      </Row>
    </Container>
  )
}

function ArticleList({articles}){
  const a = articles.map((article) => <li><a href={"items/" + article.uri}>{article.title}</a></li>)
  return (
    <ul>
      {a}
    </ul>
  )
}

function Submit(){
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

// var intervalId = window.setInterval(function(){
//   const txt = JSON.stringify(markup.current, null, 2)
//   document.getElementById("dispalyMarkup").innerText = txt
// }, 1000);

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
          <p>Use this editor to generate the markup correctly then open a PR to <a href="">this repo</a></p>
      </Col></Row>
      <Row><Col sm={7} className="mr-2 content">
        <SubmitForm value={value} markup={markup}/>
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
      <NoteEditor value={value} markup={markup} />
    </Container>
  )
  
}

function NoMatch(){
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

function App(){
  return(<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<Reading />}>
            <Route index element={<List />} />
            <Route path=":uuid" element={<Content />} />
          </Route>
          <Route path="submit" element={<Submit />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

export default App;
