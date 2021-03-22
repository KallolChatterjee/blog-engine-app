const genPostSpaceResponse = require('../helper/postSpaceGenerator');
const Post = require('../models/post.model');
const BlogSpace = require('../models/blogspace.model');
const  Comment = require('../models/comment.model');

// Create and Save a new BlogPost
exports.createPost = (req, res) => {
  // Validate request
  console.log(req);
  if(
      !req.body.title || 
      !req.body.description || 
      !req.body.blogSpaceName || 
      !req.body.createdByUserEmail
    ) {
      return res.status(400).send({
          message: "Post content can not be empty"
      });
  }
  BlogSpace.findOne({
    name: req.body.blogSpaceName,
    createdByUserEmail: req.body.createdByUserEmail,
  },
  (error, isExistingBlogSpace) => {
    if (error) {
      return res.status(400).send({
          message: "Query Error"
      });
    }
    if (!isExistingBlogSpace) {
      return res.status(400).send({
          message: "No Blogspace found"
      });
    }
  });
  // Create a post
  const post = new Post({
        title: req.body.title,
        description: req.body.description,
        blogSpaceName: req.body.blogSpaceName,
        createdByUserEmail: req.body.createdByUserEmail,
  });

  // Save BlogSpace in the database
  post.save()
  .then(data => {
    const responseObject = genPostSpaceResponse(post);
    res.send(responseObject);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while Registering the post."
      });
  });
};

// Find all comments identified by the post in the request
exports.getPostDetails = async (req, res) => {
  if (!req.params.postID) {
      return res.status(400).send({
          message: "Post query info can not be empty"
      });
  }
    const posts = await Post.find({
        _id: req.params.postID,
    });
    const comments = await Comment.find({
      post: posts[0]._id,
    })
    const responseObject = genPostSpaceResponse(posts[0], comments);
    res.send(responseObject);
};

// Comment on post
exports.comment = (req, res) => {
  // Validate request
  console.log(req);
  if(
      !req.body.comment || 
      !req.body.createdByUserEmail ||
      !req.body.postID
    ) {
      return res.status(400).send({
          message: "Post comment can not be empty"
      });
  }
  Post.findOne({
    _id: req.body.postID,
  },
  (error, isExistingBlogSpace) => {
    if (error) {
      return res.status(400).send({
          message: "Query Error"
      });
    }
    if (!isExistingBlogSpace) {
      return res.status(400).send({
          message: "No post found"
      });
    }
  });
  // Create a comment
  const comment = new Comment({
      comment: req.body.comment,
      createdByUserEmail: req.body.createdByUserEmail,
      post: req.body.postID,
  });

  // Save BlogSpace in the database
  comment.save()
  .then(data => {
    res.send(comment);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while Registering the post."
      });
  });
};