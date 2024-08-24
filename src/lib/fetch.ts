import { extractIngredients } from './utils';
import { dfltFormValues, FormValues } from '../app/search';

const CATEGORIES_URL =
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const AREAS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const RECIPES_URL = `https://www.themealdb.com/api/json/v2/${process.env.NEXT_PUBLIC_API_KEY}/filter.php`;
const RECIPE_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php`;

type CategoriesApiResponse = {
  meals: {
    strCategory: string;
  }[];
};

type AreasApiResponse = {
  meals: {
    strArea: string;
  }[];
};

function delay(ms: number = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export type TFetchedRecipe = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

type TFetchedRecipesApiResponse = {
  meals: TFetchedRecipe[];
};

export async function fetchCategories(): Promise<string[]> {
  // await delay();

  const response = await fetch(CATEGORIES_URL, {
    cache: 'force-cache',
    // next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data: CategoriesApiResponse = await response.json();
  let formattedData = data['meals'].map((category) => category.strCategory);
  formattedData = ['None', ...formattedData];

  return formattedData;
}

export async function fetchAreas(): Promise<string[]> {
  const response = await fetch(AREAS_URL, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data: AreasApiResponse = await response.json();
  let formattedData = data['meals'].map((category) => category.strArea);
  formattedData = ['None', ...formattedData];

  return formattedData;
}

export async function fetchRecipes(url: string): Promise<TFetchedRecipe[]> {
  await delay();

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

// export function createFetchRecipesUrl(
//   data: FormValues,
// ): [string, string, string] {
//   const { ingredients, category, area } = data;

//   let baseUrl = RECIPES;
//   let apiParams = '';
//   let params = '';

//   if (ingredients !== dfltFormValues.ingredients) {
//     const ingredientsArr = extractIngredients(ingredients);
//     apiParams = `?i=${ingredientsArr.join(',')}`;
//     params = `?i=${ingredientsArr.join('&i=')}`;
//   } else if (category !== dfltFormValues.category) {
//     apiParams = `?c=${category}`;
//     params = `?c=${category}`;
//   } else if (area !== dfltFormValues.area) {
//     apiParams = `?a=${area}`;
//     params = `?a=${area}`;
//   }

//   return [`${baseUrl}${apiParams}`, apiParams, params];
// }

export function createURLfromParams(params: string): string {
  let url = RECIPES_URL;
  const prefix = params.substring(0, 3);

  switch (prefix) {
    case '?i=':
      const withoutPrefix = params.replace('?i=', '');
      const arr = withoutPrefix.split('&i=');
      const apiParams = arr.join(',');
      url += `${prefix}${apiParams}`;
      break;
    case '?c=':
      url += params;
      break;
    case '?a=':
      url += params;
      break;
    default:
      url = '';
  }

  return url;
}

export function createFetchRecipesNextParams(data: FormValues): string {
  const { ingredients, category, area } = data;

  let params = '';

  if (ingredients !== dfltFormValues.ingredients) {
    const ingredientsArr = extractIngredients(ingredients);
    params = `?i=${ingredientsArr.join('&i=')}`;
  } else if (category !== dfltFormValues.category) {
    params = `?c=${category}`;
  } else if (area !== dfltFormValues.area) {
    params = `?a=${area}`;
  }

  return params;
}
