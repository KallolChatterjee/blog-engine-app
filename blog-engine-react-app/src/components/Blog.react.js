import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

type Props = {
    name: string,
    setSelectedBlog: () => string,
    setSelectedPost: () => string,
};

function Blog({name, setSelectedBlog, setSelectedPost}: Props) {
    const [blogSpace, setBlogSpace] = useState(null);
    const [shouldReload, setShouldReLoad] = useState(false);
    const [theme, setTheme] = useState("");
    const [updateTheme, setUpdatedTheme] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            if (shouldReload === true || blogSpace == null) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                await fetch("http://localhost:4000/blog/getBlog/"+name, requestOptions)
                    .then(async res => await res.json())
                    .then(
                    (result) => {
                        setBlogSpace(result);
                        setShouldReLoad(false);
                        setTheme(result.theme);
                    },
                    )
            }
        }
        fetchData();
  }, [updateTheme, blogSpace, name, theme, setBlogSpace, shouldReload, setShouldReLoad, setTheme, setUpdatedTheme]);
    
    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <Accordion defaultActiveKey="0">
                        {blogSpace && (
                            <Card 
                            bg={blogSpace.theme === "Dark" ? "dark" : "light"} 
                            text={blogSpace.theme === "Dark" ? "white" : "black"}
                        >
                            <Card.Header>
                                {blogSpace.name}
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
                                            Total Posts
                                            </Form.Label>
                                            <Col sm="19">
                                            <Card.Text>
                                                {blogSpace.postObj.length}
                                            </Card.Text>  
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                            Theme
                                            </Form.Label>
                                            <Col sm="16">
                                            <Card.Text>
                                                {blogSpace.theme}
                                            </Card.Text>  
                                          </Col>
                                        </Form.Group>
                                    </Form>
                                    <Card.Title>Posts</Card.Title>
                                    {blogSpace.postObj != null && blogSpace.postObj.map(post => (
                                         <Card 
                                            className="Home"
                                            bg={blogSpace.theme === "Dark" ? "dark" : "light"} 
                                            text={blogSpace.theme === "Dark" ? "white" : "black"}
                                        >
                                            <Card.Header>
                                                <a href="#post" onClick={() => {
                                                    setSelectedBlog(null);                                                    
                                                    setSelectedPost(post.id)
                                                }}> {post.title} </a>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {post.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        )}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
}

export default Blog;