'use client';

import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export const Navbar: FunctionComponent = (props) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Smohk
        </Link>
        <Link className="btn btn-ghost btn-sm ml-2" href="/config">
          Config
        </Link>
        <Link className="btn btn-ghost btn-sm ml-2" href="/stats">
          Stats
        </Link>
      </div>
      <div className="flex-none">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
