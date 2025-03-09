import { getAllMenuNames } from '@/services/MenuNameService';
import MenuBanner from './MenuBanner/MenuBanner';
import MenuItem from './MenuItem/MenuItem';
import RecipeMenu from './RecipeMenu/RecipeMenu';
import Checkout from './CheckoutMenu/Checkout';

async function Menu() {
  const menuNames = await getAllMenuNames();

  return (
    <div>
      <MenuBanner />

      <MenuItem menuNames={menuNames?.data} />

      <Checkout menuNames={menuNames?.data} />

      <RecipeMenu />
    </div>
  );
}

export default Menu;
