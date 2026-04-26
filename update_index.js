const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Sidebar
html = html.replace(
  /<div class="nav-item" onclick="navigate\('inventory',this\)"><span class="nav-icon">📦<\/span> Inventory <span class="nav-badge yellow">3<\/span><\/div>/,
  '<div class="nav-item" onclick="navigate(`ingredients`,this)"><span class="nav-icon">🥕</span> Ingredients</div>\n    <div class="nav-item" onclick="navigate(`inventory`,this)"><span class="nav-icon">📦</span> Inventory <span class="nav-badge yellow">3</span></div>'
);

// Page content
html = html.replace(
  /<!-- ANALYTICS -->/,
  `<!-- INGREDIENTS -->\n    <div class="page" id="page-ingredients">\n      <div class="page-header"><h1>Ingredients</h1><p>Select a recipe to view its full ingredient breakdown.</p></div>\n      <div class="card">\n        <div class="card-title" id="ing-recipe-name">No recipe selected</div>\n        <div id="ing-rec-content">\n          <p style="font-size:13px;color:var(--text2);">Go to Recipe Suggestions and select a recipe to see ingredients here.</p>\n        </div>\n      </div>\n    </div>\n\n    <!-- ANALYTICS -->`
);

// Navigate JS
html = html.replace(
  /if \(page === 'recipes'\) suggestRecipes\(\);/,
  "if (page === 'recipes') suggestRecipes();\n  if (page === 'ingredients' && window.activeRec) renderEngIngredients();"
);

// suggestRecipes JS
const suggestHtml = `let activeRec = null;

function selectRecipeForIngredients(rIndex) {
  if (window.lastScoredRecipes && window.lastScoredRecipes[rIndex]) {
    activeRec = window.lastScoredRecipes[rIndex];
    navigate('ingredients', document.querySelectorAll('.nav-item')[3]);
    renderEngIngredients();
  }
}

function renderEngIngredients() {
  if (!activeRec) return;
  document.getElementById('ing-recipe-name').textContent = 'Ingredients — ' + activeRec.name;
  let tHtml = '<table class="tbl" style="margin-top:10px;width:100%;text-align:left;"><thead><tr style="border-bottom:1px solid var(--border);color:var(--text2);font-size:12px;"><th style="padding-bottom:8px;">Ingredient</th><th style="padding-bottom:8px;">Amount</th><th style="padding-bottom:8px;">Calories</th></tr></thead><tbody>';
  if (activeRec.ings && activeRec.ings.length > 0) {
    tHtml += activeRec.ings.map(i => '<tr><td style="padding:10px 0;"><strong>'+i.n+'</strong></td><td>'+i.a+'</td><td><span class="chip chip-orange" style="font-size:11px">'+i.c+'</span></td></tr>').join('');
  } else {
    tHtml += '<tr><td colspan="3" style="text-align:center;color:var(--text2)">No ingredient data found.</td></tr>';
  }
  tHtml += '</tbody></table><div style="font-size:12px;color:var(--text2);margin-top:16px;">Total yield: '+activeRec.serves+' portions · Difficulty: '+activeRec.diff+' · Margin: <span style="color:var(--green);font-weight:600">'+activeRec.margin+'</span></div>';
  document.getElementById('ing-rec-content').innerHTML = tHtml;
}

function suggestRecipes() {`;

html = html.replace(/function suggestRecipes\(\) \{/, suggestHtml);

html = html.replace(
  /const container = document.getElementById\('recipe-results'\);[\s\S]*?container\.innerHTML = scored.*?join\(''\);/,
  `const container = document.getElementById('recipe-results');
  if (selected.length === 0) { container.innerHTML = '<p style="font-size:14px;color:var(--text2)">Select ingredients above to see suggestions.</p>'; return; }
  const scored = recipes.map(r => ({ ...r, score: r.tags.filter(t => selected.some(s => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase()))).length })).filter(r => r.score > 0).sort((a,b) => b.score - a.score);
  window.lastScoredRecipes = scored;
  if (scored.length === 0) { container.innerHTML = '<p style="color:var(--text2)">No matching recipes found.</p>'; return; }
  container.innerHTML = scored.map((r,i) => '<div class="recipe-card" style="position:relative"><div onclick="toggleRecipe('+i+')" style="cursor:pointer;"><div class="recipe-header"><div><div class="recipe-name">'+r.name+'</div><div class="recipe-meta"><span class="chip chip-orange">⏱ '+r.time+'</span><span class="chip chip-blue">👥 '+r.serves+' srv</span><span class="chip chip-green">📈 '+r.margin+'</span><span class="chip chip-purple">'+r.diff+'</span></div></div><span class="chip chip-green" style="font-size:13px">'+r.score+'/'+r.tags.length+' ✓</span></div><div style="font-size:12px;color:var(--text2);margin-top:8px">Uses: '+r.tags.join(' · ')+'</div><div class="recipe-steps" id="rsteps-'+i+'" onclick="event.stopPropagation()"><ol>'+r.steps.map(s => '<li class="recipe-step">'+s+'</li>').join('')+'</ol><div style="margin-top:10px;font-size:12px;color:var(--text2)">🔥 '+r.cal+' per portion · '+r.category+'</div></div></div><div style="display:flex;align-items:center;gap:12px;margin-top:12px;"><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();selectRecipeForIngredients('+i+')">📋 View Ingredients</button><span style="font-size:12px;color:var(--accent);">Click anywhere to view steps ▾</span></div></div>').join('');`
);

fs.writeFileSync('index.html', html);
console.log('Successfully injected Ingredients functionality!');
