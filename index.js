const http = require('http');
const fs = require('fs').promises;


const PORT = 7777;

// request - запрос пользователя. response - ответ пользователю
const requestHandler = async (request, response) => {
    const manifest = await fs.readFile('./package.json', 'utf8');
    
    response.writeHead(200, { 'Content-type': 'text/json'});
    response.end(manifest);
}

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server works at posrt ${PORT}`);
});