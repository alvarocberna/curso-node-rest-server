import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {

    console.log(req.url);
    //ej sec 190 - server as rendering
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(`<h1> Hola, esta es la ULR: ${req.url} </h1>`);
    // res.end();

    //ej sec 191
    // const data = { name: 'Juan', age: 50, city: 'Viña del mar' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    //ej sec 192

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);

})

server.listen(8080, () => {
    console.log('Server is running on port 8080');
})