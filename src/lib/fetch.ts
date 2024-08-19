const CATEGORIES_URL =
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const AREAS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const RECIPES = `https://www.themealdb.com/api/json/v2/${process.env.NEXT_PUBLIC_API_KEY}/filter.php`;

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

export async function fetchCategories(): Promise<string[]> {
  await delay();

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

export async function fetchRecipes(
  ingredients: string[],
  category: string | undefined,
  area: string | undefined,
) {
  let url = RECIPES + `?i=${ingredients.join(',')}`;
  url += category !== 'All' ? `&c=${category}` : '';
  url += area !== 'All' ? `&a=${area}` : '';

  console.log(url);
}
