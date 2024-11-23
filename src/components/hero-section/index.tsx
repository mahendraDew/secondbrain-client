
import { motion, useInView } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";
import Spotlight from "../ui/Spotlight";
import { Github } from "lucide-react";
import { Img } from 'react-image'
import { Separator } from "@radix-ui/react-separator";
import HackyButton from "../hacky-button";

export default function HeroSection() {

  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="mx-auto max-w-6xl mt-24 px-6 lg:px-8 bg-transparent relative pt-24 pb-10">
      <div className="max-w-4xl absolute">
        <Spotlight fill="#9284D4" />
      </div>
      <div className="mx-auto max-w-5xl text-center mb-24">
        <motion.div
          initial="hidden"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <div className="absolute -top-4 -z-10 flex w-full justify-center">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
          </div>
          <div className="absolute -top-4 -z-10 flex w-full justify-center">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
          </div>

          
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className=" text-4xl font-bold  bg-gradient-to-tr  from-purple-300/80 to-white/90 bg-clip-text text-transparent tracking-normal sm:text-7xl  md:text-9xl "
          >
            {/* <Feeder feed="Latest Blogs" /> */}
            <div className="mb-4"></div>
            Your Digital Mind
          </motion.h1>

          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-6 text-lg leading-8"
          >
            All your ideas, your thoughts, one step away
          </motion.p>
          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-6 text-lg leading-8"
          >
            Think it. Save it. Find it.
          </motion.p>

          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-10 flex items-center justify-center gap-x-6 "
          >
            {/* <a href="/signup">
              <button className="inline-flex h-10 animate-shimmer text-gray-900 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#ececec,45%,#adadad,55%,#ececec)] bg-[length:200%_100%] px-6 font-medium  transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)]">
                Get Started
              </button>
            </a> */}
            {/* /signup */}
            <a href="/signup">
             <HackyButton text={"Get Started"}/>
            </a>

          
            <a href="https://github.com/mahendraDew"
              target="_blank"
              className="z-40">

              <Button
                variant="link"
                className="outline-none bg-transparent hover:bg-transparent/5 z-40"
              >
                
                <p  className="flex gap-1 justify-center items-center" ><Github /> Github →</p>
              </Button>
            </a>
             

          </motion.div>

          

          {/*  */}
          {/* <TailwindcssButtons/> */}
          {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Border Magic
            </span>
          </button> */}
          {/*  */}


        </motion.div>
      </div>
      {/* <div className="mt-16 flow-root sm:mt-24">
        <motion.div
          className="rounded-md"
          initial={{ y: 100, opacity: 0 }} // Image starts from 100px below and fully transparent
          animate={{ y: 0, opacity: 1 }} // Image ends at its original position and fully opaque
          transition={{ type: "spring", stiffness: 50, damping: 20 }} // transition specifications
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
             <Image src={"./landing-page.png"} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div> */}
      <div className=" mt-52 px-6">
        {/* <Image src={"/public/landing-hero.jpeg"} alt="landing hero img" /> */}
        {/* <Image
          src="/landing-hero.jpeg"
          width={1200}
          height={1200}
          alt="Picture of the author"
          loader={<div>Loading...</div>}
        /> */}

        <Img src="./landing-hero.jpeg" width={1200} height={1200} alt="landing hero img" loader={<div>Loading...</div>} className="md:min-w-xs" />
      </div>
      <Separator />
    </div>
  );
}
