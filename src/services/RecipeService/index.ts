'use server';
export const getAllRecipes = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.tags) {
    params.append('tags', query?.tags?.toString());
  }
  if (query?.searchTerm && query?.searchTerm?.length > 0) {
    params.append('searchTerm', query?.searchTerm?.toString());
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes?limit=${limit}&page=${page}&${params}`
      // {
      //   next: {
      //     tags: ['RECIPE'],
      //   },
      // }
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
