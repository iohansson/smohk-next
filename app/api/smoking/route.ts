import { NextRequest, NextResponse } from 'next/server';
import { type SmokingDocument } from '@/modules/smoke/Smoking.model';
import {
  findSmoking,
  updateSmoking,
  createSmoking,
} from '@/modules/smoke/Smoking.service';

const getSmokingObject = (smoking: SmokingDocument) => {
  return smoking.toObject({
    transform(_doc: any, ret: any) {
      delete ret._id;
      return ret;
    },
  });
};

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const smoker = searchParams.get('smoker') ?? '';
  const dateStampString = searchParams.get('dateStamp') ?? '';
  let smoking = await findSmoking({ smoker, dateStamp: +dateStampString });
  if (smoking === null) {
    smoking = await createSmoking({ smoker, dateStamp: +dateStampString });
  }
  return NextResponse.json(getSmokingObject(smoking));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(
    getSmokingObject(
      (await updateSmoking(
        { smoker: body.smoker, dateStamp: body.dateStamp },
        body,
      ))!,
    ),
  );
}
