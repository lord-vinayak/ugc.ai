import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import { Spinner } from "../components/ui/spinner";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "../components/ui/card";

const Community = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [Loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setTimeout(() => {
      setProjects(dummyGenerations);
      setLoading(false);
    }, 3000);
  };

  const handleVideoHover = (
    videoElement: HTMLVideoElement,
    isHovering: boolean,
  ) => {
    if (isHovering) {
      videoElement.play();
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.load();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return Loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-7 text-indigo-400" />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12 my-28">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Community</h1>
        <p className="text-gray-400">See what others are creating</p>
      </header>

      {/* projects list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="mb-12 p-6">
            <Card>
              <CardHeader>
                <CardTitle>{project.productName}</CardTitle>
                <CardDescription>{project.productDescription}</CardDescription>
              </CardHeader>
              <CardPanel>
                <div
                  onMouseEnter={(e) => {
                    setHoveredId(project.id);
                    const video = e.currentTarget.querySelector("video");
                    if (video) handleVideoHover(video, true);
                  }}
                  onMouseLeave={(e) => {
                    setHoveredId(null);
                    const video = e.currentTarget.querySelector("video");
                    if (video) handleVideoHover(video, false);
                  }}>
                  <video
                    src={project.generatedVideo || ""}
                    muted
                    poster={project.generatedImage || ""}
                    loop
                    preload="metadata"
                  />
                </div>
              </CardPanel>
              <CardFooter>Footer</CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
