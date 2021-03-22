import '../App.css';

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
    <Container>
        <Row className="justify-content-md-center Home">
            <Col xs lg="4">
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Create Blog Space
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body> 
                            Create your own personalized blog space. Easy to maintain and post
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
            <Col xs lg="4">
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Post yor thoughts
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body> 
                            Let your thoughts flow. Influence the world, share your thoughts. Enhance your blog
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
        <Row className="Home">
            <Col>
                <Accordion defaultActiveKey="2">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Read Blogs
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body> 
                            Find out what interest you most. Search through a wide range of blogs available.
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    </Container>
  );
}

export default Home;