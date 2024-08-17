import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { fetchCategories } from '@/lib/fetch';

export default async function CategoriesSelect() {
  const categories = await fetchCategories();

  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Category (All)" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            return (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
