import { getAllRecipes } from '@/services/RecipeService';
import RecipeMenuItem from './RecipeMenuItem';
import { IMenuName, IRecipe } from '@/types';

async function RecipeMenu({ menuNames }: { menuNames: IMenuName[] }) {
  const {
    data: { result },
  } = await getAllRecipes('30');

  // console.log(menuNames);
  // console.log(result);

  const categorizedRecipes: Record<string, any[]> = {};

  menuNames.forEach((menu) => {
    categorizedRecipes[menu.name] = result.filter(
      (recipe: IRecipe) => recipe.recipeMenuName._id === menu._id
    );
  });

  return (
    <div className="container mx-auto px-3">
      {Object.entries(categorizedRecipes).map(([categoryName, recipes]) => (
        <RecipeMenuItem
          key={categoryName}
          categoryName={categoryName}
          recipes={recipes}
        />
      ))}
    </div>
  );
}

export default RecipeMenu;
