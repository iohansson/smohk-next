import { NextRequest, NextResponse } from 'next/server';
import { type ConfigDocument } from '@/modules/config/Config.model';
import {
  findConfig,
  updateConfig,
  createConfig,
} from '@/modules/config/Config.service';

const getConfigObject = (config: ConfigDocument) => {
  return config.toObject({
    transform(_doc: any, ret: any) {
      delete ret._id;
      return ret;
    },
  });
};

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const smoker = searchParams.get('smoker') ?? '';
  let config = await findConfig({ smoker });
  if (config === null) {
    config = await createConfig({ smoker });
  }
  return NextResponse.json(getConfigObject(config));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(
    getConfigObject((await updateConfig({ smoker: body.smoker }, body))!),
  );
}
