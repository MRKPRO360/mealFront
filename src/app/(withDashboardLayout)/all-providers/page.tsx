import AllProviders from '@/components/modules/dashboard/customer/all-providers';
import {
  getAllProviders,
  getCuisineSpecialites,
} from '@/services/ProviderService';

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function AllProvidersPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const query = await searchParams;

  const [providersResponse, cuisinesResponse] = await Promise.all([
    getAllProviders(query?.page as string, '10', query),
    getCuisineSpecialites(),
  ]);

  // Destructure the responses
  const { result, meta } = providersResponse.data;
  const { data } = cuisinesResponse;

  return <AllProviders cuisines={data} providers={result} meta={meta} />;
}

export default AllProvidersPage;
