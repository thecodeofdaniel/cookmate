// Components
import Recipe from './Recipe';
import Navigation from '@/components/Navigation';

// Libraries
import { fetchRecipes } from '@/lib/fetch';
import { cn, createFetchRecipesApiURL } from '@/lib/utils';

// Local data
import recipesJSON from '../../public/recipes.json';

//------------------------------------------------------------------------------
type Props = {
  page: number;
  className?: string;
  recipeParams: string;
};

const AMOUNT = 8;

export default async function Recipes({
  page,
  className,
  recipeParams,
}: Props) {
  // If on the home page with no params
  if (recipeParams === '') {
    return <p>Search for some recipes!</p>;
  }

  const url = createFetchRecipesApiURL(recipeParams);
  const recipes = await fetchRecipes(url);
  // const recipes = recipesJSON['meals'];

  if (recipes === null) {
    return <p>No recipes found :(</p>;
  }

  const maxPages = Math.ceil(recipes.length / AMOUNT);

  // If on a page that outside the boundaries
  if (page <= 0 || page > maxPages) {
    return <p>There's nothing here. 0_0</p>;
  }

  // Get the recipes for that selected page
  let startIdx = (page - 1) * AMOUNT;
  let endIdx = page * AMOUNT - 1;
  let paginatedRecipes = recipes?.slice(startIdx, endIdx + 1);

  return (
    <>
      <ul
        className={cn(
          className,
          'flex flex-wrap items-start justify-center gap-2',
        )}
      >
        {paginatedRecipes?.map((recipe) => {
          return <Recipe key={recipe.idMeal} fetchedRecipe={recipe} />;
        })}
      </ul>
      {maxPages > 1 && (
        <Navigation
          recipeParams={recipeParams}
          page={page}
          maxPages={maxPages}
        />
      )}
    </>
  );
}
