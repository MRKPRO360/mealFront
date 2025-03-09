export async function generateMetadata({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { recipeId } = await params;

  const { data } = await getSingleRecipe(recipeId);
  return {
    title: data.recipeName,
    description: data.description,
  };
}

/* 

  // dynamic ingredint image
    
    const ingredientImages = {
  "Sweet Potatoes": "/images/ingredients/sweet-potatoes.png",
  "Chicken Cutlets": "/images/ingredients/chicken-cutlets.png",
};
    <img
  src={ingredientImages[ingredient.name]}
  alt={ingredient.name}
  style={{ width: '100px', height: '100px' }}
/>; */

// "Sweet Potatoes",
//   "Chicken Cutlets",
//   "Panko Breadcrumbs",
//   "Fry Seasoning",
//   "Sour Cream",
//   "Green Beans",
//   "Maple Syrup",
//   "Chili Flakes",
//   "Olive Oil",
//   "Butter",
//   "Salt",
//   "Pepper",

//   "Garlic",
//   "Onion",
//   "Tomatoes",
//   "Bell Peppers",
//   "Carrots",
//   "Broccoli",
//   "Zucchini",
//   "Spinach",
//   "Kale",
//   "Basil",
//   "Parsley",
//   "Cilantro",
//   "Thyme",
//   "Rosemary",
//   "Oregano",
//   "Cumin",
//   "Paprika",
//   "Turmeric",
//   "Cinnamon",
//   "Ginger",
//   "Chili Powder",
//   "Curry Powder",
//   "Soy Sauce",
//   "Rice",
//   "Quinoa",
//   "Pasta",
//   "Flour",
//   "Sugar",
//   "Honey",
//   "Milk",
//   "Cheese",
//   "Yogurt",
//   "Eggs",
//   "Beef",
//   "Pork",
//   "Salmon",
//   "Shrimp",
//   "Tofu",
//   "Lentils",
//   "Chickpeas",
//   "Black Beans",
//   "Almonds",
//   "Walnuts",
//   "Peanuts",
//   "Sesame Seeds",
//   "Coconut Milk",
//   "Avocado",
//   "Lemon",
//   "Lime",
//   "Potatoes",
//   "Corn",
//   "Peas",
//   "Mushrooms",
//   "Cucumber",
//   "Celery",
//   "Leek",
//   "Shallots",
//   "Chives",
//   "Dill",
//   "Mint",
//   "Bay Leaves",
//   "Nutmeg",
//   "Cloves",
//   "Vanilla Extract",
//   "Baking Powder",
//   "Baking Soda",
//   "Vinegar",
//   "Mustard",
//   "Mayonnaise",
//   "Ketchup",
//   "Hot Sauce",
//   "Tahini",
//   "Hummus",
//   "Salsa",
//   "Guacamole",
//   "Dark Chocolate",
//   "Oats",
//   "Tortillas",
//   "Noodles",
//   "Breadcrumbs",
//   "Pita Bread",
//   "Naan",
//   "Granola",
//   "Cereal",
//   "Popcorn",
//   "Crackers",
//   "Chips",
//   "Dried Fruits",
//   "Jam",
//   "Nut Butter",
//   "Peanut Butter",
//   "Almond Butter",

import { getSingleRecipe } from '@/services/RecipeService';

async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { recipeId } = await params;

  const recipe = await getSingleRecipe(recipeId);

  console.log(recipe);

  return <div>RecipeDetailsPage</div>;
}

export default RecipeDetailsPage;
