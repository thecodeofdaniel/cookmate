import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  defaultSearchFormVals,
  type SearchFormValues,
} from '../app/SearchForm';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** This extracts the ingredients entered from user and turns them into an array
 * of ingredients. It also removes any white space for an ingredient with an
 * underscore (e.g. chicken breast -> chicken_breast). As well as put them into
 * alphabetical order
 */
export function extractIngredients(ingredients: string): string[] {
  const items = ingredients
    .split(',')
    .map((item) => item.trim().replace(/\s+/g, '_'))
    .filter((item) => item !== '')
    .sort((a, b) => a.localeCompare(b)); // Sorting alphabetically

  return items;
}

/** This extracts the data from the form in order to insert them as search
 * params into the URL.
 */
export function createRecipeParams(data: SearchFormValues): string {
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
