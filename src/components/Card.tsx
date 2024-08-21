'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

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
import { Input } from './ui/input';
import { Select } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

import CategoriesSelect from './CategoriesSelect';
import AreasSelect from './AreasSelect';
import { extractIngredients } from '@/lib/utils';
import { createFetchRecipesUrl } from '@/lib/fetch';

// Define the schema for form validation
const FormSchema = z.object({
  ingredients: z.union([z.string().trim(), z.array(z.string())]).optional(),
  category: z.string().optional(),
  area: z.string().optional(),
}).refine(data => {
  // Check if at least one field is filled
  return data.ingredients?.length > 0 || data.category !== 'None' || data.area !== 'None';
}, {
  message: 'At least one of ingredients, category, or area must be filled in.',
});

export default function SelectForm() {
  console.log('Render: SelectForm');

  const { handleSubmit, formState, getValues } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: '',
      category: 'None',
      area: 'None',
    },
  });

  const [generalError, setGeneralError] = useState<string | null>(null);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    // Reset the general error
    setGeneralError(null);

    // Extract and process ingredients
    data.ingredients = extractIngredients(data.ingredients.toString());

    // Perform additional validation
    if (formState.errors) {
      setGeneralError(formState.errors[Object.keys(formState.errors)[0]]?.message || 'An unknown error occurred');
      return; // Stop form submission if there are errors
    }

    // Proceed with fetching recipes
    createFetchRecipesUrl(data.ingredients, data.category, data.area);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...formState}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-2 flex flex-col gap-2 md:flex-row md:items-center"
      >
        <FormField
          control={formState.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="mt-auto md:flex-2">
              <FormLabel>Ingredients</FormLabel>
              <FormMessage>{formState.errors.ingredients?.message}</FormMessage>
              <FormControl>
                <Input
                  placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
                  {...field}
                  disabled={
                    getValues('category') !== 'None' ||
                    getValues('area') !== 'None'
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={formState.control}
          name="category"
          render={({ field }) => (
            <FormItem className="mt-auto flex-1">
              <FormLabel>Category</FormLabel>
              <FormMessage>{formState.errors.category?.message}</FormMessage>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={
                  getValues('ingredients') !== '' ||
                  getValues('area') !== 'None'
                }
              >
                <CategoriesSelect />
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={formState.control}
          name="area"
          render={({ field }) => (
            <FormItem className="mt-auto flex-1">
              <FormLabel>Area</FormLabel>
              <FormMessage>{formState.errors.area?.message}</FormMessage>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={
                  getValues('ingredients') !== '' ||
                  getValues('category') !== 'None'
                }
              >
                <AreasSelect />
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 border md:mt-auto">
          Submit
        </Button>
      </form>
      {generalError && (
        <div className="mt-4 p-4 text-red-600 bg-red-100 rounded">
          <p>{generalError}</p>
        </div>
      )}
    </Form>
  );
}
