import React, { useState, useEffect } from 'react';

import '../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
    name: string,
    userEmail: string,
    setSelectedBlog: () => string,
    setSelectedPost: () => string,
};

function Blog({name, userEmail, setSelectedBlog, setSelectedPost}: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [shouldReload, setShouldReLoad] = useState(false);
    const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (isCommentSubmitted) {
            async function postComment() {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'comment': comment,
                        'postID': post.id,
                        'createdByUserEmail': userEmail,
                    }),
                };
                
                await fetch("http://localhost:4000/post/comment/", requestOptions)
                    .then(async res => await res.json())
                    .then(
                    (result) => {
                        setIsLoaded(true);
                        setIsCommentSubmitted(false);
                        setShouldReLoad(true);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                    )
            }
            postComment();
        }
        async function fetchData() {
            if (shouldReload === true || post == null) {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                await fetch("http://localhost:4000/post/getPost/"+name, requestOptions)
                    .then(async res => await res.json())
                    .then(
                    (result) => {
                        setIsLoaded(true);
                        setPost(result);
                        setComments(result.comments);
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
  }, [isCommentSubmitted, userEmail, comment, setComments, post, name, setIsLoaded, setError, setPost, shouldReload, setShouldReLoad]);
    const onCommentChangeHandler = event => setComment(event.target.value);

    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <Accordion defaultActiveKey="0">
                        {post && (
                            <>
                            <Card >
                            <Card.Header>
                                {post.title}
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
                                            <a href="#post" onClick={() => {
                                                    setSelectedBlog(post.blogSpaceName);                                                    
                                                    setSelectedPost(null)
                                                }}> {post.blogSpaceName} </a>
                                            </Card.Text>                                                    </Col>
                                        </Form.Group> 
                                        <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                            Created By
                                            </Form.Label>
                                            <Col sm="19">
                                            <Card.Text>
                                                {post.createdByUserEmail}
                                            </Card.Text>                                                    </Col>
                                        </Form.Group> 
                                    </Form>  
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                Comment
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <Card bg="dark" text="white">
                                    <Card.Body>
                                    {userEmail != null ? (
                                        <>
                                        <Form>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control as="textarea" onChange={onCommentChangeHandler} rows={2} placeholder="Enter Comment"/>
                                            </Form.Group>
                                        </Form>
                                        <Button className="commentButton" variant="primary" type="submit" onClick={() => {setIsCommentSubmitted(true)}}>
                                            {isCommentSubmitted && !isLoaded && <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                />
                                            }
                                            {isCommentSubmitted && !isLoaded ? 'Posting....' : 'Post'}
                                        </Button>
                                        </>
                                    ) : (
                                        <Form>
                                        <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                            <Col sm="19">
                                            <Card.Text>
                                                Please Sign In to leave comment
                                            </Card.Text>
                                            </Col>
                                        </Form.Group> 
                                    </Form>
                                    )}  
                                    </Card.Body>
                                    </Card>
                                    {comments && comments.map(comment => (
                                        <Card className="comment" bg="dark" text="white">
                                            <Card.Body>
                                                <Form>
                                                    <Form.Group as={Row} className="BlogSpace" controlId="formPlaintextEmail">
                                                        <Form.Label column sm="3">
                                                        {comment.createdByUserEmail} :
                                                        </Form.Label>
                                                        <Col sm="19">
                                                        <Card.Text>
                                                            {comment.comment}
                                                        </Card.Text>
                                                        </Col>
                                                    </Form.Group> 
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </>
                        )}
                    </Accordion>
                    {error && <div>Error: {error.message}</div>}

                </Col>
            </Row>
        </Container>
    );
}

export default Blog;