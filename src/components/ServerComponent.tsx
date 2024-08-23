import { Suspense } from 'react';
import ShowRecipesServer from './ShowRecipesServer';

type Props = {
  ingredients: string[];
  category: string | null;
  area: string | null;
};

export default function ServerComponent({
  ingredients,
  category,
  area,
}: Props) {
  console.log(ingredients);

  return (
    <>
      <p>Recipes shown here</p>
      {ingredients.length > 0 && (
        <Suspense fallback={<p>Loading Recipes...</p>}>
          <ShowRecipesServer
            ingredients={ingredients}
            category={category}
            area={area}
          />
          {/* <p>Yo</p> */}
        </Suspense>
      )}
    </>
  );
}
