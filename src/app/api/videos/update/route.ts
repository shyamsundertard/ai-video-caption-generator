import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import VideoModel from '@/models/Video';

export async function POST(request: Request) {
  try {
    const { sourceUrl, captionSettings } = await request.json();

    if (!sourceUrl || !captionSettings) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDB();

    const videoDoc = await VideoModel.findOneAndUpdate(
      { sourceUrl },
      { captionSettings },
      { new: true }
    );

    if (!videoDoc) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Video updated successfully',
      video: videoDoc
    });

  } catch (error) {
    console.error('Update video error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update video' },
      { status: 500 }
    );
  }
} 