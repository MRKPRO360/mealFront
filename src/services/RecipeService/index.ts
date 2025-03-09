export const getAllRecipes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/recipes`);
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
