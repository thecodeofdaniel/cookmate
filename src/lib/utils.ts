import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({
    behavior: 'smooth',
    inline: 'nearest',
  });
};

export function extractIngredients(ingredients: string): string[] {
  const items = ingredients
    .split(',')
    .map((item) => item.trim().replace(/\s+/g, '_'))
    .filter((item) => item !== '');

  return items;
}
