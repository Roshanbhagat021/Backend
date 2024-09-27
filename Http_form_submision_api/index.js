const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Helper function to serve the signup form
const serveSignupForm = (res) => {
    const form = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Signup</title>
    </head>
    <body>
        <h2>Signup Form</h2>
        <form method="POST" action="/signup">
            <label for="username">Username:</label><br/>
            <input type="text" id="username" name="username" required><br/><br/>
            <label for="password">Password:</label><br/>
            <input type="password" id="password" name="password" required><br/><br/>
            <button type="submit">Signup</button>
        </form>
    </body>
    </html>
  `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(form);
};

// Helper function to handle signup data
const handleSignup = (req, res) => {
    let body = '';

    // Collect data chunks
    req.on('data', chunk => {
        body += chunk.toString();
        // To prevent DOS attacks with large POST bodies
        if (body.length > 1e6) {
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        const parsedData = querystring.parse(body);
        const { username, password } = parsedData;

        if (!username || !password) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Username and password are required.');
            return;
        }

        const user = { username, password };
        const userString = JSON.stringify(user) + '\n';

        // Append the user data to user.txt
        fs.appendFile('user.txt', userString, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            // Respond with a thank you message
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Thank You for Signup...!!!');
        });
    });
};

// Helper function to display all users
const displayAllUsers = (res) => {
    fs.readFile('user.txt', 'utf8', (err, data) => {
        if (err) {
            // If file doesn't exist, assume no users
            if (err.code === 'ENOENT') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('No users found.');
                return;
            } else {
                console.error('Error reading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
        }

        const users = data.split('\n').filter(line => line.trim() !== '').map(line => {
            try {
                return JSON.parse(line);
            } catch (e) {
                return null;
            }
        }).filter(user => user !== null);

        const usernames = users.map(user => user.username);

        // Create an HTML list of usernames
        const userList = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>All Users</title>
      </head>
      <body>
          <h2>Registered Users</h2>
          <ul>
              ${usernames.map(username => `<li>${username}</li>`).join('')}
          </ul>
      </body>
      </html>
    `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(userList);
    });
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/signup') {
        if (req.method === 'GET') {
            serveSignupForm(res);
        } else if (req.method === 'POST') {
            handleSignup(req, res);
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    } else if (pathname === '/allusers' && req.method === 'GET') {
        displayAllUsers(res);
    } else {
        // Handle 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server on port 8080
const PORT = 8899;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
