import { useEffect, useState } from "react";
import { Spinner } from "../components/ui/spinner";
import type { Project } from "../types";
import BentoGallery from "../components/ui/bento-gallery";
import { useAuth, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../configs/axios";

const MyGenerations = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGenerations = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/user/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyGenerations();
    } else if (isLoaded && !user) {
      navigate("/");
    }
  }, [user]);

  const handleDeleteFromGallery = (id: number | string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const handlePublishToggle = (id: number | string, isPublished: boolean) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, isPublished } : project,
      ),
    );
  };

  const galleryItems = projects.map((project) => ({
    id: project.id,
    title: project.productName,
    desc: project.productDescription || "",
    imageUrl: project.generatedImage || "",
    videoUrl: project.generatedVideo || "",
    uploadedImages: project.uploadedImages || [],
    aspectRatio: project.aspectRatio,
    isPublished: project.isPublished,
  }));

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-7 text-indigo-400" />
    </div>
  ) : (
    <>
      <BentoGallery
        title="My Generations"
        description="Manage your generated content"
        items={galleryItems}
        myGenerations
        onDeleteItem={handleDeleteFromGallery}
        onPublishToggle={handlePublishToggle}
      />
    </>
  );
};

export default MyGenerations;
