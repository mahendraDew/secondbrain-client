import React from "react";
import { ThemeProvider } from "./components/theme-provider"; // Ensure the correct path to your ThemeProvider
import { BrainCircuit } from "lucide-react";
import FloatingNav from "./components/ui/floating-navbar";
import { navItems } from "./site/nav";
// import "./globals.css"; // Global styles
import "./fonts.css"; // Import fonts.css for the custom fonts
import "./index.css"


// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Secondbrain",
//   description: "a place where farms comes to reality",
// };

// const fontHeading = localFont({
//   src: "../../public/assets/fonts/CalSans-SemiBold.ttf",
//   variable: "--font-heading",
// });
// const fontHeadingAlt = localFont({
//   src: "../../public/assets/fonts/cd-semi.otf",
//   variable: "--font-headingAlt",
// });

// const fontSubHeading = localFont({
//   src: "../../public/assets/fonts/product-font.ttf",
//   variable: "--font-subheading",
// });
// const fontSubAlt = localFont({
//   src: "../../public/assets/fonts/jakarta.ttf",
//   variable: "--font-subalt",
// });

interface RootLayoutProps {
    children: React.ReactNode;
}
const MainLayout = ({ children }: RootLayoutProps) => {
    return (

        // <div className="antialiased overflow-x-hidden overflow-y-auto h-[100%] relative h-full w-full bg-slate-950 text-slate-900 dark:text-slate-50">
        // <div className="absolute bottom-0 left-[-10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        // <div className="absolute bottom-0 right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
  
        
        // <div
        //     //from-black to-purple-950 text-slate-900
        //     // prev bg - from-black to-purple-950
        //     className={`antialiased  overflow-x-hidden overflow-y-auto h-[100%]  relative h-full w-full bg-slate-950     text-slate-900 dark:text-slate-50 ${inter.className} ${fontHeading.variable} ${fontSubHeading.variable} ${fontHeadingAlt.variable} ${fontSubAlt.variable}  `}
        // >
        <div
        className={`antialiased z-0 overflow-x-hidden overflow-y-auto h-[100%] relative h-full w-full bg-slate-950 text-slate-900 dark:text-slate-50
          font-subheading`} // Apply the font class globally
      >
            <div className="absolute bottom-0 left-[-10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div className="container mx-auto py-[-50px] px-0">
                    <header>
                        {/* <div className="ps-10 pt-5">
                            <BrainCircuit size={64} />
                        </div> */}
                        <FloatingNav navItems={navItems} />
                    </header>
                    <main>{children}</main>
                    <footer className=" py-3 text-center">
                      <p className="text-gray-600">&copy; 2024 secondbrain. All rights reserved. build by <a href="https://x.com/mahendra_dew" className="underline hover:text-white transition-colors">Mahendra</a></p>
                    </footer>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default MainLayout;
