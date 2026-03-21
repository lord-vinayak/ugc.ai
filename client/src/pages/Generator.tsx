import Title from "../components/Title";
import { Input } from "../components/ui/input";
import { ImageUploadDemo } from "./ImageUpload";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import { RectangleHorizontalIcon, RectangleVerticalIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";
import AiButton from "../components/ai-button";
import { motion } from "framer-motion";

const Generator = () => {
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "product" | "model",
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "product") setProductImage(e.target.files[0]);
      else setModelImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 max-md:w-screen max-md:overflow-hidden min-h-screen text-white p-6 md:p-12 mt-24">
      <form className="max-w-4xl mx-auto mb-40">
        <Title
          heading="Create In-Context Image"
          description="Upload your model and product images to generate stunning UGC, short-form videos and social media posts"
        />

        <div className="flex gap-20 max-sm:flex-col items-start justify-between max-sm:gap-8">
          {/* left col */}

          <motion.div
            className="flex flex-col w-full sm:max-w-64 gap-8 mt-8 mb-12 sm:mb-4"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 70,
              mass: 1,
            }}>
            <ImageUploadDemo
              label="Product Image"
              file={productImage}
              onClear={() => setProductImage(null)}
              onChange={(e) => handleFileChange(e, "product")}
              UploadTitle="Product Image"
            />
            <ImageUploadDemo
              label="Background Image"
              file={modelImage}
              onClear={() => setModelImage(null)}
              onChange={(e) => handleFileChange(e, "model")}
              UploadTitle="Background Image"
            />
          </motion.div>

          {/* right col */}
          <motion.a></motion.a>
          <div className="w-full">
            <div className="mb-4 text-gray-300">
              <Label className="block text-sm mb-4" htmlFor="name">
                Project Name
              </Label>
              <Input
                className="w-full rounded-lg border-2 p-4 text-lg  border-violet-200/10 focus-visible:border-violet-500 focus-visible:outline-none transition-all bg-white/3"
                placeholder="My Project"
                size="lg"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4 text-gray-300">
              <Label className="block text-sm mb-4" htmlFor="productName">
                Product Name
              </Label>
              <Input
                className="w-full rounded-lg border-2 p-4 text-lg  border-violet-200/10 focus:border-violet-500/50 outline-none transition-all bg-white/3"
                placeholder="My Product"
                size="lg"
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-4 text-gray-300">
              <Label
                className="block text-sm mb-4"
                htmlFor="productDescription">
                Product Description{" "}
                <span className="text-xs text-violet-400">(optional)</span>
              </Label>
              <Textarea
                size="lg"
                rows={4}
                id="productDescription"
                placeholder="This is description of the product."
                className="w-full bg-white/3 rounded-lg border-2 p-4 text-lg border-violet-200/10 focus:border-violet-500/50 outline-none resize-none transition-all"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className="mb-4 text-gray-300">
              <Label className="block text-sm mb-4" htmlFor="aspectRatio">
                Aspect Ratio
              </Label>
              <div className="flex gap-3">
                <RectangleVerticalIcon
                  onClick={() => setAspectRatio("9:16")}
                  className={`p-2.5 size-13 bg-white/6 rounded transition-all ring-2 ring-transparent cursor-pointer ${aspectRatio === "9:16" ? "ring-violet-500/50 bg-white/10" : ""}`}
                />
                <RectangleHorizontalIcon
                  onClick={() => setAspectRatio("16:9")}
                  className={`p-2.5 size-13 bg-white/6 rounded transition-all ring-2 ring-transparent cursor-pointer ${aspectRatio === "16:9" ? "ring-violet-500/50 bg-white/10" : ""}`}
                />
              </div>
            </div>
            <div className="mb-4 text-gray-300">
              <Label className="block text-sm mb-4" htmlFor="userPrompt">
                User Prompt{" "}
                <span className="text-xs text-violet-400">(optional)</span>
              </Label>
              <Textarea
                size="lg"
                rows={4}
                id="userPrompt"
                placeholder="This is my prompt for image"
                className="w-full bg-white/3 rounded-lg border-2 p-4 text-lg border-violet-200/10 focus:border-violet-500/50 outline-none resize-none transition-all"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          {isGenerating ? (
            <>
              <button className="group relative my-8 rounded-full bg-gradient-to-r from-blue-300/30 via-blue-500/30 via-40% to-purple-500/30 p-1 text-white transition-transform hover:scale-110 active:scale-105">
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 via-40% to-purple-500 px-4 py-2 text-white">
                  <Spinner />
                  <span className="font-semibold">Generating</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <AiButton />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Generator;
