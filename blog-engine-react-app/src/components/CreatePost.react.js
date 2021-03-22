import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {
    userEmail: string,
    selectedBlogSpace: string,
    setSelectedAction: () => void,
};

function CreatePost({userEmail, selectedBlogSpace, setSelectedAction}: Props) {
    const [title, settitle] = useState("");
    const [desc, setDesc] = useState("");

    const [isCreatePostClicked, setisCreatePostClicked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    if (isCreatePostClicked) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'title': title,
            'description': desc,
            'blogSpaceName': selectedBlogSpace,
            'createdByUserEmail': userEmail,
        }),
      };
      fetch("http://localhost:4000/blog/createPost", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setSelectedAction(null);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [title, desc, userEmail, selectedBlogSpace, isCreatePostClicked, setSelectedAction]);

    const onTitleChangeHandler = event => settitle(event.target.value);
    const onDescChangeHandler = event => setDesc(event.target.value);

    return (
        <div className="SignIn">
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="button" eventKey="0">
                        Create Post in {selectedBlogSpace} Blog
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" onChange={onTitleChangeHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" onChange={onDescChangeHandler} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={() => {setisCreatePostClicked(true)}}>
                                {isCreatePostClicked && !isLoaded && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                }
                                {isCreatePostClicked && !isLoaded ? 'Creating Post...' : 'Create'}
                            </Button>
                            {error && <div>Error: {error.message}</div>}
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        </div>
    );
}
export default CreatePost;