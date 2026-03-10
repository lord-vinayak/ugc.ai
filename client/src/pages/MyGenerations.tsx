import { useEffect, useState } from "react";
import { Spinner } from "../components/ui/spinner";
import { dummyGenerations } from "../assets/assets";
import type { Project } from "../types";
import BentoGallery from "../components/ui/bento-gallery";

const MyGenerations = () => {
  const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
  

    const fetchProjects = async () => {
      setTimeout(() => {
        setProjects(dummyGenerations);
        setLoading(false);
      }, 3000);
    };
  
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
    <>
    <BentoGallery title="My Generations" description="Manage your generated content" items={galleryItems} myGenerations={true} />
    </>
  )
}

export default MyGenerations