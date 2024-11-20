import React from "react";
import { ThemeProvider } from "./components/theme-provider"; 
import FloatingNav from "./components/ui/floating-navbar";
import { navItems } from "./site/nav";

import "./fonts.css"; 
import "./index.css"



interface RootLayoutProps {
    children: React.ReactNode;
}
const MainLayout = ({ children }: RootLayoutProps) => {
    return (

     
        <div
        className={`antialiased z-0 overflow-x-hidden overflow-y-auto  relative h-full w-full bg-slate-950 text-slate-900 dark:text-slate-50
          font-subheading`}
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
