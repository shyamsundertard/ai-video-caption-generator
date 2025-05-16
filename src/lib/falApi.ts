import { fal } from "@fal-ai/client";

interface ProcessVideoParams {
    videoUrl: string;
    settings: {
      position: string;
      fontStyle: string;
      textColor: string;
      highlightColor: string;
      outlineColor: string;
      fontSize: number;
      maxCharacters: number;
      backgroundOpacity: number;
      outlineWidth: number;
      letterSpacing: number;
      autoTranslate: boolean;
    };
    webhookUrl: string;
  }
  
  export const processVideoWithCaptions = async ({
    videoUrl,
    settings,
    webhookUrl
  }: ProcessVideoParams): Promise<{ jobId: string }> => {
    try {
      fal.config({
        credentials: process.env.FAL_API_KEY
      })

      // const generateSubtitlePrompt = (settings: {
      //   position: string;
      //   fontStyle: string;
      //   textColor: string;
      //   highlightColor: string;
      //   outlineColor: string;
      //   fontSize: number;
      //   maxCharacters: number;
      //   backgroundOpacity: number;
      //   outlineWidth: number;
      //   letterSpacing: number;
      //   autoTranslate: boolean;
      // }) => {
      //   return `
      //     Generate subtitles for the given video.
      //     Style the subtitles using the following settings:
      //     - Font Style: ${settings.fontStyle}
      //     - Font Size: ${settings.fontSize}px
      //     - Text Color: ${settings.textColor}
      //     - Highlight Color: ${settings.highlightColor}
      //     - Outline Color: ${settings.outlineColor}
      //     - Outline Width: ${settings.outlineWidth}px
      //     - Letter Spacing: ${settings.letterSpacing}px
      //     - Max Characters per Line: ${settings.maxCharacters}
      //     - Background Opacity: ${settings.backgroundOpacity}
      //     - Subtitle Position: ${settings.position.property} at ${settings.position.value ?? 'default'}%
      //     ${settings.autoTranslate ? '- Automatically translate the subtitles into English.' : ''}
      //   `.trim();
      // };
      
      // const prompt = generateSubtitlePrompt(settings);

      // const response = await fal.subscribe("fal-ai/hunyuan-video/video-to-video", {
      //   input: {
      //     prompt,
      //     video_url: videoUrl
      //   },
      //   webhookUrl: webhookUrl,
      //   logs: true,
      //   onQueueUpdate: (update) => {
      //     if (update.status === "IN_PROGRESS") {
      //       update.logs.map((log) => log.message).forEach(console.log);
      //     }
      //   },
      // });

      const response = await fal.subscribe("fal-ai/auto-caption", {
        input: {
          video_url: videoUrl,
          txt_color: "white",
          txt_font: "Standard",
          font_size: 24,
          stroke_width: 1,
          left_align: "center",
          top_align: "center",
          refresh_interval: 1.5
        },
        logs: true,
        webhookUrl: webhookUrl,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      console.log(response.data);
      console.log(response.requestId);
    
      try {
        const data = response.data.video_url;
        if (typeof data !== 'string') {
          throw new Error('Expected video_url to be a string');
        }
        return { jobId: data };
      } catch {
        throw new Error(`Invalid response from Fal API: ${response.data.video_url}`);
      }
    } catch (error) {
      console.error('Fal API request failed:', error);
      throw error;
    }
  };