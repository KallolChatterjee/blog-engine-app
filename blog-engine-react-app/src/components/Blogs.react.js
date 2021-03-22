import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import AllBlogs from './AllBlogs.react';
import AllPosts from './AllPosts.react';

type Props = {
    loggedInUserName: string,
    userEmail: string,
    setSelectedBlog: () => string,
    setSelectedPost: () => string,
};

function Blogs({loggedInUserName, userEmail, setSelectedBlog, setSelectedPost}: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [blogs, setBlogs] = useState(null);
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch("http://localhost:4000/findAll", requestOptions)
                .then(async res => await res.json())
                .then(
                (result) => {
                    setIsLoaded(true);
                    setBlogs(result.blogs);
                    setPosts(result.posts)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
                )
        }
        fetchData();
  }, [setIsLoaded, setError, setBlogs, setPosts]);

    return (
        <Container>
        <Row className="justify-content-md-center Home">
            <Col>
                <Accordion defaultActiveKey="0">
                    <Card bg="dark" text="white">
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Available Blogs {blogs && <Badge variant="info">{blogs.length}</Badge>}
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body> 
                        {isLoaded === false && <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />}
                        {isLoaded && <div>
                            <AllBlogs blogs={blogs} setSelectedBlog={setSelectedBlog}/>
                        </div>}
                            {error && <div>Error: {error.message}</div>}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
        <Row className="Home">
            <Col>
                <Accordion defaultActiveKey="2">
                    <Card bg="dark" text="white">
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Posts {posts && <Badge variant="info">{posts.length}</Badge>}
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body> 
                            {isLoaded === false && <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                            {isLoaded && <div><AllPosts posts={posts} setSelectedPost={setSelectedPost}/> </div>}
                            {error && <div>Error: {error.message}</div>}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    </Container>
    )
}

export default Blogs;