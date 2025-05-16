import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import {VideoModel} from '@/models/Video';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectToDB();
    const history = await VideoModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(history);
  } catch (error) {
    console.error('History fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}