/**
 *  Fetch Random Dogs
 */

type FetchResponse = { status: string; message: any[] };

export const FetchRandomDogs: any = async ({ limit }: { limit?: number }): Promise<FetchResponse> => {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random/${limit || 12}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};
