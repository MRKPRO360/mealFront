'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

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
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes?limit=${limit}&page=${page}&${params}`,
      {
        next: { tags: ['RECIPES'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllMyRecipes = async (
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
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes/my-recipes?limit=${limit}&page=${page}&${params}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['RECIPES'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllRecipesNameAndId = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes/nameId`,
      {
        next: { tags: ['RECIPES'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getSingleRecipe = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes/${id}`,
      { next: { tags: ['RECIPES'] } }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteMyRecipe = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['RECIPES'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createMyRecipe = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/recipes`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      body: data,
      next: { tags: ['RECIPES'] },
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateMyRecipe = async (id: string, data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/recipes/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: data,
        next: { tags: ['RECIPES'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function revalidateRecipes() {
  revalidateTag('RECIPES');
}
