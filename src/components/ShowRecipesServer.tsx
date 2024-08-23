import { createFetchRecipesUrl, fetchRecipes } from '@/lib/fetch';

type Props = {
  ingredients: string[];
  category: string | null;
  area: string | null;
};

export default async function ShowRecipesServer({
  ingredients,
  category,
  area,
}: Props) {
  const ingredientsStr = ingredients.join(',');
  const categoryStr = category ?? '';
  const areaStr = area ?? '';

  const url = createFetchRecipesUrl({
    ingredients: ingredientsStr,
    category: categoryStr,
    area: areaStr,
  })[0];

  // const data = await fetch(url, { cache: 'force-cache' });
  const data = fetchRecipes(url);
  console.log(data);

  return (
    <>
      <ul>
        {ingredients.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>;
        })}
      </ul>
      {category && <p>{category}</p>}
      {area && <p>{area}</p>}
    </>
  );
}
