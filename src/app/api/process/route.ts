import { NextResponse } from 'next/server';
import { processVideoWithCaptions } from '@/lib/falApi';
import { connectToDB } from '@/lib/db';
import VideoModel from '@/models/Video';
import qs from 'qs';

export async function POST(request: Request) {
  try {
    const { videoUrl, settings, userId } = await request.json();
    
    if (!videoUrl || !settings || !userId) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Starting video processing with:', {
      videoUrl,
      settings,
      userId,
      falApiKey: process.env.FAL_API_KEY ? 'Present' : 'Missing',
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook?videoUrl=${videoUrl}`
    });

    const webhookQuery = qs.stringify({
      videoUrl: videoUrl,
      ...settings,
    });

    // Start Fal processing
    try {
      const { jobId } = await processVideoWithCaptions({
        videoUrl,
        // settings,
        webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook?${webhookQuery}`
      });

      // Save to database
      await connectToDB();
      const videoDoc = new VideoModel({
        userId,
        sourceUrl: videoUrl,
        captionSettings: settings,
        status: 'processing',
        falJobId: jobId,
        createdAt: new Date()
      });
      await videoDoc.save();

      return NextResponse.json({
        message: 'Video processing started',
        jobId
      });
    } catch (falError) {
      console.error('Fal API error:', falError);
      throw falError;
    }

  } catch (error) {
    console.error('Process API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process video' },
      { status: 500 }
    );
  }
}