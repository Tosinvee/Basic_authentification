function decodeCredentials(authHeader) {
  
  const base64Credentials = authHeader.split(' ')[1];
  if (!base64Credentials) {
    return ['', ''];
  }
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  return credentials.split(':');
}

module.exports = function (req, res, next) {
  
  const [username, password] = decodeCredentials(req.headers.authorization || '');


  if (username === 'admin' && password === 'password') {
    return next();
  }

  
  res.setHeader('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required.');
};