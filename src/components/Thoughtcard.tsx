import { FileText, Link2, Share2, Trash2, Twitter, Youtube } from 'lucide-react'
import { Card, CardContent, CardHeader } from './card'
import { Button } from './ui/button'

type ThoughtProp = {
  id: number,
  title: string,
  content: string,
  date: string,
  tags: string[],
  icon: keyof typeof IconType,
}

enum IconType {
    Twitter = "Twitter",
    Video = "Video",
    FileText = "FileText",
    Link = "Link",
  }

  const IconMap = {
    [IconType.Twitter]: <Twitter />,
    [IconType.Video]: <Youtube />,
    [IconType.FileText]: <FileText />,
    [IconType.Link]: <Link2 />,
  };
export default function Thoughtcard ({ thoughts }: { thoughts: ThoughtProp[] }) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {thoughts.map((thought, index) => (
          <Card className='shadow-sm' key={index}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='flex items-center text-center gap-2'>
                {/* <FileText className='h-4 w-4' /> */}
                {IconMap[thought.icon]}
                <h3 className='font-medium'>{thought.title}</h3>
              </div>
              <div className='flex gap-2'>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <Share2 className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className='text-lg font-semibold mb-2'>Future Projects</h4>
              <ul className='space-y-2 mb-4'>
                <li>• Build a personal knowledge base</li>
                <li>• Create a habit tracker</li>
                <li>• Design a minimalist todo app</li>
              </ul>
              <div className='flex gap-2'>
                {thought.tags.length !==0 && thought.tags.map((tag, idx) =>(
                    <span className='text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm'>
                    #{tag}
                    </span>

                ))}
              </div>
              <div className='text-sm text-muted-foreground mt-4'>
                Added on {thought.date}
              </div>
            </CardContent>
          </Card>
        ))}
       
      </div>
    </div>
  )
}
