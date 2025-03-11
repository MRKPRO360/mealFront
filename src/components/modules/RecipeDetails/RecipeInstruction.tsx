import { IInstruction } from '@/types';

function RecipeInstruction({ instructions }: { instructions: IInstruction[] }) {
  return (
    <div className="max-w-6xl rounded-xs mx-auto mt-12 lg:mt-0 pb-10">
      <div className="bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-lg bg-gray-200 w-9 h-9 rounded-full flex justify-center items-center">
                {instruction.step}{' '}
              </span>
              {instruction.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeInstruction;
