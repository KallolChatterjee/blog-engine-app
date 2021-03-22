import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';

type Props = {
    blogs: Array<>,
    setSelectedBlog: () => string,
    setSelectedPost: () => string,
};

function AllPosts({posts, setSelectedBlog, setSelectedPost}: Props) {
    return (
        <div class="carousel">
        <Carousel class="carousel">
        {posts && posts.map(post => 
            <Carousel.Item>
                <Card bg="dark" text="white" class="carouselCard">
                    <Card.Header>
                        <a href="#post" onClick={() => setSelectedPost(post.id)}> {post.title} </a>
                    </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                    Description
                                    </Form.Label>
                                    <Col sm="19">
                                    <Card.Text>
                                        {post.description}
                                    </Card.Text>
                                    </Col>
                                </Form.Group> 
                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                    Blog Space
                                    </Form.Label>
                                    <Col sm="19">
                                    <Card.Text>
                                        {post.blogSpaceName}
                                    </Card.Text>                                                    
                                    </Col>
                                </Form.Group> 
                                <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                    Created By
                                    </Form.Label>
                                    <Col sm="19">
                                    <Card.Text>
                                        {post.createdByUserEmail}
                                    </Card.Text>  
                                    </Col>
                                </Form.Group> 
                            </Form>
                        </Card.Body>
                </Card>
            </Carousel.Item>
        )}
        </Carousel>
        </div>
    );
};

export default AllPosts;