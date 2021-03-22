import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.react';
import SignIn from './components/SignIn.react';
import SignUp from './components/SignUp.react';
import User from './components/User.react';
import Blogs from './components/Blogs.react';
import Blog from './components/Blog.react';
import Post from './components/Post.react';

function App() {
  const [currentNav, setCurrentNav] = useState("Home");
  const [loggedInUserName, setLoggedinUserName] = useState(null);
  const [loggedInUserToken, setLoggedInUserToken] = useState(null);
  const [loggedInUserEmail, setLoggedinUserEmail] = useState(null);
  const [islogoutClicked, setIsLogoutClicked] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    if (islogoutClicked) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'email': loggedInUserEmail,
          'authToken': loggedInUserToken
        }),
      };

      fetch("http://localhost:4000/user/logout", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setLoggedinUserName(null);
            setLoggedInUserToken(null);
            setCurrentNav("Home");
            setIsLogoutClicked(false);
            setLoggedinUserEmail(null);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }, [islogoutClicked, loggedInUserEmail, loggedInUserToken, setLoggedinUserName, setLoggedInUserToken, setCurrentNav, setError,]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Blogs</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" onClick={() => {
            setCurrentNav("Home");
            setSelectedBlog(null);
            setSelectedPost(null);
          }}>Home</Nav.Link>
          <Nav.Link href="#blog" onClick={() => {
            setCurrentNav("Blog");
            setSelectedBlog(null);
            setSelectedPost(null);
          }}>Blog</Nav.Link>
          
        </Nav>
        <Nav>
          {loggedInUserName && (<Nav.Link href="#">Welcome {loggedInUserName}</Nav.Link>)}
          {loggedInUserName && (
            <Nav.Link href="#logOut" onClick={() => {
              setIsLogoutClicked(true);
              setSelectedBlog(null);
              setSelectedPost(null);
            }}>Log Out</Nav.Link>
          )}
          {!loggedInUserName && (
            <Nav.Link href="#signIn" onClick={() => {
              setCurrentNav("SignIn");
              setSelectedBlog(null);
              setSelectedPost(null);
            }}>Sign In</Nav.Link>
          )}
        </Nav>
      </Navbar>
      {selectedBlog && <Blog 
        name={selectedBlog} 
        setSelectedBlog={setSelectedBlog}
        setSelectedPost={setSelectedPost}
      />}
      {selectedPost && <Post 
        userEmail={loggedInUserEmail} 
        name={selectedPost}
        setSelectedBlog={setSelectedBlog}
        setSelectedPost={setSelectedPost}
      />}
      {!selectedBlog && !selectedPost && currentNav === "Home" && loggedInUserName == null && <Home />}
      {!selectedBlog && !selectedPost && currentNav === "Blog" && 
        <Blogs 
          loggedInUserName={loggedInUserName} 
          userEmail={loggedInUserEmail} 
          setSelectedBlog={setSelectedBlog}
          setSelectedPost={setSelectedPost}
        />
      }
      {!selectedBlog && !selectedPost && (
        (currentNav === "Home" && loggedInUserName != null) || 
        currentNav === "User"
      ) && <User userName={loggedInUserName} userEmail={loggedInUserEmail} setSelectedPost={setSelectedPost}/>}
      {!selectedBlog && !selectedPost && currentNav === "SignIn" && (
        <SignIn 
          setUserName={setLoggedinUserName} 
          setAuthToken={setLoggedInUserToken}
          setCurrentNav={setCurrentNav}
          setUserEmail={setLoggedinUserEmail}
        />
      )}
      {!selectedBlog && !selectedPost && currentNav === "SignUp" && (
        <SignUp 
          setUserName={setLoggedinUserName} 
          setAuthToken={setLoggedInUserToken}
          setCurrentNav={setCurrentNav}
          setUserEmail={setLoggedinUserEmail}
        />
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default App;
