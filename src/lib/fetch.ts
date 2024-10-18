import { SINGLE_RECIPE_URL } from './constants';

export async function fetchRecipes(url: string): Promise<TFetchedRecipe[]> {
  const response = await fetch(url, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data: TFetchedRecipesApiResponse = await response.json();
  let formattedData = data['meals'];

  return formattedData;
}

/** This is a proxy to the actual fetchRecipes function. To prevent exposure of
 * API key. It goes thru the API and uses the actual fetchRecipes function.
 */
export async function fetchRecipesProxy(
  searchParams: string,
): Promise<TFetchedRecipe[]> {
  const response = await fetch('api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchParams: searchParams }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await response.json();

  // console.log('from API, recipes:', data);
  const recipes = data['recipes'];

  return recipes;
}

export async function fetchSingleRecipe(id: string): Promise<TRecipe | null> {
  const url = SINGLE_RECIPE_URL + '?i=' + id;

  const response = await fetch(url, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data: TRecipeApiResponse = await response.json();

  if (data['meals']) {
    return data['meals'][0];
  } else {
    return null;
  }
}
