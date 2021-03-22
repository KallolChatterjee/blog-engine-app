import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';

type Props = {
    blogs: Array<>,
    setSelectedBlog: () => string,
};

function AllBlogs({blogs, setSelectedBlog}: Props) {
    return (
        <div class="carousel">
        <Carousel class="carousel">
        {blogs && blogs.map(blog => 
            <Carousel.Item>
                <Card bg="dark" text="white" class="carouselCard">
                    <Card.Header>
                        <a href="#blog" onClick={() => setSelectedBlog(blog.name)}> {blog.name} </a>
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
                                        {blog.description}
                                    </Card.Text>
                                    </Col>
                                </Form.Group> 
                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                    Category
                                    </Form.Label>
                                    <Col sm="19">
                                    <Card.Text>
                                        {blog.category}
                                    </Card.Text>                                                    </Col>
                                </Form.Group> 
                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                    Theme
                                    </Form.Label>
                                    <Col sm="19">
                                    <Card.Text>
                                        {blog.theme}
                                    </Card.Text>  
                                    </Col>
                                </Form.Group> 
                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                    Created By
                                    </Form.Label>
                                    <Col sm="19">
                                    <Card.Text>
                                        {blog.createdByUserEmail}
                                    </Card.Text>  
                                    </Col>
                                </Form.Group> 
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Carousel.Item>
        )}
        </Carousel>
        </div>
    );
};

export default AllBlogs;