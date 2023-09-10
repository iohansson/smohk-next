import { dateStamp } from '@/helpers/date';
import { findStats } from '@/modules/stats/Stats.service';
import { Stats } from '@/modules/stats/Stats';
import { currentUser } from '@clerk/nextjs';
import { type User } from '@clerk/nextjs/server';

type Smoker = {
  email: string;
};

export default async function StatsPage() {
  const user = (await currentUser()) as User;
  const smoker: Smoker = {
    email: user?.emailAddresses.at(0)?.emailAddress ?? '',
  };
  const [stats] = await Promise.all([
    findStats({
      smoker: smoker.email,
      dateStamp: dateStamp(),
    }).then((s) => s.map((s) => s.toObject())),
  ]);
  return (
    <main className="flex flex-grow justify-center items-center px-6">
      <div className="flex-grow">
        <h1 className="font-black">Stats</h1>
        <Stats stats={stats} />
      </div>
    </main>
  );
}
