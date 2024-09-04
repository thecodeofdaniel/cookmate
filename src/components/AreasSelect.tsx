import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AREAS = [
  'None',
  'American',
  'British',
  'Canadian',
  'Chinese',
  'Croatian',
  'Dutch',
  'Egyptian',
  'Filipino',
  'French',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Jamaican',
  'Japanese',
  'Kenyan',
  'Malaysian',
  'Mexican',
  'Moroccan',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Thai',
  'Tunisian',
  'Turkish',
  'Ukrainian',
  'Unknown',
  'Vietnamese',
] as const;

//------------------------------------------------------------------------------
export default function AreasSelect() {
  return (
    <>
      <SelectTrigger>
        <SelectValue placeholder="Select Area (None)" />
      </SelectTrigger>
      <SelectContent>
        {AREAS.map((area) => {
          return (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          );
        })}
      </SelectContent>
    </>
  );
}
