const http  = require("http")



const app = http.createServer((req,res)=>{
    console.log('res: ', res);
    console.log('req: ', req);
    res.end("Hello")
    
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})