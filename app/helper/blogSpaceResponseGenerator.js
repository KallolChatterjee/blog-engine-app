const genBlogSpaceResponse = (blogSpace, posts) => {
  let postObj = [];
  if (posts != null) {
    posts.sort((c1, c2) => c2.createdAt - c1.createdAt);
    postObj = posts.map(post => {
      return {
        "id": post._id,
        "title": post.title,
        "description": post.description,
      }
    });
  }
  return {
    "name": blogSpace.name,
    "description": blogSpace.description,
    "category": blogSpace.category,
    "theme": blogSpace.theme,
    "createdByUserEmail": blogSpace.createdByUserEmail,
    "postObj": postObj,
  }
}
module.exports = genBlogSpaceResponse;
