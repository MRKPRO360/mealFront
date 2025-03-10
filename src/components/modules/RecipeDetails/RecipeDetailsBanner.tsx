import Image from 'next/image';

function RecipeDetailsBanner({ recipeImage }: { recipeImage: string }) {
  return (
    <div
      className="relative max-w-[1526px] min-h-[350px]
      
"
    >
      <Image
        fill={true}
        className="absolute w-full h-full object-center object-cover"
        src={recipeImage}
        alt="recipe menu image"
      />
    </div>
  );
}

export default RecipeDetailsBanner;
