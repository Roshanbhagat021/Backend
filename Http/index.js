const http  = require("http")
const fs = require("fs")



const app = http.createServer((req,res)=>{
    if (req.method == "GET"){
       
        switch (req.url){
            case "/":
                res.end("Welcome to Home Page")
                break
            case "/aboutus":
                res.writeHead(200,{"Content-Type":"text/html"})
                res.write("<h1>Welcome to About Page</h1>")
                res.end()
                break
            case "/contactus":
                res.writeHead(200,{"Content-Type":"text/html"})  
                res.write("<a target='_blank' href='https://www.masaischool.com/'>Contact us at www.masaischool.com</a>")  
                res.end()
                break
            case "/index":
                fs.readFile("./index.js","utf8", (err,data)=>{
                    if(err){
                        res.write("Something went wrong")
                        console.log({"error":err});
                        res.end()
                    }else{
                        res.write(data)
                        console.log({"data":data});
                        res.end()
                    }
                })
                break
            default:{
                res.writeHead(404,{'Content-Type': 'text/plain'})
               
                res.write("404 Not Found")
                res.end()
            }   
                    
        }
    }
})

app.listen(3000,()=>{
    console.log("server is running on port 3300");
})