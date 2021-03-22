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

function SignIn({
    
    setUserName,
    setAuthToken,
    setCurrentNav,
    setUserEmail,
}: Props) {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isSignInClicked) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'email': name,
          'password': pwd
        }),
      };

      fetch("http://localhost:4000/user/login", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
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
  }, [name, pwd, isSignInClicked, setUserName, setAuthToken, setCurrentNav, setUserEmail]);

  const onNameChangeHandler = event => setName(event.target.value);
  const onPWDChangeHandler = event => setPwd(event.target.value);

  return (
      <div className="SignIn">
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={onNameChangeHandler} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={onPWDChangeHandler}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Text className="text-muted">
                    New User ? <a href="#signup" onClick={() => setCurrentNav('SignUp')}> Register Here </a>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => {setIsSignInClicked(true)}}>
                {isSignInClicked && !isLoaded && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                }
                {isSignInClicked && !isLoaded ? 'Signing In...' : 'Sign In'}
            </Button>
            {error && <div>Error: {error.message}</div>}
        </Form>
    </div>
  );
}

export default SignIn;
