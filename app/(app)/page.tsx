import { findOrCreateConfig } from '@/modules/config/Config.service';
import { SmokingBoard } from '@/components/SmokingBoard';
import { currentUser } from '@clerk/nextjs';
import { type User } from '@clerk/nextjs/server';
import { findOrCreateSmoking } from '@/modules/smoke/Smoking.service';
import { dateStamp } from '@/helpers/date';

type Smoker = {
  email: string;
};

export default async function App() {
  const user = (await currentUser()) as User;
  const smoker: Smoker = {
    email: user?.emailAddresses.at(0)?.emailAddress ?? '',
  };
  const [config, smoking] = await Promise.all([
    findOrCreateConfig({
      smoker: smoker.email,
    }).then((c) => c.toObject()),
    findOrCreateSmoking({
      smoker: smoker.email,
      dateStamp: dateStamp(),
    }).then((s) => s.toObject()),
  ]);
  return (
    <main className="flex flex-grow justify-center items-center px-6">
      <SmokingBoard smoker={smoker} config={config} smoking={smoking} />
    </main>
  );
}
