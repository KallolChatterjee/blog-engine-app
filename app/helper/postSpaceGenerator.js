const genPostSpaceResponse = (post, comments) => {
  let commentObj = [];
  if (comments != null) {
    comments.sort((c1, c2) => c2.createdAt - c1.createdAt);
    commentObj = comments.map(comment => {
      return {
        "comment": comment.comment,
        "createdByUserEmail": comment.createdByUserEmail,
      }
    });
  }

  return {
    "id": post._id,
    "title": post.title,
    "description": post.description,
    "blogSpaceName": post.blogSpaceName,
    "createdByUserEmail": post.createdByUserEmail,
    "comments": commentObj,
  }
}
module.exports = genPostSpaceResponse;
