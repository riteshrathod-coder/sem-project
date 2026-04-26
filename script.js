function navigate(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  el.classList.add('active');
  if (page === 'inventory') renderInventory();
  if (page === 'orders') renderOrders();
  if (page === 'recipes') suggestRecipes();
  if (page === 'ingredients' && window.activeRec) renderEngIngredients();
}
function toggleIng(el) { el.classList.toggle('selected'); updateIngCount(); }
function updateIngCount() {
  const n = document.querySelectorAll('.ing-tag.selected').length;
  document.getElementById('ing-count').textContent = n + ' ingredient' + (n !== 1 ? 's' : '') + ' selected';
}
function clearIngredients() {
  document.querySelectorAll('.ing-tag').forEach(t => t.classList.remove('selected'));
  updateIngCount();
  document.getElementById('recipe-results').innerHTML = '';
}
let recipes = [
  { "name": "Butter Chicken", "time": "40 min", "serves": "4", "diff": "Medium", "cal": "420 kcal", "margin": "65%", "tags": ["Chicken", "Tomato", "Cream", "Butter", "Garam Masala", "Onion", "Garlic", "Ginger"], "steps": ["Marinate chicken in yogurt, chili, garam masala for 1 hour.", "Grill or tandoor-roast chicken until charred.", "Sauté butter with onions, garlic, ginger.", "Add tomato puree, cook 10 mins until thick.", "Add cream and remaining spices; simmer 8 mins.", "Fold in roasted chicken; finish with butter and kasuri methi."], "category": "Main Course", "ings": [{ "n": "Chicken", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Cream", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }] },
  { "name": "Chicken Tikka Masala", "time": "45 min", "serves": "4", "diff": "Medium", "cal": "390 kcal", "margin": "63%", "tags": ["Chicken", "Tomato", "Cream", "Yogurt", "Garam Masala", "Onion", "Garlic", "Ginger", "Chili"], "steps": ["Marinate chicken in yogurt and spices for 2 hours.", "Skewer and grill chicken tikkas until cooked.", "Make masala: sauté onion, garlic, ginger, tomatoes.", "Add spices, cook until oil separates, add cream.", "Blend masala smooth, strain, bring to simmer.", "Add tikka pieces, garnish with cream and coriander."], "category": "Main Course", "ings": [{ "n": "Chicken", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Cream", "a": "Standard portion", "c": "-" }, { "n": "Yogurt", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }] },
  { "name": "Dal Makhani", "time": "50 min", "serves": "6", "diff": "Medium", "cal": "280 kcal", "margin": "70%", "tags": ["Dal", "Butter", "Cream", "Tomato", "Onion", "Garlic", "Ginger", "Garam Masala"], "steps": ["Soak black urad dal and rajma overnight.", "Pressure cook dal until soft (4-5 whistles).", "Melt butter; sauté onions till dark golden.", "Add ginger-garlic paste; cook 3 mins.", "Add tomato puree, cook until oil separates.", "Add cooked dal, cream, garam masala; simmer 20 mins."], "category": "Main Course", "ings": [{ "n": "Dal", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Cream", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }] },
  { "name": "Palak Paneer", "time": "30 min", "serves": "4", "diff": "Easy", "cal": "310 kcal", "margin": "68%", "tags": ["Spinach", "Paneer", "Onion", "Tomato", "Cream", "Garlic", "Ginger", "Garam Masala"], "steps": ["Blanch spinach 2 mins; shock in cold water.", "Blend spinach to smooth puree.", "Sauté onions, garlic, ginger; add tomatoes.", "Add spinach puree and spices; cook 5 mins.", "Add paneer cubes and cream; simmer 5 mins.", "Season with garam masala; serve with roti."], "category": "Main Course", "ings": [{ "n": "Spinach", "a": "Standard portion", "c": "-" }, { "n": "Paneer", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Cream", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }] },
  { "name": "Chicken Biryani", "time": "60 min", "serves": "6", "diff": "Hard", "cal": "520 kcal", "margin": "60%", "tags": ["Chicken", "Rice", "Onion", "Yogurt", "Garam Masala", "Mint", "Olive Oil", "Ginger", "Garlic"], "steps": ["Marinate chicken in yogurt, fried onions, spices, mint for 2 hrs.", "Par-cook basmati rice until 70% done.", "Layer marinated chicken and rice in a heavy pot.", "Drizzle saffron milk, fried onions, ghee on top.", "Seal with foil; dum cook on low 25 mins.", "Rest 10 mins before serving."], "category": "Rice", "ings": [{ "n": "Chicken", "a": "Standard portion", "c": "-" }, { "n": "Rice", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Yogurt", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Mint", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }] },
  { "name": "Chole Bhature", "time": "45 min", "serves": "4", "diff": "Medium", "cal": "480 kcal", "margin": "72%", "tags": ["Dal", "Onion", "Tomato", "Garlic", "Ginger", "Garam Masala", "Olive Oil", "Flour"], "steps": ["Soak chickpeas overnight, pressure cook until soft.", "Fry onions until brown; add ginger-garlic paste.", "Add tomatoes, spices, cook until thick masala forms.", "Add chickpeas and water; simmer 15 mins.", "Make bhature dough with flour, yogurt, oil; rest 1 hr.", "Roll and deep fry bhature until puffed golden."], "category": "Main Course", "ings": [{ "n": "Dal", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Flour", "a": "Standard portion", "c": "-" }] },
  { "name": "Egg Curry", "time": "25 min", "serves": "4", "diff": "Easy", "cal": "290 kcal", "margin": "75%", "tags": ["Eggs", "Onion", "Tomato", "Garlic", "Ginger", "Garam Masala", "Olive Oil", "Turmeric", "Chili"], "steps": ["Hard boil eggs, peel and make slits on surface.", "Fry eggs in oil until golden; set aside.", "Sauté onions until golden.", "Add garlic, ginger paste; cook 2 mins.", "Add tomatoes, turmeric, chili, garam masala; cook until thick.", "Add eggs and water; simmer 10 mins."], "category": "Main Course", "ings": [{ "n": "Eggs", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Turmeric", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }] },
  { "name": "Aloo Gobi", "time": "25 min", "serves": "4", "diff": "Easy", "cal": "200 kcal", "margin": "78%", "tags": ["Potato", "Onion", "Tomato", "Garlic", "Ginger", "Turmeric", "Cumin", "Coriander", "Olive Oil"], "steps": ["Cut potato and cauliflower into florets.", "Heat oil; add cumin seeds, let splutter.", "Add onions, garlic, ginger; sauté 5 mins.", "Add turmeric, chili, coriander powder.", "Add potatoes; cook 5 mins, add cauliflower.", "Cover and cook on low 15 mins."], "category": "Main Course", "ings": [{ "n": "Potato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Turmeric", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Matar Paneer", "time": "30 min", "serves": "4", "diff": "Easy", "cal": "320 kcal", "margin": "66%", "tags": ["Paneer", "Tomato", "Onion", "Garlic", "Ginger", "Cream", "Garam Masala", "Olive Oil"], "steps": ["Blend onion, tomato, garlic, ginger into paste.", "Fry the paste in oil until deep brown.", "Add turmeric, chili, coriander powder; cook 2 mins.", "Add water to get gravy consistency; simmer 10 mins.", "Add paneer cubes and peas; cook 5 mins.", "Finish with cream and garam masala."], "category": "Main Course", "ings": [{ "n": "Paneer", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Cream", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Paneer Tikka", "time": "30 min", "serves": "4", "diff": "Easy", "cal": "260 kcal", "margin": "65%", "tags": ["Paneer", "Yogurt", "Onion", "Garam Masala", "Chili", "Olive Oil", "Lemon"], "steps": ["Cut paneer, capsicum, onion into cubes.", "Marinate in yogurt, spices, lemon juice for 1 hr.", "Skewer alternating paneer and vegetables.", "Grill on high heat or in oven at 220°C for 12 mins.", "Baste with butter; grill 3 more mins for char.", "Serve with mint chutney and lemon wedge."], "category": "Starter", "ings": [{ "n": "Paneer", "a": "Standard portion", "c": "-" }, { "n": "Yogurt", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Lemon", "a": "Standard portion", "c": "-" }] },
  { "name": "Chicken Seekh Kebab", "time": "25 min", "serves": "4", "diff": "Medium", "cal": "240 kcal", "margin": "62%", "tags": ["Chicken", "Onion", "Garlic", "Ginger", "Garam Masala", "Coriander", "Chili", "Olive Oil"], "steps": ["Mince chicken finely; mix with raw onion, garlic, ginger.", "Add spices, fresh coriander, chili; mix thoroughly.", "Shape onto flat skewers; pat firmly.", "Grill on tandoor or charcoal for 8-10 mins.", "Rotate every 2 mins for even cooking.", "Serve hot with onion rings and chutney."], "category": "Starter", "ings": [{ "n": "Chicken", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Samosa", "time": "45 min", "serves": "8", "diff": "Medium", "cal": "180 kcal", "margin": "80%", "tags": ["Potato", "Onion", "Garam Masala", "Cumin", "Olive Oil", "Flour", "Coriander", "Chili"], "steps": ["Make stiff dough with flour, oil, salt; rest 20 mins.", "Boil potatoes; mash with spices, peas, coriander.", "Roll dough thin; cut into semicircles.", "Fold into cone, fill with potato mixture.", "Seal edges with water; shape into triangle.", "Deep fry on medium heat until golden crispy."], "category": "Snack", "ings": [{ "n": "Potato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Flour", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }] },
  { "name": "Onion Pakoda", "time": "15 min", "serves": "4", "diff": "Easy", "cal": "150 kcal", "margin": "85%", "tags": ["Onion", "Flour", "Chili", "Cumin", "Turmeric", "Olive Oil", "Coriander"], "steps": ["Slice onions thin; add salt, chili, cumin.", "Add besan (gram flour), turmeric, coriander.", "Add minimal water to make thick batter.", "Heat oil to 180°C.", "Drop small portions into oil; fry until crispy golden.", "Drain on paper; serve with chutney."], "category": "Snack", "ings": [{ "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Flour", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Turmeric", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }] },
  { "name": "Aloo Tikki", "time": "20 min", "serves": "4", "diff": "Easy", "cal": "160 kcal", "margin": "82%", "tags": ["Potato", "Onion", "Coriander", "Cumin", "Garam Masala", "Chili", "Olive Oil"], "steps": ["Boil and mash potatoes completely smooth.", "Mix with chopped onion, green chili, coriander.", "Add garam masala, cumin, salt; mix well.", "Shape into flat round tikkis.", "Shallow fry in oil on medium heat 4 mins each side.", "Serve with tamarind and mint chutney."], "category": "Snack", "ings": [{ "n": "Potato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Tomato Coriander Soup", "time": "20 min", "serves": "4", "diff": "Easy", "cal": "90 kcal", "margin": "82%", "tags": ["Tomato", "Onion", "Garlic", "Ginger", "Coriander", "Butter", "Olive Oil"], "steps": ["Sauté onion, garlic, ginger in butter 3 mins.", "Add chopped tomatoes; cook 10 mins.", "Blend smooth; strain through sieve.", "Return to pan; add water to consistency.", "Season with salt, pepper, sugar.", "Serve hot garnished with cream and coriander."], "category": "Soup", "ings": [{ "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Chicken Soup", "time": "30 min", "serves": "6", "diff": "Easy", "cal": "120 kcal", "margin": "75%", "tags": ["Chicken", "Onion", "Garlic", "Ginger", "Coriander", "Olive Oil", "Lemon"], "steps": ["Boil chicken with onion, garlic, ginger until cooked.", "Remove chicken, shred finely.", "Strain the broth; return to heat.", "Add shredded chicken back to broth.", "Add lemon juice, coriander, black pepper.", "Serve piping hot with toasted bread."], "category": "Soup", "ings": [{ "n": "Chicken", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Lemon", "a": "Standard portion", "c": "-" }] },
  { "name": "Jeera Rice", "time": "20 min", "serves": "4", "diff": "Easy", "cal": "200 kcal", "margin": "78%", "tags": ["Rice", "Cumin", "Butter", "Olive Oil"], "steps": ["Wash basmati rice; soak 20 mins.", "Heat ghee/butter; add cumin seeds.", "Let cumin crackle until aromatic.", "Add soaked rice; stir and toast 2 mins.", "Add water (1:1.5 ratio); bring to boil.", "Cover and cook on low 12 mins; rest 5 mins."], "category": "Rice", "ings": [{ "n": "Rice", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Vegetable Pulao", "time": "30 min", "serves": "4", "diff": "Easy", "cal": "240 kcal", "margin": "75%", "tags": ["Rice", "Onion", "Potato", "Garam Masala", "Cumin", "Butter", "Olive Oil"], "steps": ["Wash and soak rice 20 mins.", "Heat ghee; add whole spices and cumin.", "Add onions; fry until golden.", "Add mixed vegetables; sauté 5 mins.", "Add rice, water; season with salt.", "Cover and cook on dum 15 mins."], "category": "Rice", "ings": [{ "n": "Rice", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Potato", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Butter Naan", "time": "30 min", "serves": "6", "diff": "Medium", "cal": "180 kcal", "margin": "80%", "tags": ["Flour", "Yogurt", "Butter", "Sugar", "Olive Oil"], "steps": ["Mix flour, yogurt, sugar, salt into soft dough.", "Rest dough covered for 30 mins.", "Divide into balls; roll into oval shape.", "Place on hot tawa or tandoor.", "Cook until bubbles appear; flip and cook 1 min.", "Brush generously with butter; serve hot."], "category": "Bread", "ings": [{ "n": "Flour", "a": "Standard portion", "c": "-" }, { "n": "Yogurt", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Sugar", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Roti / Chapati", "time": "20 min", "serves": "6", "diff": "Easy", "cal": "120 kcal", "margin": "90%", "tags": ["Flour", "Olive Oil"], "steps": ["Knead whole wheat flour with water into soft dough.", "Rest dough 15 mins.", "Roll each ball into thin 6-inch circle.", "Cook on hot tawa 1 min each side.", "Press gently with cloth to puff up.", "Apply ghee; serve immediately."], "category": "Bread", "ings": [{ "n": "Flour", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Paratha", "time": "25 min", "serves": "4", "diff": "Easy", "cal": "200 kcal", "margin": "88%", "tags": ["Flour", "Butter", "Olive Oil", "Potato"], "steps": ["Make soft dough with flour, salt, water.", "For stuffed: mix mashed potato with spices.", "Roll dough, place stuffing, fold and seal.", "Roll again gently into flat paratha.", "Cook on tawa with ghee/oil, pressing edges.", "Serve with pickle and yogurt."], "category": "Bread", "ings": [{ "n": "Flour", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Potato", "a": "Standard portion", "c": "-" }] },
  { "name": "Gulab Jamun", "time": "40 min", "serves": "8", "diff": "Medium", "cal": "250 kcal", "margin": "72%", "tags": ["Milk", "Flour", "Sugar", "Butter", "Olive Oil"], "steps": ["Mix milk powder, flour, butter into soft dough.", "Shape into small smooth balls.", "Fry on very low heat until deep brown.", "Make sugar syrup with sugar, water, cardamom.", "Drop hot jamuns into warm syrup immediately.", "Soak at least 30 mins before serving."], "category": "Dessert", "ings": [{ "n": "Milk", "a": "Standard portion", "c": "-" }, { "n": "Flour", "a": "Standard portion", "c": "-" }, { "n": "Sugar", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Kheer", "time": "35 min", "serves": "6", "diff": "Easy", "cal": "220 kcal", "margin": "74%", "tags": ["Rice", "Milk", "Sugar", "Cashews"], "steps": ["Wash and soak rice 15 mins.", "Boil milk; add soaked rice.", "Cook on low heat 20 mins, stirring frequently.", "Add sugar and cardamom powder.", "Add cashews, raisins, saffron.", "Serve hot or chilled."], "category": "Dessert", "ings": [{ "n": "Rice", "a": "Standard portion", "c": "-" }, { "n": "Milk", "a": "Standard portion", "c": "-" }, { "n": "Sugar", "a": "Standard portion", "c": "-" }, { "n": "Cashews", "a": "Standard portion", "c": "-" }] },
  { "name": "Mango Lassi", "time": "5 min", "serves": "4", "diff": "Easy", "cal": "180 kcal", "margin": "78%", "tags": ["Yogurt", "Sugar", "Milk"], "steps": ["Add chilled yogurt to blender.", "Add mango pulp (fresh or canned).", "Add sugar to taste and chilled milk.", "Blend smooth and frothy.", "Pour into tall glasses with ice.", "Garnish with saffron or mint."], "category": "Beverage", "ings": [{ "n": "Yogurt", "a": "Standard portion", "c": "-" }, { "n": "Sugar", "a": "Standard portion", "c": "-" }, { "n": "Milk", "a": "Standard portion", "c": "-" }] },
  { "name": "Masala Chai", "time": "10 min", "serves": "4", "diff": "Easy", "cal": "80 kcal", "margin": "88%", "tags": ["Milk", "Sugar", "Ginger"], "steps": ["Boil water with ginger and whole spices.", "Add tea leaves; boil 2 mins.", "Add milk; bring to rolling boil.", "Add sugar; strain into cups.", "Serve hot.", "Optionally add lemon for cutting chai."], "category": "Beverage", "ings": [{ "n": "Milk", "a": "Standard portion", "c": "-" }, { "n": "Sugar", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }] },
  { "name": "Masala Chaas", "time": "5 min", "serves": "4", "diff": "Easy", "cal": "60 kcal", "margin": "90%", "tags": ["Yogurt", "Cumin", "Coriander", "Ginger", "Mint", "Lemon"], "steps": ["Dilute yogurt with chilled water (1:2 ratio).", "Add roasted cumin powder.", "Add grated ginger, chopped coriander, mint.", "Add salt and a squeeze of lemon.", "Whisk or blend until frothy.", "Serve chilled with ice."], "category": "Beverage", "ings": [{ "n": "Yogurt", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Mint", "a": "Standard portion", "c": "-" }, { "n": "Lemon", "a": "Standard portion", "c": "-" }] },
  { "name": "Masala Omelette", "time": "10 min", "serves": "2", "diff": "Easy", "cal": "200 kcal", "margin": "82%", "tags": ["Eggs", "Onion", "Tomato", "Chili", "Coriander", "Olive Oil"], "steps": ["Beat eggs with salt and pepper.", "Add finely chopped onion, tomato, green chili.", "Add coriander leaves; mix well.", "Heat oil in non-stick pan.", "Pour egg mix; cook on medium heat.", "Fold when set; serve with toast."], "category": "Snack", "ings": [{ "n": "Eggs", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Shahi Paneer", "time": "35 min", "serves": "4", "diff": "Medium", "cal": "380 kcal", "margin": "62%", "tags": ["Paneer", "Cream", "Cashews", "Onion", "Tomato", "Garam Masala", "Butter", "Milk"], "steps": ["Soak cashews in warm water 15 mins; blend to paste.", "Sauté onions, garlic, ginger, tomatoes until soft.", "Blend onion-tomato mixture smooth.", "Return to pan; add cashew paste, cream.", "Add whole garam masala and spices.", "Add paneer; simmer 10 mins."], "category": "Main Course", "ings": [{ "n": "Paneer", "a": "Standard portion", "c": "-" }, { "n": "Cream", "a": "Standard portion", "c": "-" }, { "n": "Cashews", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Garam Masala", "a": "Standard portion", "c": "-" }, { "n": "Butter", "a": "Standard portion", "c": "-" }, { "n": "Milk", "a": "Standard portion", "c": "-" }] },
  { "name": "Paneer Bhurji", "time": "15 min", "serves": "4", "diff": "Easy", "cal": "240 kcal", "margin": "68%", "tags": ["Paneer", "Onion", "Tomato", "Chili", "Coriander", "Olive Oil", "Turmeric", "Cumin"], "steps": ["Crumble paneer coarsely.", "Heat oil; add cumin seeds.", "Sauté onions 3 mins; add green chili.", "Add tomatoes; cook until soft.", "Add turmeric, crumbled paneer; toss well.", "Finish with fresh coriander."], "category": "Snack", "ings": [{ "n": "Paneer", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Chili", "a": "Standard portion", "c": "-" }, { "n": "Coriander", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }, { "n": "Turmeric", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }] },
  { "name": "Saag Aloo", "time": "25 min", "serves": "4", "diff": "Easy", "cal": "220 kcal", "margin": "76%", "tags": ["Spinach", "Potato", "Onion", "Garlic", "Ginger", "Cumin", "Mustard Seeds", "Turmeric", "Olive Oil"], "steps": ["Blanch spinach; squeeze dry and chop.", "Boil potatoes until just tender; cube.", "Heat oil; add mustard seeds and cumin.", "Add onion, garlic, ginger; fry 4 mins.", "Add potato cubes; cook 5 mins.", "Add spinach, turmeric, spices; toss and serve."], "category": "Main Course", "ings": [{ "n": "Spinach", "a": "Standard portion", "c": "-" }, { "n": "Potato", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Mustard Seeds", "a": "Standard portion", "c": "-" }, { "n": "Turmeric", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] },
  { "name": "Palak Dal", "time": "30 min", "serves": "4", "diff": "Easy", "cal": "200 kcal", "margin": "80%", "tags": ["Dal", "Spinach", "Onion", "Garlic", "Ginger", "Tomato", "Cumin", "Mustard Seeds", "Turmeric", "Olive Oil"], "steps": ["Pressure cook dal with turmeric until soft.", "Blanch spinach; blend roughly.", "Make tadka: heat oil, add mustard, cumin.", "Add onion, garlic, ginger, tomato; fry 5 mins.", "Mix in cooked dal and spinach.", "Simmer 5 mins; season with lemon."], "category": "Main Course", "ings": [{ "n": "Dal", "a": "Standard portion", "c": "-" }, { "n": "Spinach", "a": "Standard portion", "c": "-" }, { "n": "Onion", "a": "Standard portion", "c": "-" }, { "n": "Garlic", "a": "Standard portion", "c": "-" }, { "n": "Ginger", "a": "Standard portion", "c": "-" }, { "n": "Tomato", "a": "Standard portion", "c": "-" }, { "n": "Cumin", "a": "Standard portion", "c": "-" }, { "n": "Mustard Seeds", "a": "Standard portion", "c": "-" }, { "n": "Turmeric", "a": "Standard portion", "c": "-" }, { "n": "Olive Oil", "a": "Standard portion", "c": "-" }] }
];


async function fetchRecipes() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/recipes');
    if (!response.ok) throw new Error('Network response was not ok');
    recipes = await response.json();
    console.log('Recipes loaded from backend:', recipes.length);
    syncRecipesToUI();
    // Refresh suggestions if on recipes page
    if (document.getElementById('page-recipes').classList.contains('active')) {
      suggestRecipes();
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    // Fallback or error message for user
  }
}

let activeRec = null;

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
    tHtml += activeRec.ings.map(i => '<tr><td style="padding:10px 0;"><strong>' + i.n + '</strong></td><td>' + i.a + '</td><td><span class="chip chip-orange" style="font-size:11px">' + i.c + '</span></td></tr>').join('');
  } else {
    tHtml += '<tr><td colspan="3" style="text-align:center;color:var(--text2)">No ingredient data found.</td></tr>';
  }
  tHtml += '</tbody></table><div style="font-size:12px;color:var(--text2);margin-top:16px;">Total yield: ' + activeRec.serves + ' portions · Difficulty: ' + activeRec.diff + ' · Margin: <span style="color:var(--green);font-weight:600">' + activeRec.margin + '</span></div>';
  document.getElementById('ing-rec-content').innerHTML = tHtml;
}

function suggestRecipes() {
  const selected = Array.from(document.querySelectorAll('.ing-tag.selected')).map(t => t.textContent.trim().replace(/^[^\s]+\s/, ''));
  const container = document.getElementById('recipe-results');
  // If no ingredients selected, show all recipes
  const filtered = selected.length === 0 ? recipes : recipes.filter(r =>
    selected.every(s =>
      r.tags.some(tag => tag.toLowerCase() === s.toLowerCase())
    )
  );

  window.lastScoredRecipes = filtered;
  if (filtered.length === 0) {
    container.innerHTML = '<p style="color:var(--text2)">No dishes found containing all selected ingredients.</p>';
    return;
  }

  container.innerHTML = filtered.map((r, i) => `
    <div class="recipe-card" style="position:relative">
      <div onclick="toggleRecipe(${i})" style="cursor:pointer;">
        <div class="recipe-header">
          <div>
            <div class="recipe-name">${r.name}</div>
            <div class="recipe-meta">
              <span class="chip chip-orange">⏱ ${r.time}</span>
              <span class="chip chip-blue">👥 ${r.serves} srv</span>
              <span class="chip chip-green">📈 ${r.margin}</span>
              <span class="chip chip-purple">${r.diff}</span>
            </div>
          </div>
          <span class="chip chip-green" style="font-size:13px">MATCH ✓</span>
        </div>
        <div style="font-size:12px;color:var(--text2);margin-top:8px">Uses: ${r.tags.join(' · ')}</div>
        <div class="recipe-steps" id="rsteps-${i}" onclick="event.stopPropagation()">
          <ol>${r.steps.map(s => `<li class="recipe-step">${s}</li>`).join('')}</ol>
          <div style="margin-top:10px;font-size:12px;color:var(--text2)">🔥 ${r.cal} per portion · ${r.category}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:12px;">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();selectRecipeForIngredients(${i})">📋 View Ingredients</button>
        <span style="font-size:12px;color:var(--accent);">Click anywhere to view steps ▾</span>
      </div>
    </div>
  `).join('');
}
function toggleRecipe(i) { const el = document.getElementById('rsteps-' + i); if (el) el.classList.toggle('open'); }
let staff = [
  { id: 1, name: 'Ravi Kumar', role: 'Head Chef', status: 'Active', color: 'var(--accent)' },
  { id: 2, name: 'Sneha Patil', role: 'Sous Chef', status: 'Active', color: 'var(--blue)' },
  { id: 3, name: 'Arjun Singh', role: 'Line Cook', status: 'Break', color: 'var(--green)' }
];

function updateDashboard() {
  updateAlerts();
  updateTopDishes();
  renderStaff();
}

function updateAlerts() {
  const container = document.getElementById('alerts-container');
  if (!container) return;

  let html = '';
  inventory.forEach(item => {
    if (item.qty <= item.crit) {
      html += `<div class="alert-banner danger">🚨 ${item.name} critically low — ${item.qty} ${item.unit} remaining (threshold: ${item.crit} ${item.unit})</div>`;
    } else if (item.qty <= item.thresh) {
      html += `<div class="alert-banner warning">⚠️ ${item.name} below reorder point — ${item.qty} ${item.unit} remaining</div>`;
    }
  });

  if (html === '') {
    html = `<div class="alert-banner success">✅ All essential stock levels are stable.</div>`;
  }

  container.innerHTML = html;
}

function updateTopDishes() {
  const table = document.getElementById('top-dishes-table');
  if (!table) return;

  const counts = {
    'Butter Chicken': 38,
    'Paneer Tikka': 29,
    'Dal Makhani': 24,
    'Biryani': 19
  };

  orders.forEach(o => {
    if (!o.items) return;
    const itemsList = o.items.split(', ');
    itemsList.forEach(item => {
      const cleanItem = item.split(' x')[0].trim();
      counts[cleanItem] = (counts[cleanItem] || 0) + 1;
    });
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const colors = ['chip-green', 'chip-blue', 'chip-orange', 'chip-purple'];
  table.innerHTML = sorted.map(([name, count], i) => `
    <tr>
      <td>${name}</td>
      <td><span class="chip ${colors[i % 4]}">${count} orders</span></td>
    </tr>
  `).join('');
}

function renderStaff() {
  const container = document.getElementById('staff-container');
  if (!container) return;

  container.innerHTML = staff.map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div style="display:flex;gap:10px;align-items:center">
        <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,${s.color},#fbbf24);display:grid;place-items:center;font-weight:700;font-size:12px">${s.name[0]}</div>
        <div>
          <div style="font-size:13px;font-weight:600">${s.name}</div>
          <div style="font-size:11px;color:var(--text2)">${s.role}</div>
        </div>
      </div>
      <span class="chip ${s.status === 'Active' ? 'chip-green' : 'chip-yellow'}">${s.status}</span>
    </div>
  `).join('');
}

function showStaffModal() {
  const list = document.getElementById('staff-edit-list');
  list.innerHTML = staff.map((s, i) => `
    <div style="background:var(--surface2);padding:12px;border-radius:8px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <div>
          <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px">Name</label>
          <input type="text" class="input" style="padding:4px 8px;font-size:12px;" value="${s.name}" onchange="staff[${i}].name=this.value">
        </div>
        <div>
          <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px">Role</label>
          <input type="text" class="input" style="padding:4px 8px;font-size:12px;" value="${s.role}" onchange="staff[${i}].role=this.value">
        </div>
      </div>
      <div>
        <label style="font-size:11px;color:var(--text2);display:block;margin-bottom:4px">Status</label>
        <select class="input" style="padding:4px 8px;font-size:12px;" onchange="staff[${i}].status=this.value">
          <option value="Active" ${s.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Break" ${s.status === 'Break' ? 'selected' : ''}>Break</option>
          <option value="Off Duty" ${s.status === 'Off Duty' ? 'selected' : ''}>Off Duty</option>
        </select>
      </div>
    </div>
  `).join('');
  document.getElementById('modal-staff').style.display = 'flex';
}

function saveStaffChanges() {
  renderStaff();
  document.getElementById('modal-staff').style.display = 'none';
}

const inventory = [

  { name: 'Chicken', qty: 18, unit: 'kg', max: 30, thresh: 5, crit: 2 },
  { name: 'Tomatoes', qty: 2.5, unit: 'kg', max: 20, thresh: 5, crit: 2 },
  { name: 'Onions', qty: 12, unit: 'kg', max: 25, thresh: 4, crit: 1 },
  { name: 'Rice', qty: 22, unit: 'kg', max: 40, thresh: 8, crit: 3 },
  { name: 'Dal', qty: 15, unit: 'kg', max: 25, thresh: 5, crit: 2 },
  { name: 'Olive Oil', qty: 1.2, unit: 'L', max: 10, thresh: 2, crit: 1 },
  { name: 'Cream', qty: 4, unit: 'L', max: 10, thresh: 2, crit: 0.5 },
  { name: 'Garlic', qty: 3, unit: 'kg', max: 8, thresh: 1.5, crit: 0.5 },
  { name: 'Garam Masala', qty: 0.8, unit: 'kg', max: 3, thresh: 0.5, crit: 0.2 },
  { name: 'Butter', qty: 5, unit: 'kg', max: 10, thresh: 2, crit: 0.5 },
];
function renderInventory() {
  let lowStockCount = 0;
  document.getElementById('inventory-list').innerHTML = inventory.map((item, i) => {
    const pct = Math.min(100, (item.qty / item.max) * 100);
    let status, color;
    if (item.qty <= item.crit) { status = 'CRITICAL'; color = 'var(--red)'; lowStockCount++; }
    else if (item.qty <= item.thresh) { status = 'LOW'; color = 'var(--yellow)'; lowStockCount++; }
    else { status = 'OK'; color = 'var(--green)'; }
    return `<div class="inv-row"><div class="inv-name">${item.name}</div><div class="inv-qty">${item.qty} ${item.unit}</div><div class="inv-bar-wrap"><div class="progress-wrap"><div class="progress-bar" style="width:${pct}%;background:${color}"></div></div></div><div class="inv-status"><span class="chip" style="background:${color}22;color:${color};border:1px solid ${color}44">${status}</span></div><div class="inv-actions"><button class="btn btn-ghost btn-sm" onclick="quickRestock(${i})">+5</button></div></div>`;
  }).join('');

  // Dynamic updates
  const tItems = document.getElementById('inv-total-items');
  if (tItems) tItems.textContent = inventory.length;
  const lStock = document.getElementById('inv-low-stock');
  if (lStock) lStock.textContent = lowStockCount;
  const dLow = document.getElementById('dash-low-stock');
  if (dLow) dLow.textContent = lowStockCount; updateDashboard();

}
function quickRestock(i) { inventory[i].qty = Math.min(inventory[i].max, inventory[i].qty + 5); renderInventory(); }
function logTransaction() {
  const item = document.getElementById('txn-item').value;
  const type = document.getElementById('txn-type').value;
  const qty = parseFloat(document.getElementById('txn-qty').value);
  if (!qty || qty <= 0) { alert('Please enter a valid quantity.'); return; }
  const inv = inventory.find(i => i.name === item);
  if (inv) { if (type === 'add') inv.qty = Math.min(inv.max, inv.qty + qty); else inv.qty = Math.max(0, inv.qty - qty); renderInventory(); }
  const fb = document.getElementById('txn-feedback');
  fb.style.display = 'block';
  fb.textContent = `✅ ${type === 'add' ? 'Added' : 'Deducted'} ${qty} from ${item}`;
  setTimeout(() => fb.style.display = 'none', 3000);
  document.getElementById('txn-qty').value = '';
}
let orders = [
  { id: '#T-01', table: 'Table 1', items: 'Butter Chicken, Rice, Naan', time: '08:12', status: 'pending' },
  { id: '#T-02', table: 'Table 3', items: 'Dal Makhani, Tandoori Roti', time: '08:24', status: 'pending' },
  { id: '#T-03', table: 'Table 7', items: 'Paneer Tikka, Mango Lassi', time: '08:31', status: 'prep' },
  { id: '#T-04', table: 'Table 2', items: 'Chicken Biryani x2', time: '08:45', status: 'prep' },
  { id: '#T-05', table: 'Table 5', items: 'Masala Dosa, Filter Coffee', time: '08:50', status: 'prep' },
  { id: '#T-06', table: 'Table 9', items: 'Gulab Jamun x3', time: '09:00', status: 'ready' },
  { id: '#T-07', table: 'Table 4', items: 'Soup, Salad Combo', time: '09:05', status: 'ready' },
  { id: '#T-08', table: 'Table 6', items: 'Chicken Kathi Roll', time: '09:10', status: 'pending' },
  { id: '#T-09', table: 'Table 7', items: 'Chicken', time: '09:10', status: 'pending' }
];
let orderCounter = 9;
function renderOrders() {
  const cols = { pending: { label: '⏳ Pending', cls: 'pending', next: 'prep', nextLabel: 'Start Prep' }, prep: { label: '🔥 In Preparation', cls: 'prep', next: 'ready', nextLabel: 'Mark Ready' }, ready: { label: '✅ Ready to Serve', cls: 'ready', next: null, nextLabel: 'Served' } };
  document.getElementById('order-board').innerHTML = Object.keys(cols).map(status => {
    const col = cols[status], colOrders = orders.filter(o => o.status === status);
    return `<div><div class="order-col-header ${col.cls}">${col.label} (${colOrders.length})</div>${colOrders.map(o => `<div class="order-ticket"><div class="order-ticket-id">${o.id} · ${o.time}</div><div class="order-ticket-name">${o.table}</div><div class="order-ticket-items">${o.items}</div><div class="order-ticket-footer">${col.next ? `<button class="btn btn-primary btn-sm" onclick="advanceOrder('${o.id}','${col.next}')">${col.nextLabel} →</button>` : `<span class="chip chip-green" onclick="clearReadyOrder('${o.id}')" style="cursor:pointer;" title="Click to clear">Served ✓</span>`}</div></div>`).join('')}</div>`;
  }).join('');
  document.getElementById('order-summary').textContent = orders.length + ' active orders today';

  // Dynamic Dashboard Sync
  const dashOrders = document.getElementById('dash-active-orders');
  if (dashOrders) {
    const active = orders.slice().reverse(); // Get all active orders, newest first
    dashOrders.innerHTML = active.map(o => {
      let chipCls = 'chip-yellow', chipTxt = 'PENDING';
      if (o.status === 'prep') { chipCls = 'chip-blue'; chipTxt = 'IN PREP'; }
      if (o.status === 'ready') { chipCls = 'chip-green'; chipTxt = 'READY'; }
      return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:var(--surface2);border-radius:8px"><div style="overflow:hidden;"><div style="font-size:13px;font-weight:600">${o.id} — ${o.table}</div><div style="font-size:11px;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px;">${o.items}</div></div><span class="chip ${chipCls}">${chipTxt}</span></div>`;
    }).join('') || '<div style="font-size:13px;color:var(--text2);text-align:center;padding:10px;">No active orders.</div>';
  }
  const tOrders = document.getElementById('dash-orders-total');
  if (tOrders) tOrders.textContent = (147 - 8) + orders.length; updateDashboard();

}

function clearReadyOrder(id) {
  orders = orders.filter(o => o.id !== id);
  renderOrders();
}
function advanceOrder(id, status) { const o = orders.find(x => x.id === id); if (o) o.status = status; renderOrders(); }
function clearReadyOrders() { orders = orders.filter(o => o.status !== 'ready'); renderOrders(); }
function syncRecipesToUI() {
  // Update Dishes array
  if (typeof dishes !== 'undefined') {
    dishes.length = 0;
    recipes.forEach(r => dishes.push(r.name));
  }

  // Update Order Items Select
  const orderSelect = document.getElementById('no-items');
  if (orderSelect) {
    orderSelect.innerHTML = recipes.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
  }

  // Update Menu Planner Table
  const menuTable = document.getElementById('menu-table-body');
  if (menuTable) {
    menuTable.innerHTML = recipes.map(r => {
      // Create stable pseudo-random prices based on recipe name length/charcodes
      const seed = r.name.length + r.name.charCodeAt(0);
      const price = 150 + (seed % 350);
      const marginVal = parseInt(r.margin) || 65;
      const cost = Math.floor(price * (1 - marginVal / 100));

      let catCls = 'chip-orange';
      if (r.category === 'Starter') catCls = 'chip-purple';
      if (r.category === 'Dessert') catCls = 'chip-yellow';
      if (r.category === 'Beverage') catCls = 'chip-blue';

      return `
        <tr>
          <td><strong>${r.name}</strong></td>
          <td><span class="chip ${catCls}">${r.category}</span></td>
          <td>₹${cost}</td>
          <td>₹${price}</td>
          <td><span class="chip chip-green">${r.margin}</span></td>
        </tr>
      `;
    }).join('');
  }
}

const dishes = ['Butter Chicken', 'Dal Makhani', 'Paneer Tikka', 'Biryani', 'Gulab Jamun', 'Mango Lassi', 'Naan x3', 'Soup'];
const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10'];
function addOrder() {
  const activeTables = orders.map(o => o.table);
  const select = document.getElementById('no-table');
  select.innerHTML = tables
    .filter(t => !activeTables.includes(t))
    .map(t => `<option value="${t}">${t}</option>`)
    .join('');

  if (select.children.length === 0) {
    alert('All tables are currently occupied! Clear some completed orders first.');
    return;
  }

  const orderItemsSelect = document.getElementById('no-items');
  if (orderItemsSelect) {
    orderItemsSelect.innerHTML = recipes.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
  }

  document.getElementById('modal-new-order').style.display = 'flex';

}
function submitNewOrder() {
  const table = document.getElementById('no-table').value;
  const select = document.getElementById('no-items');
  const items = Array.from(select.selectedOptions).map(opt => opt.value);
  if (items.length === 0) { alert('Please select at least one item from the menu.'); return; }
  const now = new Date();
  orders.push({ id: '#T-' + String(orderCounter++).padStart(2, '0'), table: table, items: items.join(', '), time: now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0'), status: 'pending' });
  renderOrders();
  document.getElementById('modal-new-order').style.display = 'none';
  select.selectedIndex = -1; // reset
}
function addMenuItem() {
  const name = document.getElementById('menu-dish').value.trim();
  const cost = document.getElementById('menu-cost').value;
  const price = document.getElementById('menu-price').value;
  const cat = document.getElementById('menu-cat').value;
  const time = document.getElementById('menu-time').value || "20 min";

  if (!name || !cost || !price) { alert('Please fill all fields.'); return; }

  const margin = Math.round(((price - cost) / price) * 100);

  // Add to local recipes array
  recipes.push({
    name: name,
    category: cat,
    time: time.includes('min') ? time : time + " min",
    margin: margin + "%",
    serves: "4",
    diff: "Easy",
    cal: "250 kcal",
    tags: [name],
    steps: ["Steps for " + name + " not provided."],
    ings: []
  });

  syncRecipesToUI();
  suggestRecipes();

  const fb = document.getElementById('menu-feedback');
  fb.style.display = 'block';
  fb.textContent = `✅ "${name}" added — Margin: ${margin}%`;

  document.getElementById('menu-dish').value = '';
  document.getElementById('menu-cost').value = '';
  document.getElementById('menu-price').value = '';
  setTimeout(() => fb.style.display = 'none', 3000);
}

function showApp() {
  updateAuthUI();
  // document.getElementById('auth-wrap').style.display = 'none'; // No longer needed as we use separate pages
  const shell = document.getElementById('app-shell');
  if (shell) shell.style.display = 'grid';
}

function updateAuthUI() {
  let name = 'Kitchen Assistant Admin';
  let email = 'admin@gmail.com';
  let kid = 'KIT-#0042';
  let location = 'Nashik, Maharashtra';
  let cuisine = 'Indian';

  const savedAcc = localStorage.getItem('chefOS_account');
  if (savedAcc) {
    const acc = JSON.parse(savedAcc);
    name = acc.name || name;
    email = acc.email || email;
    kid = acc.kid || kid;
    location = acc.location || location;
    cuisine = acc.cuisine || cuisine;
  }

  const kidEl = document.getElementById('display-kid');
  if (kidEl) kidEl.textContent = kid;

  const nameEl = document.getElementById('pd-name');
  if (nameEl) nameEl.textContent = name;

  const emailEl = document.getElementById('pd-email');
  if (emailEl) emailEl.textContent = email;

  const dk = document.getElementById('display-kname');
  if (dk) dk.textContent = name;

  const sn = document.getElementById('setting-name');
  if (sn) sn.value = name;
  const sk = document.getElementById('setting-kid');
  if (sk) sk.value = kid;
  const sl = document.getElementById('setting-location');
  if (sl) sl.value = location;
  const sc = document.getElementById('setting-cuisine');
  if (sc) sc.value = cuisine;

  const pdLoc = document.getElementById('pd-location');
  if (pdLoc) pdLoc.textContent = location;
  const pdCui = document.getElementById('pd-cuisine');
  if (pdCui) pdCui.textContent = cuisine;

  // Create avatar initials
  const parts = name.split(' ');
  const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : name.substring(0, 2);
  const avatarEl = document.getElementById('display-avatar');
  if (avatarEl) avatarEl.textContent = initials.toUpperCase();
}

function saveProfile(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('setting-name').value.trim();
  const location = document.getElementById('setting-location').value.trim();
  const cuisine = document.getElementById('setting-cuisine').value;

  if (!name || !location) {
    alert('Name and Location are required.');
    return;
  }

  const savedAcc = localStorage.getItem('chefOS_account');
  let acc = savedAcc ? JSON.parse(savedAcc) : {};

  acc.name = name;
  acc.location = location;
  acc.cuisine = cuisine;

  localStorage.setItem('chefOS_account', JSON.stringify(acc));
  updateAuthUI();

  // Show a nice feedback
  const btn = e.target;
  const originalText = btn.textContent;
  btn.textContent = '✅ Saved!';
  btn.style.background = 'var(--green)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 2000);
}

// Close dropdown on click outside
window.addEventListener('click', function (e) {
  if (!e.target.closest('#display-avatar') && !e.target.closest('#profile-dropdown')) {
    const pd = document.getElementById('profile-dropdown');
    if (pd) pd.classList.remove('show');
  }
});

window.onload = function () {
  showApp();
  syncRecipesToUI(); // Sync local fallback first
  fetchRecipes();
  renderInventory();
  renderOrders();
  suggestRecipes();
  updateDashboard();
};

