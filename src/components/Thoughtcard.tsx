import {
  FileText,
  Link,
  Trash2,
  Twitter,
  Youtube,
  FileImage,
  ArrowUpRight
} from 'lucide-react'
import { Card, CardContent, CardHeader } from './card'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
// import { useState } from 'react'
import axios from 'axios'
import { ApiRoutes } from '@/utils/routeAPI'
import { useEffect, useState } from 'react'
import { ThoughtCardType } from './type/thougthtype'

type Type = {
  _id: string
  title: string
}
type ThoughtProp = {
  _id: string
  link: string
  title: string
  description?: string
  date: string
  tags?: Type[]
  type: string
}
const iconMap: { [key: string]: React.ElementType } = {
  tweet: Twitter,
  video: Youtube,
  link: Link,
  article: FileText, // Map additional icons here
  image: FileImage
}
// type ThoughtProp = {
//   id: number
//   title: string
//   description?: string
//   date: string
//   tags?: string[]
//   icon: string
// }
// const iconMap: { [key: string]: React.ElementType } = {
//   twitter: Twitter,
//   video: Youtube,
//   link: Link,
//   article: FileText // Map additional icons here
// }

// enum IconType {
//     Twitter = "Twitter",
//     Video = "Video",
//     FileText = "FileText",
//     Link = "Link",
//   }

//   const IconMap = {
//     [IconType.Twitter]: <Twitter />,
//     [IconType.Video]: <Youtube />,
//     [IconType.FileText]: <FileText />,
//     [IconType.Link]: <Link2 />,
//   };
export default function Thoughtcard ({
  thoughts,
  setThoughtData,
  selectedType
}: {
  thoughts: ThoughtProp[]
  setThoughtData: React.Dispatch<React.SetStateAction<ThoughtProp[]>>
  selectedType: ThoughtCardType
}) {
  const userData = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null // Check if user data exists in localStorage
  const userId = userData ? userData.id : null
  const [loading, setLoading] = useState(false)
  const [deleteCardInx, setDeleteCardInx] = useState<number>()

  // const [removeContentId, setRemoveContentId] = useState<string>('');

  const removeThought = async (id: string, index: number) => {
    setLoading(true)
    setDeleteCardInx(index)
    // setRemoveContentId(id);
    const deleteContent = {
      contentId: id,
      userId
    }
    try {
      const response = await axios.delete(ApiRoutes.remove, {
        data: deleteContent
      })

      if (response.status === 200 || response.statusText === 'OK') {
        setThoughtData(prevThoughtData =>
          prevThoughtData.filter(item => item._id !== id)
        )
      } else {
        console.log('Error deleting thought')
      }
    } catch (error) {
      console.log('Error:', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    console.log('selectedType: ', selectedType)
  }, [])

  return (
    <div className='h-full '>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  '>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-red-400 '> */}
        {thoughts
          .slice()
          .reverse()
          .map((thought, index) => {
            const IconComponent = iconMap[thought.type] || FileText // Fallback to a default icon if not found
            const date = new Date(thought.date)
            if (loading) {
              if (deleteCardInx === index) {
                return (
                  <div className='w-full h-full rounded-lg flex justify-center items-center animate-pulse bg-slate-300/10'></div>
                )
              }
            }

            if (!selectedType || thought.type === selectedType) {
              console.log("selectedType is: ", selectedType + thought.type)
              return (
                <Card className='shadow-sm' key={index}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <div className='flex items-center text-center gap-2'>
                      {/* <FileText className='h-4 w-4' /> */}
                      <IconComponent className='h-4 w-4' />{' '}
                      {/* Render the corresponding icon */}
                      <h3 className='font-medium'>{thought.title}</h3>
                    </div>
                    <div className='flex gap-2'>
                      <a href={thought.link} target='_blank'>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <ArrowUpRight className='h-4 w-4' />
                        </Button>
                      </a>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => removeThought(thought._id, index)}
                      >
                        <Trash2 className='h-4 w-4 text-red-600' />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Separator className='mb-5' />
                    <p className='mb-2'>{thought.description}</p>
                    <div className='flex gap-2 mt-5 flex-wrap'>
                      {thought.tags &&
                        thought.tags.map((tag, idx) => (
                          <span
                            className='text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm'
                            key={idx}
                          >
                            #{tag.title}
                          </span>
                        ))}
                    </div>
                    <div className='text-sm text-muted-foreground mt-4'>
                      Added on {date.toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              )
            }

            // if(selectedType && selectedType === null){
            //   console.log("selectedType is nulllllll")
            //   return (
            //     <Card className='shadow-sm' key={index}>
            //       <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            //         <div className='flex items-center text-center gap-2'>
            //           {/* <FileText className='h-4 w-4' /> */}
            //           <IconComponent className='h-4 w-4' />{' '}
            //           {/* Render the corresponding icon */}
            //           <h3 className='font-medium'>{thought.title}</h3>
            //         </div>
            //         <div className='flex gap-2'>
            //           <a href={thought.link} target='_blank'>
            //             <Button variant='ghost' size='icon' className='h-8 w-8'>
            //               <ArrowUpRight className='h-4 w-4' />
            //             </Button>
            //           </a>
            //           <Button
            //             variant='ghost'
            //             size='icon'
            //             className='h-8 w-8'
            //             onClick={() => removeThought(thought._id, index)}
            //           >
            //             <Trash2 className='h-4 w-4 text-red-600' />
            //           </Button>
            //         </div>
            //       </CardHeader>
            //       <CardContent>
            //         <Separator className='mb-5' />
            //         <p className='mb-2'>{thought.description}</p>
            //         <div className='flex gap-2 mt-5 flex-wrap'>
            //           {thought.tags &&
            //             thought.tags.map((tag, idx) => (
            //               <span
            //                 className='text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm'
            //                 key={idx}
            //               >
            //                 #{tag.title}
            //               </span>
            //             ))}
            //         </div>
            //         <div className='text-sm text-muted-foreground mt-4'>
            //           Added on {date.toLocaleDateString()}
            //         </div>
            //       </CardContent>
            //     </Card>
            //   )
            // }
          })}
      </div>
    </div>
  )
}
