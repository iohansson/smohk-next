import { findOrCreateConfig } from '@/modules/config/Config.service';
import { ConfigForm } from '@/modules/config/client/components/ConfigForm';
import { currentUser } from '@clerk/nextjs';
import { type User } from '@clerk/nextjs/server';

type Smoker = {
  email: string;
};

export default async function ConfigPage() {
  const user = (await currentUser()) as User;
  const smoker: Smoker = {
    email: user?.emailAddresses.at(0)?.emailAddress ?? '',
  };
  const [config] = await Promise.all([
    findOrCreateConfig({
      smoker: smoker.email,
    }).then((c) => c.toObject()),
  ]);
  return (
    <main className="flex flex-grow justify-center items-center px-6">
      <div className="flex-grow">
        <h1 className="font-black">Config</h1>
        <ConfigForm config={config} smoker={smoker.email} />
      </div>
    </main>
  );
}
