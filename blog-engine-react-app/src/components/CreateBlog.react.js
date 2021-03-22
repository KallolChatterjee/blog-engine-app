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
    setSelectedAction: () => void,
    shouldLoadBlogs: () => void,
};

function CreateBlog({userEmail, setSelectedAction, shouldLoadBlogs}: Props) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [theme, setTheme] = useState("");
    const [isCreateBlogClicked, setisCreateBlogClicked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    if (isCreateBlogClicked) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'name': name,
            'description': desc,
            'category': category,
            'theme': theme,
            'createdByUserEmail': userEmail,
        }),
      };
      console.log(requestOptions);
      fetch("http://localhost:4000/blog/create", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            shouldLoadBlogs(true);
            setSelectedAction(null);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [name, desc, category, theme, userEmail, isCreateBlogClicked, setSelectedAction, shouldLoadBlogs]);

    const onNameChangeHandler = event => setName(event.target.value);
    const onDescChangeHandler = event => setDesc(event.target.value);
    const onCategoryChangeHandler = event => setCategory(event.target.value);
    const onThemeChangeHandler = event => setTheme(event.target.value);
    
    return (
        <div className="SignIn">
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="button" eventKey="0">
                        Create Blog
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={onNameChangeHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" onChange={onDescChangeHandler} />
                            </Form.Group>

                            <Form.Group controlId="formCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={onCategoryChangeHandler}
                                >
                                    <option value="Choose">Choose...</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                    <option value="Social">Social</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formTheme">
                                <Form.Label>Theme</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={onThemeChangeHandler}
                                >
                                    
                                    <option value="Light">Light</option>
                                    <option value="Dark">Dark</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" onClick={() => {setisCreateBlogClicked(true)}}>
                                {isCreateBlogClicked && !isLoaded && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                }
                                {isCreateBlogClicked && !isLoaded ? 'Creating Blog...' : 'Create'}
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
export default CreateBlog;