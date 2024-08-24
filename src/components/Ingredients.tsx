export function Ingredients({ meal }: { meal: TRecipe }) {
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
      <p className="font-medium">Ingredients</p>
      <ul className="">
        {ingredients.map(({ ingredient, measurement }, index) => (
          <li key={`${meal.idMeal}:${index}`}>
            <p>
              {measurement}: {ingredient}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Ingredients;
