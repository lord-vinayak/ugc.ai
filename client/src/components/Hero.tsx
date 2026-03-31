import { ArrowRightIcon, PlayIcon } from "lucide-react";
import { PrimaryButton, GhostButton } from "./Buttons";
import { motion } from "framer-motion";

export default function Hero() {
  const trustedUserImages = [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
  ];

  const mainImageUrl =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop";

  const galleryStripImages = [
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=80&auto=format&fit=crop',
    ];

  const trustedLogosText = [
        'Adobe',
        'Figma',
        'Canva',
        'Shopify',
        'Webflow'
    ];

    return (
        <>
            <section id="home" className="relative z-10 overflow-hidden">
                {/* Abyssal Glass Aurora Blobs */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[5000ms]" />
                    <div className="absolute top-[30%] right-[-10%] w-[40%] h-[60%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[7000ms]" />
                    <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-primary/10 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[6000ms]" />
                </div>
                
                <div className="max-w-6xl mx-auto px-4 min-h-screen max-md:w-screen max-md:overflow-hidden pt-32 md:pt-26 flex items-center justify-center relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <motion.a
                className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full bg-white/10 mb-6 justify-start"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 70,
                  mass: 1,
                }}>
                <div className="flex -space-x-2">
                  {trustedUserImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="size-6 rounded-full border border-black/50"
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-200/90">
                  Trusted by creators worldwide
                </span>
              </motion.a>

              <motion.h1
                className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 max-w-xl tracking-tight"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 70,
                  mass: 1,
                  delay: 0.1,
                }}>
                Create viral ADs <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  in seconds
                </span>
              </motion.h1>

              <motion.p
                className="text-gray-300 max-w-lg mb-8"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 70,
                  mass: 1,
                  delay: 0.2,
                }}>
                Upload product images and a model photo — our AI instantly produces professional lifestyle imagery and short-form videos optimized for commercials & Reels.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 mb-8"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 70,
                  mass: 1,
                  delay: 0.3,
                }}>
                <a href="/" className="w-full sm:w-auto">
                  <PrimaryButton className="max-sm:w-full py-3 px-7">
                    Start generating
                    <ArrowRightIcon className="size-4" />
                  </PrimaryButton>
                </a>

                <GhostButton className="max-sm:w-full max-sm:justify-center py-3 px-5">
                  <PlayIcon className="size-4" />
                  Watch demo
                </GhostButton>
              </motion.div>
            </div>

            {/* Right: modern mockup card */}
            <motion.div
              className="mx-auto w-full max-w-lg relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.5,
              }}>
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-50 -z-10" />
              <motion.div className="rounded-3xl overflow-hidden glass-panel relative">
                <div className="relative aspect-16/10 bg-black/40">
                  <img
                    src={mainImageUrl}
                    alt="agency-work-preview"
                    className="w-full h-full object-cover object-center"
                  />

                  <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-black/15 backdrop-blur-sm text-xs">
                    Social-ready • 16:9 • 9:16
                  </div>

                  <div className="absolute right-4 bottom-4">
                    <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/6 backdrop-blur-sm hover:bg-white/10 transition focus:outline-none">
                      <PlayIcon className="size-4" />
                      <span className="text-xs">Preview</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="mt-4 flex gap-3 items-center justify-start">
                {galleryStripImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 70,
                      mass: 1,
                      delay: 0.1 + i * 0.1,
                    }}
                    className="w-14 h-10 rounded-lg overflow-hidden border border-white/6">
                    <img
                      src={src}
                      alt="project-thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
                <motion.div
                  className="text-sm text-gray-400 ml-2 flex items-center gap-2"
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 70,
                    mass: 1,
                    delay: 0.2,
                  }}>
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300" />

                    <span className="relative inline-flex size-2 rounded-full bg-green-600" />
                  </div>
                  +20 more
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <motion.section
        className="border-y border-white/6 bg-white/1 max-md:mt-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full overflow-hidden py-6">
            <div className="flex gap-14 items-center justify-center animate-marquee whitespace-nowrap">
              {trustedLogosText.concat(trustedLogosText).map((logo, i) => (
                <span
                  key={i}
                  className="mx-6 text-sm md:text-base font-semibold text-gray-400 hover:text-gray-300 tracking-wide transition-colors">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
