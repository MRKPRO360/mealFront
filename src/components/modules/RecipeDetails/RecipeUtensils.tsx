function RecipeUtensils({ utensils }: { utensils: string[] }) {
  return (
    <div className="max-w-6xl rounded-xs mx-auto my-5">
      <div className="bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">Utensils</h2>
        <span className="font-normal">{utensils.join(' • ')}</span>
      </div>
    </div>
  );
}

export default RecipeUtensils;
