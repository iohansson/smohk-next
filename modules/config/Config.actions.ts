'use server';

import { revalidatePath } from 'next/cache';
import { type Config } from './Config.model';
import { updateConfig } from './Config.service';
import { redirect } from 'next/navigation';

export const postConfig = async (filter: { smoker: string }, data: Config) => {
  await updateConfig(filter, data);
  revalidatePath('/');
  redirect('/');
};
