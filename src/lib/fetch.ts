const CATEGORIES_URL =
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const AREAS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

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

export async function fetchCategories(): Promise<string[]> {
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
  formattedData = ['All', ...formattedData];

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
  formattedData = ['All', ...formattedData];

  return formattedData;
}
