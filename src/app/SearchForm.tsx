'use client';

import { useEffect } from 'react';
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
import { createFetchRecipesParams } from '@/lib/utils';

import { cn } from '@/lib/utils';

export const defaultSearchFormVals = {
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
      .default(defaultSearchFormVals.ingredients),
    category: z.string().optional().default(defaultSearchFormVals.category),
    area: z.string().optional().default(defaultSearchFormVals.area),
  })
  .refine(
    (data) => {
      // what it should be!
      const filledFields = [
        data.ingredients !== defaultSearchFormVals.ingredients,
        data.category !== defaultSearchFormVals.category,
        data.area !== defaultSearchFormVals.area,
      ].filter(Boolean).length;

      return filledFields === 1;
    },
    // otherwise show this error
    { message: 'One and only one field must be filled', path: ['formError'] },
  );

export type SearchFormValues = z.infer<typeof FormSchema>;

//------------------------------------------------------------------------------
type Props = {
  ingredients: string | null;
  category: string | null;
  area: string | null;
  page: string;
  className?: string;
};

export default function SearchForm({
  ingredients,
  category,
  area,
  page,
  className,
}: Props) {
  // console.log('Render: SearchForm');

  const router = useRouter();

  // On first reload intialize default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: ingredients ?? defaultSearchFormVals.ingredients,
      category: category ?? defaultSearchFormVals.category,
      area: area ?? defaultSearchFormVals.area,
    },
  });

  // Change values inside form if using prev and next browser
  useEffect(() => {
    const updatedValues = {
      ingredients: ingredients ?? defaultSearchFormVals.ingredients,
      category: category ?? defaultSearchFormVals.category,
      area: area ?? defaultSearchFormVals.area,
    };

    form.reset(updatedValues);
  }, [form, ingredients, category, area]);

  type CustomFormErrors = typeof form.formState.errors & {
    formError?: { message: string };
  };
  const customErrors = form.formState.errors as CustomFormErrors;

  // this function only runs when there's no errors
  function onSubmit(data: z.infer<typeof FormSchema>) {
    let nextParams = createFetchRecipesParams(data);
    // nextParams += '&page=' + page; // might change to 1 when new params are selected
    nextParams += '&page=' + '1';
    // console.log(nextParams);

    if (nextParams) {
      router.push(nextParams);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
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
                    form.getValues('category') !==
                      defaultSearchFormVals.category ||
                    form.getValues('area') !== defaultSearchFormVals.area
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
                // defaultValue={field.value}
                value={field.value}
                disabled={
                  form.getValues('ingredients') !==
                    defaultSearchFormVals.ingredients ||
                  form.getValues('area') !== defaultSearchFormVals.area
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
                // defaultValue={field.value}
                value={field.value}
                disabled={
                  form.getValues('ingredients') !==
                    defaultSearchFormVals.ingredients ||
                  form.getValues('category') !== defaultSearchFormVals.category
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
            form.watch('ingredients').trim().length < 3 &&
            form.watch('category') === 'None' &&
            form.watch('area') === 'None'
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
