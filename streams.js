const fs = require('fs');
// Streams, start using data before it has finished being read.
// small packets of data are moved into something called a buffer.
// That way you can start reading from the buffer without having to load
// the entire file.
const readStream = fs.createReadStream('./docs/blog2.txt', {
  encoding: 'utf8',
});
const writeStream = fs.createWriteStream('./docs/blog3.txt');

// readStream.on('data', chunk => {
//   console.log('new chunk');
//   console.log(chunk);
//   writeStream.write('\nNEW CHUNK\n');
//   writeStream.write(chunk);
// });

// piping
readStream.pipe(writeStream)
