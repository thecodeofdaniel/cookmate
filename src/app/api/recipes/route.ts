import { NextResponse } from 'next/server';
import { fetchRecipes } from '@/lib/fetch';

export async function POST(request: Request) {
  const data = await request.json();
  const params = data.searchParams;

  const url = createFetchRecipesApiURL(params);
  const recipes = await fetchRecipes(url);

  return NextResponse.json({
    recipes: recipes,
  });
}

/**
 * This will create the URL for the 3rd party API. It should only include one of
 * these categories. Otherwise the URL will be blank
 * - i = ingredients
 * - c = category
 * - a = area
 */
function createFetchRecipesApiURL(params: string): string | '' {
  let url = `https://www.themealdb.com/api/json/v2/${process.env.API_KEY}/filter.php`;
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
      break;
  }

  return url;
}
