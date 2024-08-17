import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { fetchAreas } from '@/lib/fetch';

export default async function AreasSelect() {
  const areas = await fetchAreas();

  return (
    <>
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
