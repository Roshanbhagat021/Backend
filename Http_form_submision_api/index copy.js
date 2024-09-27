const http = require("http");
const fs = require("fs");
const path = require("path");
require('dotenv').config()
const querystring = require("querystring");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/signup") {
        const htmlFilePath = path.join(__dirname, './', 'index.html');
        fs.readFile(htmlFilePath, "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error while reading HTML file.");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    } else if (req.method === "POST" && req.url === "/signup") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            // Parse the form data (application/x-www-form-urlencoded)
            const parsedData = querystring.parse(body);

            // Log the parsed email and password
            console.log("Email:", parsedData.email);
            console.log("Password:", parsedData.password);

            // Send a response back to the client
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`Signup successful for ${parsedData.email}`);
        });
    }
});

const port = process.env.PORT
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
