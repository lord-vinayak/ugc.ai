import Title from "./Title";
import { usePlans } from "@clerk/react/experimental";
import { PricingTable } from "@clerk/react";

export default function Pricing() {
  const { isLoading } = usePlans({
    for: "user",
    pageSize: 10,
  });
  if (isLoading) {
    return <div>Loading plans...</div>;
  }
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Abyssal Glass Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center mt-20">
          <div className="w-[800px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[8000ms]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <Title
          title="Pricing"
          heading="Transparent Growth"
          description="Straightforward pricing designed to scale with your content needs. No hidden fees."
        />

        <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto"> 
        {/* <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"> ---use this when using custom pricing cards*/} 
          {/* {data.map((plan, index) => (
            <motion.div
              key={plan.id}
            //   ref={(el) => {
            //     refs.current[plan.id] = el;
            //   }}
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.1 + (index * 0.1),
              }}
              onAnimationComplete={() => {
                const card = refs.current[index];
                if (card) {
                  card.classList.add(
                    "transition",
                    "duration-500",
                    "hover:scale-102",
                  );
                }
              }}
              className="relative p-6 rounded-xl border backdrop-blur">
              

              <div className="mb-6">
                <p>{plan.name}</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold">{plan.fee?.currencySymbol}{plan.fee?.amountFormatted}</span>
                  
                </div>
                <p className="text-sm text-gray-300 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feat) => (
                  <li
                    key={feat.id}
                    className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-indigo-400" />
                    {feat.name}
                  </li>
                ))}
              </ul>

              <div>
                {plan.name === "Pro" ? (
                  <PrimaryButton className="w-full">Buy Now</PrimaryButton>
                ) : (
                  <GhostButton className="w-full justify-center">
                    Buy Now
                  </GhostButton>
                )}
              </div>
            </motion.div>
          ))} */}
          <PricingTable appearance={{
                    variables: {
                        colorBackground: 'transparent',
                        colorPrimary: '#ec4899',
                    },
                    elements: {
                        rootBox: "glass-panel rounded-3xl p-1",
                        pricingTableCard: "glass-panel bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]",
                        pricingTableCardBody: 'bg-transparent',
                        pricingTableCardHeader: 'bg-gradient-to-br from-white/10 to-transparent border-b border-white/10',
                        switchThumb: 'bg-primary'
                    }
                   }}/>
        </div>
      </div>
    </section>
    
  );
}
