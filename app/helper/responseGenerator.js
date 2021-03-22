const genUserResponse = (user) => {
  return {
    "authToken": user.authToken,
    "email": user.email,
    "isLoggedIn": user.isLoggedIn,
    "name": user.name,
  }
}
module.exports = genUserResponse;
