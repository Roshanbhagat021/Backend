const http = require ("http")
const fs = require("fs")
const path = require('path');
const querystring = require('querystring');



const server = http.createServer((req,res)=>{
     if (req.method == "GET" && req.url == "/signup"){
        const htmlFilePath = path.join(__dirname, './', 'index.html');
                fs.readFile(htmlFilePath,"utf-8",(err,data)=>{
                    try {
                        res.writeHead(200, {"Content-Type":"text/html"})
                        res.end(data)
                    } catch (error) {
                        console.log({"msg":"error while reading html file"});
                    }
                })
     }
     else if (req.method == "POST" && req.url == "/signup"){
        let body = ""
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        
        req.on('end', () => {
            // Parse the form data
            const parsedData = querystring.parse(body);

            // Log the data to the console
            console.log('Email:', parsedData.email);
            console.log('Password:', parsedData.password);

            // Send a response back to the client
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`Signup successful for ${parsedData.email}`);
        });
      
       
     }
})


server.listen(8780, ()=>{
    console.log("server is running on port 8780");
})