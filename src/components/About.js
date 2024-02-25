import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function About(){
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