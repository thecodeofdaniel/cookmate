import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { defaultSearchFormVals, type SearchFormValues } from '../app/SearchForm';

import { RECIPES_URL } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function extractIngredients(ingredients: string): string[] {
  const items = ingredients
    .split(',')
    .map((item) => item.trim().replace(/\s+/g, '_'))
    .filter((item) => item !== '')
    .sort((a, b) => a.localeCompare(b)); // Sorting alphabetically

  return items;
}

export function createFetchRecipesURL(params: string): string {
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
      break;
  }

  return url;
}

export function createFetchRecipesParams(data: SearchFormValues): string {
  const { ingredients, category, area } = data;

  let params = '';

  if (ingredients !== defaultSearchFormVals.ingredients) {
    const ingredientsArr = extractIngredients(ingredients);
    params = `?i=${ingredientsArr.join('&i=')}`;
  } else if (category !== defaultSearchFormVals.category) {
    params = `?c=${category}`;
  } else if (area !== defaultSearchFormVals.area) {
    params = `?a=${area}`;
  }

  return params;
}
