const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const usersPath = path.join(dataDir, 'users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function handleLogin(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    const params = new URLSearchParams(body);
    const username = params.get('username');
    const password = params.get('password');
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.writeHead(302, { 'Location': '/index.html', 'Set-Cookie': 'login=true' });
      res.end();
    } else {
      res.writeHead(302, { 'Location': '/login.html?error=1' });
      res.end();
    }
  });
}

function isLoggedIn(req) {
  const cookies = req.headers.cookie || '';
  return cookies.split(';').some(c => c.trim() === 'login=true');
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  if (req.method === 'POST' && parsed.pathname === '/login') {
    return handleLogin(req, res);
  }

  if (!isLoggedIn(req) && parsed.pathname !== '/login.html' && parsed.pathname !== '/login') {
    res.writeHead(302, { 'Location': '/login.html' });
    return res.end();
  }

  let filePath = path.join(publicDir, parsed.pathname);
  if (parsed.pathname === '/') {
    filePath = path.join(publicDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
  };
  const contentType = contentTypes[ext] || 'text/plain';
  serveFile(res, filePath, contentType);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
