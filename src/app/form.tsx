'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import CategoriesSelect from '@/components/CategoriesSelect';

type FormData = {
  firstName: string;
  lastName: string;
  category: string;
  cars: string;
};

export default function FormPage() {
  console.log('Render: FormPage');

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      {/* <input {...register('firstName')} className="text-black" /> */}
      {/* <AreasSelect /> */}
      {/* <input {...register('category')} /> */}
      {/* <CategoriesSelect {...register('category')} /> */}
      <select id="cars" {...register('cars')}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <label>Last Name</label>
      <input {...register('lastName')} className="text-black" />
      {/* <button
        type="submit"
        // onClick={() => {
        //   setValue('lastName', 'luo');
        //   setValue('firstName', 'daniel');
        // }}
      >
        SetValue
      </button> */}
      <button type="submit">Submit</button>
      {/* <input type="submit" /> */}
    </form>
  );
}
