const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  console.log(request.url);

  // Set header content type
  response.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch (request.url) {
    case '/':
      response.statusCode = 200;
      path += 'index.html';
      break;
    case '/about':
      response.statusCode = 200;
      path += 'about.html';
      break;
    default:
      response.statusCode = 404;
      path += '404.html';
      break;
  }


  fs.readFile(path, (error, data) => {
    if (error) {
      console.error(error);
      response.end();
    } else {
      // response.write(data)
      response.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log(`server listening on port 3000`);
});
