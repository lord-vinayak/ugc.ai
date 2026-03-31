import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Spinner } from "../components/ui/spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImageIcon, RefreshCwIcon, SparkleIcon, VideoIcon } from "lucide-react";
import { GhostButton } from "../components/Buttons";
import { useAuth, useUser } from "@clerk/react";
import toast from "react-hot-toast";
import api from "../configs/axios";

const Results = () => {
   const { projectId } = useParams();
    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
  const [project, setProjectData] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchProjectData = async () => {
        try {
            const token = await getToken();
            const { data } = await api.get(`/api/user/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjectData(data.project);
            setIsGenerating(data.project.isGenerating);
            setLoading(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    };



  const handleGenerateVideo = async () => {
        setIsGenerating(true);
        try {
            const token = await getToken();
            const { data } = await api.post(
                "/api/project/video",
                { projectId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setProjectData((prev) => ({ ...prev, generatedVideo: data.videoUrl, isGenerating: false }));

            toast.success(data.message);
            setIsGenerating(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    };

       useEffect(() => {
        if (user && !project.id) {
            fetchProjectData();
        } else if (isLoaded && !user) {
            navigate("/");
        }
    }, [user]);


    // Fetch project every 10 seconds
    useEffect(() => {
        if (user && isGenerating) {
            const interval = setInterval(() => {
                fetchProjectData();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [user, isGenerating]);

    
  return loading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner className="size-7 text-indigo-400" />
    </div>
  ) : (
    <div className="min-h-screen  text-white p-6 md:p-12 mt-20">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Generation List</h1>
          <Link
            to="/create"
            className="btn-secondary text-sm flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
            <p className="max-sm:hidden">New Generation</p>
          </Link>
        </header>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* main result display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel inline-block p-2 rounded-2xl">
              <div
                className={`${project?.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"} sm:max-h-200 rounded-xl bg-gray-900 overflow-hidden relative`}>
                {project?.generatedVideo ? (
                  <video
                    src={project.generatedVideo}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"></video>
                ) : (
                  <img
                    src={project.generatedImage}
                    alt="Generated Image"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
          {/* sidebar */}
          <div className="space-y-6">
            {/* download button */}
            <div className="glass-panel p-6 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-4 tracking-wide">Actions</h3>
              <div className="flex flex-col gap-3">
                <a href={project.generatedImage} download>
                  <GhostButton disabled={!project.generatedImage} className="w-full justify-center rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ImageIcon className="w-5 h-5"/>
                    Download Image
                  </GhostButton>
                </a>
                <a href={project.generatedVideo} download>
                  <GhostButton disabled={!project.generatedVideo} className="w-full justify-center rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    <VideoIcon className="w-5 h-5"/>
                    Download Video
                  </GhostButton>
                </a>
              </div>
            </div>
            {/* video generate button */}
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
                {/* inner glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10 group-hover:bg-primary/30 transition-all duration-500" />
                
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <VideoIcon className="size-24"/>
                </div>
                <h3 className="text-2xl font-semibold mb-2 tracking-wide">Generate Video</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Turn this static image into a dynamic video for social media.
                </p>
                {!project.generatedVideo ? (
                  <button onClick={handleGenerateVideo} disabled={isGenerating} className="btn-glow bg-primary/20 hover:bg-primary border border-white/20 w-full py-4 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2">
                                    {isGenerating ? (
                                        <>Generating Video...</>
                                    ) : (
                                        <>
                                            <SparkleIcon className="size-5" /> Generate Video
                                        </>
                                    )}
                                </button>
                  
                ):(
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center text-sm font-medium backdrop-blur-md">
                    Video was generated successfully! 
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
