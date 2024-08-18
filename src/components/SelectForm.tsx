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

const FormSchema = z.object({
  ingredients: z.string().trim().min(1, {
    message: 'At least enter one ingredient',
  }),
  category: z.string({
    required_error: 'Please select a category',
  }),
  area: z.string({
    required_error: 'Please select an area',
  }),
});

export default function SelectForm() {
  console.log('Render: SelectForm');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-2 flex flex-col gap-2 md:flex-row md:items-center"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {/* {!form.formState.errors.area && <FormLabel>Area</FormLabel>} */}
              <FormLabel>Area</FormLabel>
              <FormMessage />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <AreasSelect />
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 border md:mt-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
}
