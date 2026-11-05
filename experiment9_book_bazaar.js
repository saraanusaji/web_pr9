
const http = require('http');

const books = [
  { name: 'The Alchemist', author: 'Paulo Coelho',
    category: 'Fiction', price: 150 },
  { name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam',
    category: 'Biography', price: 200 },
  { name: 'Atomic Habits', author: 'James Clear',
    category: 'Self-help', price: 250 }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch]);
}

function page(title, content, req, status) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} - Book Bazaar</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  font: 16px Arial, sans-serif;
  color: #3b2b20;
  background: #f7f1e8;
  line-height: 1.6;
}
header {
  background: #5b3924;
  color: white;
  padding: 22px 24px;
  border-bottom: 4px solid #c49a6c;
}
header h1 { margin: 0; }
nav {
  background: #fffaf2;
  padding: 12px 24px;
  border-bottom: 1px solid #ddd;
}
nav a {
  margin-right: 15px;
  color: #6b4423;
  text-decoration: none;
  padding: 6px 12px;
}
nav a:hover { background: #ead9c3; }
main {
  max-width: 960px;
  margin: 25px auto;
  padding: 0 20px;
}
section {
  background: white;
  padding: 22px;
  border: 1px solid #e0d2c1;
  border-radius: 8px;
  margin-bottom: 20px;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
article {
  background: #fffaf2;
  border: 1px solid #e0d2c1;
  border-top: 4px solid #a47551;
  padding: 16px;
  border-radius: 6px;
}
article h3 { margin-top: 0; }
.price { color: #6b4423; font-weight: bold; }
.request {
  width: 100%;
  border-collapse: collapse;
}
.request th, .request td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.request th { background: #f3e7d7; }
footer {
  text-align: center;
  padding: 15px;
  color: #6b4423;
}
@media (max-width: 650px) {
  .products { grid-template-columns: 1fr; }
}
</style>
</head>
<body>
<header><h1>📚 Book Bazaar</h1>
<p>Give Books a Second Life!</p></header>
<nav>
<a href="/">Home</a>
<a href="/about">About</a>
</nav>
<main>
<section>${content}</section>
<section>
<h2>Request Details</h2>
<table class="request">
<tr><th>Request URL</th>
<td>${escapeHtml(req.url)}</td></tr>
<tr><th>Request Method</th>
<td>${escapeHtml(req.method)}</td></tr>
<tr><th>Response Status</th>
<td>${status}</td></tr>
</table>
</section>
</main>
<footer>Book Bazaar | Second-Hand Book Store</footer>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const path = req.url.split('?')[0];
  let status = 200;
  let title;
  let content;

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    status = 405;
    title = 'Method Not Allowed';
    content = '<h2>405 - Method Not Allowed</h2>' +
      '<p>This page supports GET and HEAD requests.</p>';
    res.setHeader('Allow', 'GET, HEAD');

  } else if (path === '/' || path === '/home') {
    title = 'Home';

    const cards = books.map(book => `
      <article>
        <h3>📖 ${escapeHtml(book.name)}</h3>
        <p>Author: ${escapeHtml(book.author)}</p>
        <p>Category: ${escapeHtml(book.category)}</p>
        <p class="price">Rs. ${book.price}</p>
        <p>Second-hand | Affordable Reading</p>
      </article>
    `).join('');

    content = '<h2>Welcome to Book Bazaar!</h2>' +
      '<p>Discover pre-loved books at affordable prices.</p>' +
      '<div class="products">' + cards + '</div>';

  } else if (path === '/about') {
    title = 'About';
    content = '<h2>About Book Bazaar</h2>' +
      '<p>Book Bazaar is a second-hand bookstore where ' +
      'readers can discover affordable pre-loved books.</p>' +
      '<p>Our mission is to encourage reading, ' +
      'reuse books and reduce waste.</p>';

  } else {
    status = 404;
    title = 'Page Not Found';
    content = '<h2>404 - Page Not Found</h2>' +
      '<p>The requested page is unavailable.</p>' +
      '<p><a href="/">Return to Home</a></p>';
  }

  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  res.end(req.method === 'HEAD'
    ? undefined
    : page(title, content, req, status));

  console.log(`${req.method} ${req.url} -> ${status}`);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Book Bazaar server running at http://localhost:3000');
});
