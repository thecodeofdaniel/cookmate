import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { fetchCategories, fetchAreas } from '@/lib/fetch';

export default async function Selections() {
  console.log('Render searchForm');

  const categories = await fetchCategories();
  const areas = await fetchAreas();

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
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Area (All)" />
        </SelectTrigger>
        <SelectContent>
          {areas.map((area) => {
            return (
              <SelectItem key={area} value={area.toLowerCase()}>
                {area}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
