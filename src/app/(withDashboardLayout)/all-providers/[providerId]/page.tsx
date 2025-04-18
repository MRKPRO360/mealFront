export async function generateMetadata({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const { providerId } = await params;

  const { data } = await getSingleProvider(providerId);
  return {
    title: data.recipeName,
    description: data.description,
  };
}

import ProviderDetails from '@/components/modules/dashboard/customer/all-providers/ProviderDetails';
import { getSingleProvider } from '@/services/ProviderService';

async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ providerId: string }>;
}) {
  const { providerId } = await params;

  const { data } = await getSingleProvider(providerId);

  return (
    <div>
      <ProviderDetails provider={data} />
    </div>
  );
}

export default RecipeDetailsPage;
