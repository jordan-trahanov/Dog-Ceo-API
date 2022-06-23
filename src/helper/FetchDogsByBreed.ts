/**
 *  Fetch Dogs By Breed
 */

type FetchResponse = { status: string; message: any[] };

export const FetchDogsByBreed: any = async ({
  limit = 12,
  breed,
  subBreed = '',
}: {
  limit?: number;
  breed: string;
  subBreed: string;
}): Promise<FetchResponse> => {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/${subBreed && `${subBreed}/`}images/random/${limit || 12}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();

  return data;
};
