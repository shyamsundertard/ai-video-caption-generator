import { CaptionSettings } from "@/components/CaptionSettings";
import { VideoUploadSection } from "@/components/VideoUploadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            AI Video Caption Generator
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Add professional captions to your video using AI
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          {/* Components */}
          <VideoUploadSection/>
          <CaptionSettings/>
        </div>
      </div>
    </div>
  );
}