'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Shadcn/UI
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../components/ui/input';
import { Select } from '@/components/ui/select';

import CategoriesSelect from '../components/CategoriesSelect';
import AreasSelect from '../components/AreasSelect';
import { createFetchRecipesNextParams } from '@/lib/fetch';

export const dfltFormValues = {
  ingredients: '',
  category: 'None',
  area: 'None',
};

const FormSchema = z
  .object({
    ingredients: z
      .string()
      .trim()
      .optional()
      .default(dfltFormValues.ingredients),
    category: z.string().optional().default(dfltFormValues.category),
    area: z.string().optional().default(dfltFormValues.area),
  })
  .refine(
    (data) => {
      // what it should be!
      const filledFields = [
        data.ingredients !== dfltFormValues.ingredients,
        data.category !== dfltFormValues.category,
        data.area !== dfltFormValues.area,
      ].filter(Boolean).length;

      return filledFields === 1;
    },
    // otherwise show this error
    { message: 'One and only one field must be filled', path: ['formError'] },
  );

export type FormValues = z.infer<typeof FormSchema>;

type Props = {
  ingredients: string[];
  category: string | null;
  area: string | null;
};

export default function Search({ ingredients, category, area }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients:
        ingredients.length > 0
          ? ingredients.join(',')
          : dfltFormValues.ingredients,
      category: category ?? dfltFormValues.category,
      area: area ?? dfltFormValues.area,
    },
  });

  type CustomFormErrors = typeof form.formState.errors & {
    formError?: { message: string };
  };

  const customErrors = form.formState.errors as CustomFormErrors;

  const watchedIngredients = form.watch('ingredients');

  // this function only runs when there's no errors
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const nextParams = createFetchRecipesNextParams(data);

    if (nextParams) {
      router.push(nextParams);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:flex-row md:items-center"
      >
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="mt-auto md:flex-2">
              <FormLabel>Ingredients</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
                  {...field}
                  disabled={
                    form.getValues('category') !== dfltFormValues.category ||
                    form.getValues('area') !== dfltFormValues.area
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="mt-auto flex-1">
              <FormLabel>Category</FormLabel>
              <FormMessage />
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={
                  form.getValues('ingredients') !==
                    dfltFormValues.ingredients ||
                  form.getValues('area') !== dfltFormValues.area
                }
              >
                <CategoriesSelect />
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem className="mt-auto flex-1">
              <FormLabel>Area</FormLabel>
              <FormMessage />
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={
                  form.getValues('ingredients') !==
                    dfltFormValues.ingredients ||
                  form.getValues('category') !== dfltFormValues.category
                }
              >
                <AreasSelect />
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 border md:mt-auto"
          disabled={
            watchedIngredients.trim().length < 3 &&
            form.getValues('category') === 'None' &&
            form.getValues('area') === 'None'
          }
        >
          Submit
        </Button>
      </form>
      <p className="mt-2 text-[0.8rem] font-medium text-red-500 dark:text-red-900">
        {customErrors.formError?.message}
      </p>
    </Form>
  );
}
