import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development & Social Marketing",
    description: "Web dev builds websites, social media grows your brand.",
    image: "/image1.jpeg",
  },
  {
    title: "Branding",
    description: "Craft a unique identity for your brand.",
    image: "/image2.jpeg",
  },
  {
    title: "Exclusive Networking",
    description: "Collaborate with industry leaders & boost visibility.",
    image: "/image3.jpeg",
  },
  {
    title: "Lead Generation",
    description: "Turn visitors into paying customers.",
    image: "/image4.jpeg",
  },
  {
    title: "Portfolio Management",
    description: "Showcase your work like a pro.",
    image: "/image5.jpeg",
  },
  {
    title: "Talent Acquisition",
    description: "Find and hire top industry talent.",
    image: "/image6.jpeg",
  },
  {
    title: "Business Expansion",
    description: "Grow your reach and income streams.",
    image: "/image7.jpeg",
  },
  {
    title: "Industry Events",
    description: "Tap into growth and networking opportunities.",
    image: "/image8.jpeg",
  },
  {
    title: "Property Listings",
    description: "Buy, sell, or rent real estate with ease.",
    image: "/image9.jpeg",
  },
  {
    title: "Ecommerce",
    description: "Sell online with modern store setups.",
    image: "/image10.jpeg",
  },
];

const Scrolling = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      const container = containerRef.current;
      const totalWidth = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full min-h-screen bg-gray-50 flex flex-col lg:flex-row items-start lg:items-center"
    >
      {/* Left Title */}
      <div className="flex-shrink-0 w-full lg:w-[500px] h-auto lg:h-full flex items-center bg-white z-20 px-6 lg:pl-20 pt-10 lg:pt-0">
        <h2 className="text-3xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
          OUR <br className="hidden lg:block" /> SERVICES
        </h2>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={containerRef}
        className="flex gap-6 lg:gap-16 px-6 pb-10 pt-6 lg:pt-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="snap-start w-[280px] lg:w-[320px] flex-shrink-0 bg-white border rounded-lg shadow p-4"
          >
            <div className="w-full h-[180px] lg:h-[240px] overflow-hidden rounded-md bg-gray-200">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="text-gray-700 text-sm mt-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Scrolling;
