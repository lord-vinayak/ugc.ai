import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Spinner } from "../components/ui/spinner";
import BentoGallery from "../components/ui/bento-gallery";
import { useAuth, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import api from "../configs/axios";
import toast from "react-hot-toast";

const Community = () => {

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();


  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async ()=>{
    try {
      const { data } = await api.get('/api/project/published')
      setProjects(data.projects)
      setLoading(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const galleryItems = projects.map((project) => ({
    id: project.id,
    title: project.productName,
    desc: project.productDescription || "",
    imageUrl: project.generatedImage || "",
    videoUrl: project.generatedVideo || "",
    uploadedImages: project.uploadedImages || [],
    aspectRatio: project.aspectRatio,
  }));

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-7 text-indigo-400" />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12">
      {/* <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Community</h1>
        <p className="text-gray-400">See what others are creating</p>
      </header> */}
      <BentoGallery title="Community" description="See what others are creating" items={galleryItems} myGenerations={false} />
    </div>
  );
};

export default Community;
