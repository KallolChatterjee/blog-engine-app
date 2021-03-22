import '../App.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    setUserName: (name: string) => void,
    setAuthToken: (authToken: string) => void,
    setCurrentNav: (currentNav: string) => void,
    setUserEmail: (email: string) => void,
};

function SignUp({
    setUserName,
    setAuthToken,
    setCurrentNav,
    setUserEmail,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isSignUpClicked) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': pwd
        }),
      };

      fetch("http://localhost:4000/user/signup", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setUserName(result.name);
            setAuthToken(result.authToken);
            setUserEmail(result.email);
            setCurrentNav("User");
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [name, email, pwd, isSignUpClicked, setUserName, setAuthToken, setCurrentNav, setUserEmail]);

  const onNameChangeHandler = event => setName(event.target.value);
  const onPWDChangeHandler = event => setPwd(event.target.value);
  const onEmailChangeHandler = event => setEmail(event.target.value);

  return (
      <div className="SignIn">
        <Form>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Text className="text-muted">
                    New User Registration
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={onNameChangeHandler} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={onEmailChangeHandler} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={onPWDChangeHandler}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={() => {setIsSignUpClicked(true)}}>
                {isSignUpClicked && !isLoaded && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                }
                {isSignUpClicked && !isLoaded ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {error && <div>Error: {error.message}</div>}
        </Form>
    </div>
  );
}

export default SignUp;
