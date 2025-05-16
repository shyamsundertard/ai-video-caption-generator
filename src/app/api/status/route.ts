import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import VideoModel from '@/models/Video';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    
    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    await connectToDB();
    const video = await VideoModel.findOne({ falJobId: jobId });
    
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: video.status,
      sourceUrl: video.sourceUrl,
      processedUrl: video.processedUrl,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check status' },
      { status: 500 }
    );
  }
}