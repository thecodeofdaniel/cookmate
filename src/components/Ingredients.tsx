import { cn } from '@/lib/utils';

//------------------------------------------------------------------------------
type Props = {
  meal: TRecipe;
  className?: string;
};

export function Ingredients({ meal, className }: Props) {
  const ingredients = [];

  // Loop through the 20 ingredients and add them to the list if not empty
  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal as any)[`strIngredient${i}`];
    const measurement = (meal as any)[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({
        ingredient: ingredient,
        measurement: measurement,
      });
    }
  }

  return (
    <>
      <ul className={cn(className)}>
        {ingredients.map(({ ingredient, measurement }, index) => (
          <li key={`${meal.idMeal}:${index}`}>
            <p className="flex items-center justify-between gap-2">
              <span>{measurement}</span>
              <span className="flex-1 border-b border-dotted border-stone-700"></span>{' '}
              <span>{ingredient}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Ingredients;
