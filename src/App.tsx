import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import { NoteEditor, SubmitForm, ClearForm } from "./Editor";

import "./App.css";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Reading from "./components/Pages/Reading";
import List from "./components/Pages/List";
import NoMatch from "./components/Pages/NoMatch";
import Content from "./components/Pages/Content";
import TagPage from "./components/Pages/TagPage";
import Profile from "./components/Pages/Profile";
import Submit from "./components/Pages/Submit";

function Layout() {
  return (
    <Container fluid>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/book.svg"
              width="30"
              height="30"
              className="d-inline-block align-middle m-1"
              alt=""
            />
            <span className="d-sm-none d-md-inline">TechShouldKnow</span>
            <span className="d-none d-sm-inline d-md-none">TSK</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/items">List</Nav.Link>
              <Nav.Link href="/submit">
                <span className="link-callout">Submit</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <footer className="mt-5">
        <small>Marianne Bellotti, 2024</small>
      </footer>
    </Container>
  );

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="items" element={<Reading />}>
          <Route index element={<List />} />
          <Route path=":uuid" element={<Content />} />
        </Route>
        <Route path="tag/:tag" element={<TagPage />} />
        <Route path="researcher/:name" element={<Profile />} />
        <Route path="submit" element={<Submit />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
