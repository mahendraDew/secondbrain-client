// import HeroSection from "@/components/hero-section";
import HeroSection from '@/components/hero-section'
import Trendy from '@/components/trendy'
// import Lamper from "@/components/lamp";
import Supercharge from '@/components/Supercharge';
import FloatingNav from '@/components/ui/floating-navbar';
// import { BackgroundBeamsDemo } from "@/components/ui/background-beam";
import { navItems } from "../site/nav";
import { TabsComp } from '@/components/Tabs';
import Footer from '@/components/Footer';


export default function Landing () {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-6 font-subalt '>
      <FloatingNav navItems={navItems} />

      <div className='flex flex-col justify-center items-center '>
        <HeroSection />
        <div className=' flex justify-center items-center' id='usecase'>
          <Trendy />
        </div>
        <div className='max-w-full mx-auto  flex flex-col justify-center items-center'>
          {/* <BackgroundBeamsDemo /> */}
        </div>
        {/* <div><Lamper /></div> */}

        <div>
        <TabsComp />
        </div>
        
        <div className=' h-[40rem] w-full mb-24 mt-40'><Supercharge /></div>

      </div>
      <Footer />
    </div>
  )
}
