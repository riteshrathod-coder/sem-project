const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Name changes
html = html.replace(/Citchen Assistant/g, 'Kitchen Assistant');

// 2. Logo icon changes
html = html.replace(/🍳/g, '🧁');

// Ensure Kitchen Assistant is properly set in default Auth names too
html = html.replace(/Citchen Assistant Admin/g, 'Kitchen Assistant Admin');

fs.writeFileSync('index.html', html);
console.log("Successfully renamed to Kitchen Assistant and updated logo to cupcake.");
