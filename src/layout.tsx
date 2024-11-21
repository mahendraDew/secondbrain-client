import React from 'react'
import { ThemeProvider } from './components/theme-provider'

import './fonts.css'
import './index.css'

interface RootLayoutProps {
  children: React.ReactNode
}
const MainLayout = ({ children }: RootLayoutProps) => {
  return (
    <div
      className={`antialiased z-0 overflow-x-hidden overflow-y-auto  relative h-full w-full bg-slate-950 text-slate-900 dark:text-slate-50
          font-subheading`}
    >
      {/* <div className="absolute bottom-0 left-[-10%] right-0 top-[1%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgb(255, 0, 183),rgba(255,255,255,0))] "></div>
            <div className="absolute bottom-0 right-[-10%] top-[-5%]  h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255, 0, 0, 0.589),rgba(255,255,255,0))] "></div> */}
      <div className='absolute bottom-0 left-[-10%] right-0 top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] '></div>
      <div className='absolute bottom-0 right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
      <div className='flex justify-center items-center z-10'>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          {/* <div className="container mx-auto py-[-50px] px-0"> */}
          {/* <header>
                        <FloatingNav navItems={navItems} />
                        </header> */}
          {/* <div className="w-24 h-24">
                        <BrainCircuit className="h-full w-full" />
                        </div> */}

          <main className='z-10'>{children}</main>

          {/* </div> */}
        </ThemeProvider>
      </div>
    </div>
  )
}

export default MainLayout
