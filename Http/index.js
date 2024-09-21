const http = require("http")
const fs = require("fs")



const app = http.createServer((req, res) => {
    console.log(req.headers);
    res.setHeader("X-Myname", "Roshan")
    if (req.method == "GET") {
        switch (req.url) {
            case "/":
                res.end("Welcome to Home Page")
                break
            case "/aboutus":
                res.writeHead(200, { "Content-Type": "text/html" })
                res.write("<h1>Welcome to About Page</h1>")
                res.end()
                break
            case "/contactus":
                res.writeHead(200, { "Content-Type": "text/html" })
                res.write("<a target='_blank' href='https://www.masaischool.com/'>Contact us</a>")
                res.end()
                break
            case "/index":
                fs.readFile("./index.js", "utf8", (err, data) => {
                    if (err) {
                        res.write("Something went wrong")
                        console.log({ "error": err });
                        res.end()
                    } else {
                        res.write(data)
                        console.log({ "data": data });
                        res.end()
                    }
                })
                break
            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' })

                res.write("404 Not Found")
                res.end()
            }

        }
    }

    if (req.method == "POST") {
        console.log(req.body);
        switch (req.url) {
            case "/signup":
                fs.readFile("./index.html", 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500)
                        res.write({ err: "Something went wrong in server please try agina later...." })
                        res.end()

                    } else {
                        res.writeHead(200, { "Content-Type": "text/html" })
                        res.write(data)
                        res.end()
                    }
                })
                break

            case "/p":
                res.end('wow')    

        }

    }



})

app.listen(3400, () => {
    console.log("server is running on port 3300");
})