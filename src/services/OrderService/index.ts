import { cookies } from 'next/headers';

export const getMyOrders = async (
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
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/my-orders?limit=${limit}&page=${page}&${params}`,
      {
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['ORDERS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
