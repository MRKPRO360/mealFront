import MyMenu from '@/components/modules/myMenu';
import { getAllRecipes } from '@/services/RecipeService';

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
async function MyMenuPage({ searchParams }: { searchParams: TSearchParams }) {
  const query = await searchParams;

  const {
    data: { result },
  } = await getAllRecipes(undefined, undefined, query);

  return (
    <div className="bg-gray-100/80">
      <MyMenu recipes={result} />
    </div>
  );
}

export default MyMenuPage;
