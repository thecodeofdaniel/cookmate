import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  'None',
  'Beef',
  'Breakfast',
  'Chicken',
  'Dessert',
  'Goat',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
] as const;

//------------------------------------------------------------------------------
export default function CategoriesSelect() {
  return (
    <>
      <SelectTrigger>
        <SelectValue placeholder="Select Category (None)" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          return (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          );
        })}
      </SelectContent>
    </>
  );
}
