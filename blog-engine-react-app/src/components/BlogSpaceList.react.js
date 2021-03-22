import '../App.css';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {
    userEmail: string,
    blogSpaces: Array<>,
    setSelectedBlogSpace: () => void,
};

function BlogSpaceList({blogSpaces, userEmail, setSelectedBlogSpace}: Props) {

    return (
        <Container>
            {blogSpaces != null && blogSpaces.map(blogSpace => {
                return (
                    <Row className="list">
                        <Col sm={12}>
                            <Accordion defaultActiveKey="0">
                                <Card 
                                    bg={blogSpace.theme === "Dark" ? "dark" : "light"} 
                                    text={blogSpace.theme === "Dark" ? "white" : "black"}
                                >
                                    <Card.Header>
                                        {blogSpace.name}
                                        <Button 
                                            variant={blogSpace.theme === "Dark" ? "light" : "secondary"} 
                                            className="exploreButton"
                                            onClick={() => setSelectedBlogSpace(blogSpace.name)}
                                        >
                                            Explore more
                                        </Button>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form>
                                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3">
                                                    Description
                                                    </Form.Label>
                                                    <Col sm="19">
                                                    <Card.Text>
                                                        {blogSpace.description}
                                                    </Card.Text>
                                                    </Col>
                                                </Form.Group> 
                                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3">
                                                    Category
                                                    </Form.Label>
                                                    <Col sm="19">
                                                    <Card.Text>
                                                        {blogSpace.category}
                                                    </Card.Text>                                                    </Col>
                                                </Form.Group> 
                                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3">
                                                    Theme
                                                    </Form.Label>
                                                    <Col sm="19">
                                                    <Card.Text>
                                                        {blogSpace.theme}
                                                    </Card.Text>  
                                                    </Col>
                                                </Form.Group> 
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                );
            })}
        </Container>
    );
}

export default BlogSpaceList;