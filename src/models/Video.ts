import { Schema, model, Document } from 'mongoose';

interface IVideo extends Document {
  userId: string;
  sourceUrl: string;
  processedUrl?: string;
  captionSettings: {
    position: number;
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
  status: 'processing' | 'completed' | 'failed';
  falJobId: string;
  createdAt: Date;
  completedAt?: Date;
}

const VideoSchema = new Schema<IVideo>({
  userId: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  processedUrl: { type: String },
  captionSettings: { 
    position: Number,
    fontStyle: String,
    textColor: String,
    highlightColor: String,
    outlineColor: String,
    fontSize: Number,
    maxCharacters: Number,
    backgroundOpacity: Number,
    outlineWidth: Number,
    letterSpacing: Number,
    autoTranslate: Boolean,
  },
  status: { 
    type: String, 
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  falJobId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

export const VideoModel = model<IVideo>('Video', VideoSchema);