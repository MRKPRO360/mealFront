export const getAllRecipes = async (limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes?limit=${limit}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getSingleRecipe = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes/${id}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
