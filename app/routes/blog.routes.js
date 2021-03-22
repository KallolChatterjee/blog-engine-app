module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const blogs = require('../controllers/blogspace.controller');
    const posts = require('../controllers/post.controller');

    app.post('/user/signup', users.signup);
    app.put('/user/login/', users.logIn);
    app.put('/user/logout/', users.logOut);
    app.get('/user/isLoggedIn/', users.checkIsLoggedIn);
    app.post('/blog/create', blogs.createBlog);
    app.put('/blog/updateTheme/', blogs.updateTheme);
    app.get('/user/getAllBlogs/:userEmail', blogs.getAllBlogSpaceForUser);
    app.get('/blog/getBlog/:blogSpaceName', blogs.getBlogSpaceDetails);
    app.post('/blog/createPost/', posts.createPost);
    app.get('/findAll', blogs.getAllBlogAndPostsForUser);
    app.get('/post/getPost/:postID', posts.getPostDetails);
    app.post('/post/comment', posts.comment);
  };
