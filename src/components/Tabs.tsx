'use client'

import { Img } from 'react-image'
import { Tabs } from './ui/animated-tabs'
import { Bookmark, Lightbulb, User } from 'lucide-react'
import { TextGenerateEffect } from './ui/text-gen'
import { Separator } from './ui/separator'

export function TabsComp () {
  const tabs = [
    {
      icon: <Lightbulb />,
      title: 'Ideation',
      value: 'Ideation',
      description:
        'Never lose a great idea again - Instead of saving it in your head, save it in your secondbrain.',
      subdescription:
        "The internet is full of great ideas, but there's a problem. THey are ephemeral. They come and go.",
      content: (
        // <div className='w-full overflow-hidden relative h-full rounded-2xl text-xl md:text-4xl font-bold text-white/70 bg-gradient-to-br from-purple-800/70 to-violet-900/70'>
        //   {/* <p>Ideation</p> */}
        //   <DummyContent />
        // </div>
        <Img
          src='/landing-hero.jpeg'
          alt='dummy image'
          width='1000'
          height='1000'
          className='object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto'
        />
      )
    },
    {
      icon: <Bookmark />,
      title: 'Bookmarks',
      value: 'Bookmarks',
      description: 'Simply great bookmarking tool.',
      subdescription:
        'Good bookmarking tools have ways to import and organise your bookmarks. Great bookmarking tool resurfaces them when you need them.',
      content: (
        // <div className='w-full overflow-hidden relative h-full rounded-2xl text-xl md:text-4xl font-bold text-white/70 bg-gradient-to-br from-purple-800/70 to-violet-900/70'>
        //   {/* <p>Bookmarks</p> */}
        //   <DummyContent />
        // </div>
        <Img
          src='/landing-hero.jpeg'
          alt='dummy image'
          width='1000'
          height='1000'
          className='object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto'
        />
      )
    },
    {
      icon: <User />,
      title: 'Contacts',
      value: 'Contacts',
      description: 'Life is all about the people you know.',
      subdescription:
        'Tell your secondbrain about people you know, and when you forget, you know where to look.',
      content: (
        // <div className='w-full overflow-hidden relative h-full rounded-2xl text-xl md:text-4xl font-bold text-white/70 bg-gradient-to-br from-purple-800/70 to-violet-900/70'>
        //   {/* <p>Contacts</p> */}
        //   <DummyContent />
        // </div>
        <Img
          src='/landing-hero.jpeg'
          alt='dummy image'
          width='1000'
          height='1000'
          className='object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto'
        />
      )
    }
  ]

  return (
    <div className='h-[40rem] md:h-[70rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start  mb-64'>
      <div className='flex flex-col gap-5 justify-center items-center container max-w-4xl py-6 lg:py-10 mt-24'>
        <h1 className='relative z-10 text-2xl md:text-7xl font-headingAlt  bg-clip-text text-transparent bg-gradient-to-b from-purple-300/90 to-white/90  text-center font-bold'>
          <TextGenerateEffect
            words='Second brain remembers everything'
            className=' text-3xl md:text-6xl font-headingAlt  bg-clip-text text-transparent bg-gradient-to-b from-purple-300/90 to-white/90  text-center '
          />
        </h1>
        <Separator />
        <div className='flex items-center justify-center text-center'>
          <p>
            So you don't have to. Whether you're a student, a professional, or
            just a person on the the internet. we got you covered.
          </p>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </div>
    // <div className="h-[40rem] md:h-[50rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">

    //   <Tabs tabs={tabs} />
    // </div>
  )
}

// const DummyContent = () => {
//   return (
//     <Img
//       src='/landing-hero.jpeg'
//       alt='dummy image'
//       width='1000'
//       height='1000'
//       className='object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto'
//     />
//   )
// }
