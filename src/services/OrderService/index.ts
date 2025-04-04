'use server';
import { revalidateTag } from 'next/cache';
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

export const getCustomerOrders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/provider-orders`,
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

export const updateCustomerOrdersStatus = async (
  id: string,
  status: 'Completed' | 'Cancelled'
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify({ status: status }),

        next: { tags: ['ORDERS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function revalidateOrders() {
  revalidateTag('ORDERS');
}
