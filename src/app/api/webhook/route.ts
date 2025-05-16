import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import VideoModel from '@/models/Video';
// import { uploadVideoToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  let webhookData;
  const url = request.nextUrl.searchParams;
    const videoUrl = url.get("videoUrl");

    const captionSettings = {
      position: url.get("position"),
      fontStyle: url.get("fontStyle") || "",
      textColor: url.get("textColor") || "",
      highlightColor: url.get("highlightColor") || "",
      outlineColor: url.get("outlineColor") || "",
      fontSize: Number(url.get("fontSize")),
      maxCharacters: Number(url.get("maxCharacters")),
      backgroundOpacity: Number(url.get("backgroundOpacity")),
      outlineWidth: Number(url.get("outlineWidth")),
      letterSpacing: Number(url.get("letterSpacing")),
      autoTranslate: url.get("autoTranslate") === "true",
    };

  try {
    webhookData = await request.json();
    
    // Validate webhook data
    if (!videoUrl || !webhookData?.video?.url) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append('file', webhookData.video.url);
    
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to upload video');
    }
    
    const uploadData = await uploadResponse.json();
    
    
    await connectToDB();
    await VideoModel.create({
      userId: '1',
      sourceUrl: videoUrl,
      processedUrl: uploadData.url,
      captionSettings,
      status: "completed",
      falJobId: "1",
      createdAt: new Date()
    });
    
    // if (!video) {
    //   return NextResponse.json(
    //     { error: 'Video record not found' },
    //     { status: 404 }
    //   );
    // }

    // // Upload processed video to Cloudinary
    // const response = await fetch(webhookData.result.videoUrl);
    // const videoBuffer = Buffer.from(await response.arrayBuffer());
    
    // const { secure_url, public_id } = await uploadVideoToCloudinary(
    //   videoBuffer,
    //   `processed_${video.sourcePublicId}`
    // );

    // // Update database
    // video.processedPublicId = public_id;
    // video.processedUrl = secure_url;
    // video.status = 'completed';
    // video.completedAt = new Date();
    // await video.save();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    
    // Update status to failed if error occurs
    if (webhookData?.jobId) {
      await VideoModel.findOneAndUpdate(
        { falJobId: webhookData.jobId },
        { status: 'failed', error: error instanceof Error ? error.message : 'Unknown error' }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to handle webhook' },
      { status: 500 }
    );
  }
}