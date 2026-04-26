const fs = require('fs');

const index1 = fs.readFileSync('index1.html', 'utf8');
const recipeMatch = index1.match(/const recipes=\[\s*([\s\S]*?)\s*\];/);
if (!recipeMatch) {
  console.log('Could not find recipes in index1');
  process.exit(1);
}

let recipes;
eval('recipes = [' + recipeMatch[1] + '];');

recipes = recipes.map(r => {
  r.category = r.cat;
  delete r.cat;
  
  if (!r.ings) {
    r.ings = r.tags.map(t => ({ n: t, a: 'Standard portion', c: '-' }));
  }
  
  return r;
});

let recipesStr = 'const recipes = [\n' + recipes.map(r => '  ' + JSON.stringify(r)).join(',\n') + '\n];';

const indexFull = fs.readFileSync('index.html', 'utf8');
// match const recipes = [ ... ]; and replace
const newIndex = indexFull.replace(/const recipes = \[[\s\S]*?\n\];/, recipesStr);
fs.writeFileSync('index.html', newIndex);
console.log('Updated recipes in index.html');
