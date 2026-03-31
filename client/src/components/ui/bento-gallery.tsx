"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Ban,
  Ellipsis,
  Film,
  ImageDownIcon,
  InfoIcon,
  Share2Icon,
  Trash2Icon,
  Upload,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../animate-ui/components/radix/dropdown-menu";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import api from "../../configs/axios";

type GalleryItem = {
  id: number | string;
  title: string;
  desc: string;
  imageUrl: string;
  videoUrl?: string;
  aspectRatio?: string; // '16:9' (vertical card) | '9:16' (horizontal card)
  uploadedImages?: string[]; // Array of image URLs uploaded by the user
  isPublished?: boolean; // Whether the item is published or not
};

interface BentoGalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
  myGenerations?: boolean;
  onDeleteItem?: (id: number | string) => void;
  onPublishToggle?: (id: number | string, isPublished: boolean) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const VideoModal = ({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl p-4"
        onClick={(e) => e.stopPropagation()}>
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            autoPlay
            controls
            loop
            className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
          />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
          />
        )}
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Close">
        <X size={24} />
      </button>
    </motion.div>
  );
};

// Reusable card for both vertical and horizontal items
const GalleryCard = ({
  item,
  onClick,
  onTogglePublish,
  onDelete,
  myGenerations,
}: {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
  onTogglePublish?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  myGenerations?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={itemVariants}
      className="group relative w-full h-full cursor-pointer overflow-hidden rounded-2xl glass-panel transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onClick(item)}
      onKeyDown={(e) => e.key === "Enter" && onClick(item)}
      tabIndex={0}
      aria-label={`View ${item.title}`}>
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute right-3 bottom-3 hidden sm:block">
        {item.uploadedImages && item.uploadedImages[0] && (
          <img
            src={item.uploadedImages[0]}
            alt="product"
            className="w-16 h-16 object-cover rounded-full animate-float "
          />
        )}
        {item.uploadedImages && item.uploadedImages[1] && (
          <img
            src={item.uploadedImages[1]}
            alt="model"
            className="w-16 h-16 object-cover rounded-full animate-float -ml-8"
            style={{ animationDelay: "3s" }}
          />
        )}
      </div>

      {/* action menu for my generations page */}

      {myGenerations && (
        <div
          className="absolute right-3 top-3 hidden sm:block "
          onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-black/60 rounded-full p-1">
              <Ellipsis className="size-5 text-white/80" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-black/90 backdrop-blur-md border border-white/20 z-10 min-w-max text-white [&_.bg-accent]:bg-white/20">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                    <ImageDownIcon size={14} />{" "}
                    {item.imageUrl && (
                      <a href={item.imageUrl} download>
                        Download image
                      </a>
                    )}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                    <Film size={14} />{" "}
                    {item.videoUrl && (
                      <a href={item.videoUrl} download>
                        Download video
                      </a>
                    )}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex items-center gap-2 cursor-pointer">
                    <Share2Icon size={14} />
                    {(item.videoUrl || item.imageUrl) && (
                      <a
                        onClick={() =>
                          navigator.share({
                            url: item.videoUrl || item.imageUrl,
                            title: item.title,
                            text: item.desc,
                          })
                        }>
                        Share
                      </a>
                    )}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <span className="flex items-center gap-2 text-red-500">
                    <Trash2Icon size={14} />
                    <button onClick={() => onDelete && onDelete(item.id)}>
                      Delete
                    </button>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      navigate(`/result/${item.id}`);
                      scrollTo(0, 0);
                    }}>
                    <InfoIcon size={14} /> View details
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onTogglePublish && onTogglePublish(item.id)}>
                    {item.isPublished ? (
                      <Ban size={14} />
                    ) : (
                      <Upload size={14} />
                    )}
                    {item.isPublished ? "Unpublish" : "Publish"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-base font-bold text-white leading-tight mt-8">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-white/80 line-clamp-2">{item.desc}</p>
      </div>
      {item.videoUrl && (
        <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 fill-white"
              viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const BentoGallery: React.FC<BentoGalleryProps> = ({
  items,
  title,
  description,
  myGenerations = false,
  onDeleteItem,
  onPublishToggle,
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(items);
  const targetRef = useRef<HTMLDivElement>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    setGalleryItems(items);
  }, [items]);

  const handleDelete = async (id: number | string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirmed) return;

    try {
      const token = await getToken();
      const { data } = await api.delete(`/api/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGalleryItems((prev) =>
        prev.filter((item) => String(item.id) !== String(id)),
      );

      onDeleteItem?.(id);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const togglePublish = async (projectId: number | string) => {
    try {
      const token = await getToken();
      const { data } = await api.get(`/api/user/publish/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGalleryItems((prev) =>
        prev.map((item) =>
          String(item.id) === String(projectId)
            ? { ...item, isPublished: data.isPublished }
            : item,
        ),
      );

      onPublishToggle?.(projectId, data.isPublished);
      toast.success(
        data.isPublished ? "Project published" : "Project unpublished",
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Separate items by aspect ratio
  // 9:16 = tall/portrait cards, 16:9 = wide/landscape cards
  const vQueue = galleryItems.filter((i) => i.aspectRatio === "9:16");
  const hQueue = galleryItems.filter(
    (i) => i.aspectRatio === "16:9" || i.aspectRatio === "1:1",
  );

  // Build rows dynamically — no empty gaps
  type Row =
    | {
        layout: "v-hh" | "hh-v";
        v: GalleryItem;
        h1: GalleryItem;
        h2: GalleryItem;
      }
    | { layout: "v-v"; v1: GalleryItem; v2: GalleryItem }
    | { layout: "v-h"; v: GalleryItem; h: GalleryItem | null }
    | { layout: "hh"; h1: GalleryItem; h2: GalleryItem | null };

  const rows: Row[] = [];
  const vs = [...vQueue];
  const hs = [...hQueue];
  let rowIndex = 0;

  while (vs.length > 0 || hs.length > 0) {
    if (vs.length > 0 && hs.length >= 2) {
      const v = vs.shift()!;
      const h1 = hs.shift()!;
      const h2 = hs.shift()!;
      rows.push({ layout: rowIndex % 2 === 0 ? "v-hh" : "hh-v", v, h1, h2 });
      rowIndex++;
    } else if (vs.length >= 2) {
      rows.push({ layout: "v-v", v1: vs.shift()!, v2: vs.shift()! });
    } else if (vs.length === 1) {
      rows.push({ layout: "v-h", v: vs.shift()!, h: hs.shift() ?? null });
    } else {
      rows.push({ layout: "hh", h1: hs.shift()!, h2: hs.shift() ?? null });
    }
  }

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section ref={targetRef} className="mt-12 mb-12 relative w-full py-12">
      {(title || description) && (
        <motion.div style={{ opacity, y }} className="px-4 text-center mb-16">
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 font-light tracking-wide">
              {description}
            </p>
          )}
        </motion.div>
      )}

      <motion.div
        className="flex flex-col gap-4 items-center px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}>
        {rows.map((row, i) => (
          <div key={i} className="flex gap-4 w-full max-w-3xl">
            {row.layout === "v-hh" && (
              <>
                <div className="w-2/5 sm:w-[260px] shrink-0 aspect-[9/16]">
                  <GalleryCard
                    item={row.v}
                    onClick={setSelectedItem}
                    onDelete={handleDelete}
                    onTogglePublish={togglePublish}
                    myGenerations={myGenerations}
                  />
                </div>
                <div className="flex flex-col gap-4 flex-1 ">
                  <div className="aspect-[16/9]">
                    <GalleryCard
                      item={row.h1}
                      onClick={setSelectedItem}
                      onDelete={handleDelete}
                      onTogglePublish={togglePublish}
                      myGenerations={myGenerations}
                    />
                  </div>
                  <div className="aspect-[16/9]">
                    <GalleryCard
                      item={row.h2}
                      onClick={setSelectedItem}
                      onDelete={handleDelete}
                      onTogglePublish={togglePublish}
                      myGenerations={myGenerations}
                    />
                  </div>
                </div>
              </>
            )}
            {row.layout === "hh-v" && (
              <>
                <div className="flex flex-col gap-4 flex-1 ">
                  <div className="aspect-[16/9]">
                    <GalleryCard
                      item={row.h1}
                      onClick={setSelectedItem}
                      onDelete={handleDelete}
                      onTogglePublish={togglePublish}
                      myGenerations={myGenerations}
                    />
                  </div>
                  <div className="aspect-[16/9]">
                    <GalleryCard
                      item={row.h2}
                      onClick={setSelectedItem}
                      onDelete={handleDelete}
                      onTogglePublish={togglePublish}
                      myGenerations={myGenerations}
                    />
                  </div>
                </div>
                <div className="w-2/5 sm:w-[260px] shrink-0 aspect-[9/16]">
                  <GalleryCard
                    item={row.v}
                    onClick={setSelectedItem}
                    onDelete={handleDelete}
                    onTogglePublish={togglePublish}
                    myGenerations={myGenerations}
                  />
                </div>
              </>
            )}
            {row.layout === "v-v" && (
              <>
                <div className="flex-1 aspect-[9/16]">
                  <GalleryCard
                    item={row.v1}
                    onClick={setSelectedItem}
                    onTogglePublish={togglePublish}
                    onDelete={handleDelete}
                    myGenerations={myGenerations}
                  />
                </div>
                <div className="flex-1 aspect-[9/16]">
                  <GalleryCard
                    item={row.v2}
                    onClick={setSelectedItem}
                    onTogglePublish={togglePublish}
                    onDelete={handleDelete}
                    myGenerations={myGenerations}
                  />
                </div>
              </>
            )}
            {row.layout === "v-h" && (
              <>
                <div className="w-2/5 sm:w-[260px] shrink-0 aspect-[9/16]">
                  <GalleryCard
                    item={row.v}
                    onClick={setSelectedItem}
                    onTogglePublish={togglePublish}
                    onDelete={handleDelete}
                    myGenerations={myGenerations}
                  />
                </div>
                {row.h && (
                  <div className="flex-1 aspect-[9/16]">
                    <GalleryCard
                      item={row.h}
                      onClick={setSelectedItem}
                      onTogglePublish={togglePublish}
                      onDelete={handleDelete}
                      myGenerations={myGenerations}
                    />
                  </div>
                )}
              </>
            )}
            {row.layout === "hh" && (
              <div className="flex flex-col gap-4 flex-1 ">
                <div className="aspect-[16/9]">
                  <GalleryCard
                    item={row.h1}
                    onClick={setSelectedItem}
                    onTogglePublish={togglePublish}
                    onDelete={handleDelete}
                    myGenerations={myGenerations}
                  />
                </div>
                {row.h2 && (
                  <div className="aspect-[16/9]">
                    <GalleryCard
                      item={row.h2}
                      onClick={setSelectedItem}
                      onDelete={handleDelete}
                      onTogglePublish={togglePublish}
                      myGenerations={myGenerations}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <VideoModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BentoGallery;
