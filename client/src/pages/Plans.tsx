import Pricing from "../components/Pricing";

const Plans = () => {
  return (
    <div className="max-sm:py-10 sm:pt-20 min-h-screen">
      <Pricing />
      <div className="glass-panel max-w-lg mx-auto rounded-3xl mt-12 mb-32 p-8 text-center bg-white/5 border border-white/10 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
         </div>
        
        <p className="text-gray-400 text-lg mx-auto font-light leading-relaxed">
            Create stunning images for just{" "}
            <span className="text-primary font-semibold text-white tracking-wide">5 credits</span> and
            generate immersive videos for{" "}
            <span className="text-primary font-semibold text-white tracking-wide">10 credits</span>.
        </p>
      </div>
    </div>
  );
};

export default Plans;
