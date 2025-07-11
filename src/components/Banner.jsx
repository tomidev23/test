import { useEffect, useState } from "react";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundY = offsetY * 0.5;
  const textY = offsetY * 0.2;

  return (
    <section className="relative w-full h-screen overflow-hidden">

      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: "url('/assets/coba.png')",
          transform: `translateY(${backgroundY}px)`,
          willChange: "transform",
        }}
      />

      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      <div
        className="absolute bottom-0 w-full h-20 md:h-80 bg-white"
        style={{
          clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0% 100%)",
        }}
      />


      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-4"
        style={{
          transform: `translateY(${textY}px)`,
          willChange: "transform",
        }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Ideas
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
          Where all our great things begin
        </p>
      </div>
    </section>
  );
};

export default Banner;
