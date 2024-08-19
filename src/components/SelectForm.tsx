'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
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
import { extractIngredients } from '@/lib/utils';
import { fetchRecipes } from '@/lib/fetch';

const defaultValues = {
  ingredients: '',
  category: 'None',
  area: 'None',
};

const FormSchema = z.object({
  ingredients: z.string().optional().default(defaultValues.ingredients),
  category: z.string().optional(),
  area: z.string().optional(),
});

export default function SelectForm() {
  // console.log('Render: SelectForm');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  // const [generalError, setGeneralError] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(errors);

    // data.ingredients = extractIngredients(data.ingredients?.toString() ?? '');

    // fetchRecipes(data.ingredients, data.category, data.area);

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
                  disabled={
                    form.getValues('category') !== defaultValues.category ||
                    form.getValues('area') !== defaultValues.area
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
                  form.getValues('ingredients') !== defaultValues.ingredients ||
                  form.getValues('area') !== defaultValues.area
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
              {/* {!form.formState.errors.area && <FormLabel>Area</FormLabel>} */}
              <FormLabel>Area</FormLabel>
              <FormMessage />
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={
                  form.getValues('ingredients') !== defaultValues.ingredients ||
                  form.getValues('category') !== defaultValues.category
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
            form.getValues('ingredients') === '' &&
            form.getValues('category') === 'None' &&
            form.getValues('area') === 'None'
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
