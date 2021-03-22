import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import CreateBlog from './CreateBlog.react';
import BlogSpaceList from './BlogSpaceList.react';
import BlogSpace from './BlogSpace.react';
import CreatePost from './CreatePost.react';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
    userName: string,
    userEmail: string,
    setSelectedPost: () => string,
};

function User({userName, userEmail, setSelectedPost}: Props) {
    const [selectedAction, setSelectedAction] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [shouldReload, setShouldReLoad] = useState(false);
    const [selectedBlogSpace, setSelectedBlogSpace] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (shouldReload === true || data == null) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                await fetch("http://localhost:4000/user/getAllBlogs/"+userEmail, requestOptions)
                    .then(async res => await res.json())
                    .then(
                    (result) => {
                        setIsLoaded(true);
                        setData(result);
                        setShouldReLoad(false);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                    )
            }
        }
        fetchData();
  }, [data, userEmail, setIsLoaded, setError, setData, shouldReload, setShouldReLoad]);

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    {!selectedAction && !selectedBlogSpace && (
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="button" eventKey="0">
                                        My Blog Spaces
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
                                        {isLoaded && 
                                            <BlogSpaceList 
                                                blogSpaces={data} 
                                                userEmail={userEmail} 
                                                setSelectedBlogSpace={setSelectedBlogSpace}/>}
                                        {error && <div>Error: {error.message}</div>}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )}
                    {
                        selectedAction === 'CreateBlog' &&
                        <CreateBlog userEmail={userEmail} setSelectedAction={setSelectedAction} shouldLoadBlogs={setShouldReLoad}/>
                    }
                    { 
                        selectedAction === "CreatePost" && 
                        <CreatePost userEmail={userEmail} selectedBlogSpace={selectedBlogSpace} setSelectedAction={setSelectedAction}/>
                    }
                    {selectedBlogSpace != null && selectedAction !== "CreatePost" && <BlogSpace name={selectedBlogSpace} userEmail={userEmail} setSelectedPost={setSelectedPost}/>}
                </Col>
                <Col sm={4}>
                    <Accordion defaultActiveKey="1">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="button" eventKey="1">
                                    Actions
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            {!selectedBlogSpace ? (
                                            <a href="#createBlog" onClick={() => setSelectedAction('CreateBlog')}>
                                                Create Blog Space
                                            </a>
                                            ) : (
                                                <a href="#showAllBlogs" onClick={() => {
                                                    setSelectedAction(null);
                                                    setSelectedBlogSpace(null);
                                                    setShouldReLoad(true);
                                                }}>
                                                Show All Blog Spaces
                                                </a>
                                            )}
                                        </ListGroup.Item>
                                        {selectedBlogSpace && (
                                        <ListGroup.Item>
                                                <a href="#createBlog" onClick={() => setSelectedAction('CreatePost')}>
                                                    Create Post
                                                </a>
                                        </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
}
export default User;