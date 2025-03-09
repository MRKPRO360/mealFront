import Image from 'next/image';

function RecipeDetailsBanner({ recipeImage }: { recipeImage: string }) {
  return (
    <div
      className="
      w-[1526]
      h-[450]
      relative
"
    >
      <Image
        fill={true}
        className="absolute w-full h-full object-cover"
        src={recipeImage}
        alt="recipe menu image"
      />
    </div>
  );
}

export default RecipeDetailsBanner;
