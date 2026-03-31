import Title from "../components/Title";
import { Input } from "../components/ui/input";
import { ImageUploadDemo } from "./ImageUpload";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import { RectangleHorizontalIcon, RectangleVerticalIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";
import { motion } from "framer-motion";
import { useAuth, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../configs/axios";

const Generator = () => {
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const {user} = useUser()
  const {getToken} = useAuth()
  const navigate = useNavigate()

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "product" | "model",
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "product") setProductImage(e.target.files[0]);
      else setModelImage(e.target.files[0]);
    }
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!user) return toast('Please login to generate')

    if(!productImage || !modelImage || !name || !productName || !aspectRatio) return toast('Please fill all the required fields')
    
      try {``
        setIsGenerating(true);
        const formData = new FormData();

        formData.append('name', name)
        formData.append('productName', productName)
        formData.append('productDescription', productDescription)
        formData.append('userPrompt', userPrompt)
        formData.append('aspectRatio', aspectRatio)
        formData.append('images', productImage)
        formData.append('images', modelImage)

        const token = await getToken()

        const { data } = await api.post('/api/project/create', formData, {
           headers: { Authorization: `Bearer ${token}` }
        })

        toast.success(data.message)
        navigate('/result/' + data.projectId)

      } catch (error: any) {
        setIsGenerating(false);
        toast.error(error?.response?.data?.message || error.message)
      }
  }


  return (
    <div className="max-w-6xl mx-auto px-4 max-md:w-screen max-md:overflow-hidden min-h-screen text-white p-6 md:p-12 mt-24">
      <form onSubmit={handleGenerate} className="max-w-4xl mx-auto mb-40">
        <Title
          heading="Create In-Context Images"
          description="Upload your model and product images to generate stunning UGC, short-form videos and social media posts"
        />

        <div className="flex gap-20 max-sm:flex-col items-start justify-between max-sm:gap-8">
          {/* left col */}

          <motion.div
            className="flex flex-col w-full sm:max-w-64 gap-8 mt-8 mb-12 sm:mb-4 glass-panel p-6 rounded-2xl"
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
          <div className="w-full glass-panel p-6 md:p-10 rounded-2xl">
            <div className="mb-4 text-gray-300">
              <Label className="block text-sm mb-4" htmlFor="name">
                Project Name
              </Label>
              <Input
                className="w-full rounded-lg p-4 text-base border-white/10 focus:border-primary bg-white/5 transition-all outline-none"
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
                className="w-full rounded-lg p-4 text-base border-white/10 focus:border-primary bg-white/5 transition-all outline-none"
                placeholder="My Product Name"
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
                <span className="text-xs text-primary/70">(optional)</span>
              </Label>
              <Textarea
                size="lg"
                rows={4}
                id="productDescription"
                placeholder="This is description of the product."
                className="w-full rounded-lg p-4 text-base border-white/10 focus:border-primary bg-white/5 transition-all outline-none resize-none"
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
                  className={`p-2.5 size-13 transition-all cursor-pointer rounded-lg border ${aspectRatio === "9:16" ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]" : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"}`}
                />
                <RectangleHorizontalIcon
                  onClick={() => setAspectRatio("16:9")}
                  className={`p-2.5 size-13 transition-all cursor-pointer rounded-lg border ${aspectRatio === "16:9" ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]" : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"}`}
                />
              </div>
            </div>
            <div className="mb-4 text-gray-300">
              <Label className="block text-sm mb-4" htmlFor="userPrompt">
                User Prompt{" "}
                <span className="text-xs text-primary/70">(optional)</span>
              </Label>
              <Textarea
                size="lg"
                rows={4}
                id="userPrompt"
                placeholder="This is my prompt for image"
                className="w-full rounded-lg p-4 text-base border-white/10 focus:border-primary bg-white/5 transition-all outline-none resize-none"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-12">
          {isGenerating ? (
            <button disabled className="btn-glow px-8 py-4 bg-primary text-white font-semibold rounded-full flex items-center gap-3">
              <Spinner />
              Generating...
            </button>
          ) : (
            <button type="submit" className="btn-glow px-10 py-4 bg-primary/20 hover:bg-primary border border-primary text-white font-semibold rounded-full transition-all duration-300">
              Generate Experience
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Generator;
