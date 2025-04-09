import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  // Don't worry — services array is unchanged and preserved exactly.
  {
    title: "Web Development & Social Marketing",
    description:
      "Web development builds and optimizes websites, while social media marketing leverages platforms to enhance brand visibility and audience engagement.",
    image: "/image1.jpeg",
  },
  {
    title: "Branding",
    description:
      "Branding is the process of creating a unique identity for a company or product, shaping how it is perceived by consumers.",
    image: "/image2.jpeg",
  },
  {
    title: "Exclusive Networking & Industry Collaboration",
    description:
      "Exclusive networking and industry collaboration create powerful alliances that drive innovation, enhance business opportunities, and foster growth within a specific sector.",
    image: "/image3.jpeg",
  },
  {
    title: "Client Acquisition & Lead Generation",
    description:
      "Client acquisition and lead generation involve attracting and converting prospects into clients through targeted marketing and effective sales strategies.",
    image: "/image4.jpeg",
  },
  {
    title: "Project Showcasing & Portfolio Management",
    description:
      "Project showcasing and portfolio management involve curating and presenting your best work in a well-organized manner to demonstrate expertise and attract opportunities.",
    image: "/image5.jpeg",
  },
  {
    title: "Hiring & Talent Acquisition",
    description:
      "Hiring and talent acquisition focus on identifying, attracting, and recruiting top talent to meet an organization's staffing needs and drive business success.",
    image: "/image6.jpeg",
  },
  {
    title: "Project Binding & Business Expansion",
    description:
      "Project bidding and business expansion involve submitting competitive bids for projects while pursuing opportunities to grow and diversify the business in new markets.",
    image: "/image7.jpeg",
  },
  {
    title: "Industry Events & Growth Opportunities",
    description:
      "Industry events and growth opportunities provide platforms for networking, learning, and discovering new avenues for business development and market expansion",
    image: "/image8.jpeg",
  },
  {
    title: "Property Listing (Buy, Sell, Rent and Lease)",
    description:
      "Property listing involves showcasing properties for sale, rent, or lease, helping buyers, sellers, and renters connect to meet their real estate needs.",
    image: "/image9.jpeg",
  },
  {
    title: "Ecommerce",
    description:
      "Ecommerce is the buying and selling of goods and services online, enabling businesses to reach a global audience and streamline transactions.",
    image: "/image10.jpeg",
  },
];

const Scrolling = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop && container && wrapper) {
      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollLength = totalWidth - viewportWidth;

      gsap.to(container, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full min-h-screen bg-gray-50 flex flex-col lg:flex-row items-start lg:items-center overflow-hidden"
    >
      {/* LEFT SIDE TITLE */}
      <div className="flex-shrink-0 w-full lg:w-[500px] h-[200px] lg:h-full flex items-center bg-white z-20 px-6 lg:pl-20">
        <h2 className="text-[40px] lg:text-[80px] font-extrabold tracking-tight leading-tight text-gray-900">
          OUR <br className="hidden lg:block" /> SERVICES
        </h2>
      </div>

      {/* CARDS SCROLLER */}
      <div
        ref={containerRef}
        className="flex gap-6 lg:gap-20 px-6 pb-10 pt-6 lg:pt-0 h-full items-start lg:items-center overflow-x-auto lg:overflow-visible"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="w-[280px] lg:w-[320px] h-auto lg:h-[500px] flex-shrink-0 p-4 flex flex-col backdrop-blur-md  shadow-md"
          >
            <div className="w-full h-[200px] lg:h-[300px] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg lg:text-xl font-bold">{service.title}</h3>
              <p className="text-gray-700 text-base lg:text-lg line-clamp-4 mt-2">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Scrolling;
