const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Title
html = html.replace(
  '<title>ChefOS — Smart Cooking Assistant</title>',
  '<title>Citchen Assistant</title>'
);

// 2. Logo texts
html = html.replace(/<span>ChefOS<\/span>/g, '<span>Citchen Assistant</span>');

// 3. Dynamic Kitchen Name placeholder (replace default subtitle)
html = html.replace(
  '<div style="margin-left:24px;font-size:13px;color:var(--text2)">Smart Cooking Assistant for Commercial Kitchens</div>',
  '<div id="display-kname" style="margin-left:24px;font-size:13px;color:var(--text2)">Citchen Assistant</div>'
);

// 4. Update UI binding in updateAuthUI()
if (!html.includes('display-kname')) {
  // if previous replace failed, this might not exist, but let's try safely:
}

html = html.replace(
  "document.getElementById('pd-email').textContent = email;",
  "document.getElementById('pd-email').textContent = email;\n  const dk = document.getElementById('display-kname');\n  if (dk) dk.textContent = name;"
);

// Also change the login subtitle if it referenced ChefOS
html = html.replace(
  "let name = 'ChefOS Admin';",
  "let name = 'Citchen Assistant Admin';"
);

fs.writeFileSync('index.html', html);
console.log("Replaced identifiers successfully.");
