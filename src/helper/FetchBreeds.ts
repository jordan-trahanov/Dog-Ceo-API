/**
 *  Fetch All Dogs Breeds
 */

type FetchResponse = { status: string; message: any[] };

export const FetchBreeds: any = async (): Promise<FetchResponse> => {
  const response = await fetch(`https://dog.ceo/api/breeds/list/all`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};
