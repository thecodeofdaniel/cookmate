const CATEGORIES_URL =
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const AREA_URL = 'www.themealdb.com/api/json/v1/1/list.php?a=list';

// const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
//   const response = await fetch(`${BASE_API_URL}/${id}`);
//   // 4xx or 5xx
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.description);
//   }

//   const data = await response.json();
//   return data;
// };

type CategoriesApiResponse = {
  meals: {
    strCategory: string;
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
  formattedData = ['Any', ...formattedData];

  return formattedData;
}
