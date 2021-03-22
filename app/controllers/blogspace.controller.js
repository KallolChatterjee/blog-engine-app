const genBlogSpaceResponse = require('../helper/blogSpaceResponseGenerator');
const genPostSpaceResponse = require('../helper/postSpaceGenerator');

const BlogSpace = require('../models/blogspace.model.js');
const Post = require('../models/post.model');

// Create and Save a new BlogSpace
exports.createBlog = (req, res) => {
  // Validate request
  if(
      !req.body.name || 
      !req.body.description || 
      !req.body.category || 
      !req.body.theme || 
      !req.body.createdByUserEmail
    ) {
      return res.status(400).send({
          message: "Blog Space content can not be empty"
      });
  }
  BlogSpace.findOne({
    name: req.body.name,
  },
  (error, isExistingBlogSpace) => {
    if (error) {
      return res.status(400).send({
          message: "Query Error"
      });
    }
    if (isExistingBlogSpace) {
      return res.status(400).send({
          message: "Blogspace Name already found. Try a new name"
      });
    }
  });
  // Create a BlogSpace
  const blogSpace = new BlogSpace({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        theme: req.body.theme,
        createdByUserEmail: req.body.createdByUserEmail,
  });

  // Save BlogSpace in the database
  blogSpace.save()
  .then(data => {
    const responseObject = genBlogSpaceResponse(blogSpace);
    res.send(responseObject);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while Registering the blogSpace."
      });
  });
};

// Update theme of a blogspace identified by the userId in the request
exports.updateTheme = async (req, res) => {
  if (!req.body.name || !req.body.theme ||!req.body.createdByUserEmail) {
      return res.status(400).send({
          message: "Blogspace update info can not be empty"
      });
  }
  // Find blogspce and update login information
  BlogSpace.findOneAndUpdate(
    {
      name: req.body.name,
      createdByUserEmail: req.body.createdByUserEmail,
    },
    {
      theme: req.body.theme,
    },
    {
      new: true,
    },
    async (error, blogSpace) => {
      if (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No Blogspace found for given user"
            });
        }
        return res.status(500).send({
            message: "Error occurred updating theme"
        });
      }

      if (!blogSpace) {
          return res.status(404).send({
              message: "No such blogspace found"
          });
      }
      const posts = await Post.find({
        blogSpaceName: req.body.name,
      }); 
      
      const responseObject = genBlogSpaceResponse(blogSpace, posts);
      res.send(responseObject);
    });
};

// Find all blogspace identified by the userId in the request
exports.getAllBlogSpaceForUser = async (req, res) => {
  if (!req.params.userEmail) {
      return res.status(400).send({
          message: "Blogspace query info can not be empty"
      });
  }
  // Find blogspce for user
    const blogSpaces = await BlogSpace.find({
        createdByUserEmail: req.params.userEmail,
    }); 
    blogSpaces.sort((c1, c2) => c2.createdAt - c1.createdAt);
    const responseObject = blogSpaces.map(blogSpace => {
      return genBlogSpaceResponse(blogSpace);
    });
    res.send(responseObject);
};

// Find all posts identified by the blog in the request
exports.getBlogSpaceDetails = async (req, res) => {
  if (!req.params.blogSpaceName) {
      return res.status(400).send({
          message: "Blogspace query info can not be empty"
      });
  }
  // Find blogspce for user
    const blogSpaces = await BlogSpace.find({
        name: req.params.blogSpaceName,
    });
    const posts = await Post.find({
        blogSpaceName: req.params.blogSpaceName,
    }); 
    const responseObject = genBlogSpaceResponse(blogSpaces[0], posts);
    res.send(responseObject);
};

// Find all blogspace and posts
exports.getAllBlogAndPostsForUser = async (req, res) => {
    const blogSpaces = await BlogSpace.find({});
    const posts = await Post.find({}); 
    const responseBlogObject = blogSpaces.map(blogSpace => {
      return genBlogSpaceResponse(blogSpace);
    });
    const responsePostObject = posts.map(post => {
      return genPostSpaceResponse(post);
    });
    res.send({
      'blogs': responseBlogObject,
      'posts': responsePostObject
    });
};