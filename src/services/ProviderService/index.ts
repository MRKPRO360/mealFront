'use server';

export const getAllProviders = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.filter) {
    const filterValue = query.filter.toString();

    if (filterValue === 'top-rated') {
      params.append('sort', '-rating');
    } else if (filterValue === 'newest') {
      params.append('sort', '-createdAt');
    } else if (filterValue === 'popular') {
      params.append('sort', '-ratingsCount'); // or 'ordersCount' if you track that
      // params.append('order', 'desc');
    }
  }

  if (query?.cuisine) {
    const queryStr = query?.cuisine?.toString();

    if (queryStr !== 'all') {
      params.append('cuisineSpecialties', queryStr);
    }
  }

  if (query?.searchTerm && query?.searchTerm?.length > 0) {
    params.append('searchTerm', query?.searchTerm?.toString());
  }

  if (query?.sort) {
    params.append('sort', query.sort.toString());
    params.append('order', query.order?.toString() || 'desc');
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers?limit=${limit}&page=${page}&${params}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleProvider = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/${id}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCuisineSpecialites = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/cuisine-specialties`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const getReviewElegibility = async (payload: Partial<IReview>) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/reviews/elegibility`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: (await cookies()).get('accessToken')!.value,
//         },
//         body: JSON.stringify(payload),
//       }
//     );
//     return await res.json();
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };
