import { Routes, Route, Outlet, useParams, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {Home} from './components/Home.js'
import {About} from './components/About.js'
import {List} from './components/ArticleLists/List.js'
import {ByTag} from './components/ArticleLists/ByTag.js'
import {ByProfile} from './components/ArticleLists/ByProfile.js'
import {Content} from './components/Article/Content.js'
import {Submit} from './components/Submit/Submit.js'
import {NoMatch} from './components/NoMatch.js'
import './App.css';

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
    <footer className="mt-5"><small>Marianne Bellotti, 2024</small></footer>
    </Container>
  );
}

function Reading(){
  return(
    <Outlet />
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
          <Route path="tag/:tag" element={<ByTag />} />
          <Route path="researcher/:name" element={<ByProfile />} />
          <Route path="submit" element={<Submit />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

export default App;
