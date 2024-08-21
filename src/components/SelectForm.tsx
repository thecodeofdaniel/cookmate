'use client';

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
import { Input } from './ui/input';
import { Select } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

import CategoriesSelect from './CategoriesSelect';
import AreasSelect from './AreasSelect';
import { createFetchRecipesUrl } from '@/lib/fetch';
import { useState } from 'react';

export const dfltFormValues = {
  ingredients: '',
  category: 'None',
  area: 'None',
};

const FormSchema = z
  .object({
    ingredients: z.string().optional().default(dfltFormValues.ingredients),
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

type SelectFormProps = {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectForm({ setUrl }: SelectFormProps) {
  // console.log('Render: SelectForm');
  const [prevUrl, setPrevUrl] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: dfltFormValues,
  });

  type CustomFormErrors = typeof form.formState.errors & {
    formError?: { message: string };
  };

  const customErrors = form.formState.errors as CustomFormErrors;

  const watchedIngredients = form.watch('ingredients');

  // this function only runs when there's no errors
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const url = createFetchRecipesUrl(data);

    if (url === prevUrl) {
      console.log('Same url found');
      return;
    }

    setPrevUrl(url);
    setUrl(url);

    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
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
            watchedIngredients.length < 3 &&
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
