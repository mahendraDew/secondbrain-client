import { FileText, Link, Share2, Trash2, Twitter, Youtube } from 'lucide-react'
import { Card, CardContent, CardHeader } from './card'
import { Button } from './ui/button'

type ThoughtProp = {
  id: number
  title: string
  description?: string
  date: string
  tags?: string[]
  icon: string
}
const iconMap: { [key: string]: React.ElementType } = {
  Twitter,
  Video: Youtube,
  Link: Link,
  Article: FileText // Map additional icons here
}

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
export default function Thoughtcard ({ thoughts }: { thoughts: ThoughtProp[] }) {
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {thoughts.map((thought, index) => {
          const IconComponent = iconMap[thought.icon] || FileText // Fallback to a default icon if not found

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
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <Share2 className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <Trash2 className='h-4 w-4 text-red-600' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* <h4 className='text-lg font-semibold mb-2'>Future Projects</h4> */}
                <p className='mb-2'>{thought.description}</p>
                <div className='flex gap-2'>
                  {thought.tags &&
                    thought.tags.map((tag, idx) => (
                      <span
                        className='text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm'
                        key={idx}
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
                <div className='text-sm text-muted-foreground mt-4'>
                  Added on {thought.date}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
