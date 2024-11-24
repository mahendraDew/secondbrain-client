import { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'
import { motion } from 'framer-motion'
import { Img } from 'react-image'
import { cn } from '@/lib/utils'
import {
  BrainCircuit,
  Copy,
  FileText,
  Hash,
  Link,
  Plus,
  Share2,
  Twitter,
  Youtube
} from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import Thoughtcard from './Thoughtcard'
import { thoughtData } from '@/data/thoughdata'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from './ui/model'

export function SidebarComp () {
  const links = [
    {
      label: 'Tweets',
      href: '#tweets',
      icon: (
        <Twitter className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Videos',
      href: '#',
      icon: (
        <Youtube className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Documents',
      href: '#',
      icon: (
        <FileText className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Links',
      href: '#',
      icon: (
        <Link className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Tags',
      href: '#',
      icon: (
        <Hash className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    }
  ]
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row  w-screen flex-1  mx-auto  overflow-hidden h-screen bg-transparent'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden  bg-transparent'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2 '>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Mahendra Dewangan',
                href: '#',
                icon: (
                  <Img
                    src='https://assets.aceternity.com/manu.png'
                    className='h-7 w-7 flex-shrink-0 rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                )
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  )
}
export const Logo = () => {
  return (
    <a
      href={"/"}
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      {/* add logo here */}
      <div>
        <BrainCircuit className='text-gray-800 dark:text-purple-100 h-full w-full' />
      </div>
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-black dark:text-white whitespace-pre'
      >
        Secondbrain
      </motion.span>
    </a>
  )
}
export const LogoIcon = () => {
  return (
    <a
      href='/'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      {/* add logo here */}
      <div>
        <BrainCircuit className='text-gray-800 dark:text-purple-100 h-full w-full' />
      </div>
      {/* <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' /> */}
    </a>
  )
}

// Dummy dashboard component with content
const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)
  const openShareModal = () => setIsShareModalOpen(true)
  // const closeShareModal = () => setIsShareModalOpen(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date] = useState(new Date().toISOString().slice(0, 10)) // Current date as default
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [type, setType] = useState('tweet')

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
      e.preventDefault()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission, send data to the dashboard or backend
    console.log({ title, description, date, tags, type })
    onClose() // Close the modal after submission
  }

  const onClose = () => {
    setIsCreateModalOpen(false);
    setIsShareModalOpen(false);
  }

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }


  const shareBrain = () =>{
    console.log("share brain")
  }

  return (
    <div className='flex flex-1'>
      <div className='p-10 md:p-10 rounded-tl-2xl  bg-transparent flex flex-col gap-2 flex-1 w-full h-full'>
        <div className='flex gap-2'>
          <div className='h-20 w-full rounded-lg  flex justify-between items-center '>
            <div>
              <h1 className='text-xl md:text-3xl'>My brain</h1>
            </div>
            <div className='flex gap-5'>
              <a href='#new'>
                <Button
                  onClick={openCreateModal}
                  variant={'ghost'}
                  className='flex justify-center items-center gap-1 text-center rounded-md bg-transparent no-underline cursor-pointer shadow-2xl leading-6  text-white  border-[1px] border-slate-500 px-4 py-2 font-mono font-medium transition-colors hover:text-indigo-300'
                >
                  <Plus />
                  <span className='sm:inline hidden'>Create New</span>
                </Button>
              </a>
              <a href='#share'>
                <Button onClick={openShareModal}>
                  <Share2 />
                  <span className='sm:inline hidden'>Share</span>
                </Button>
              </a>
            </div>
          </div>
          <Modal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>New Thought</ModalTitle>
                <ModalDescription>
                  Save your new thought before you forget it
                </ModalDescription>
                <form
                  onSubmit={handleSubmit}
                  className='text-white px-4 sm:px-6 md:px-8 lg:px-10 py-4'
                >
                  {/* Title */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>
                      Title:
                    </label>
                    <input
                      type='text'
                      className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>
                      Description:
                    </label>
                    <textarea
                      className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                      rows={3}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Type Selection */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>
                      Type:
                    </label>
                    <select
                      className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                      value={type}
                      onChange={e => setType(e.target.value)}
                    >
                      <option value='tweet' className='bg-slate-950'>
                        Tweet
                      </option>
                      <option value='video' className='bg-slate-950'>
                        Video
                      </option>
                      <option value='link' className='bg-slate-950'>
                        Link
                      </option>
                      <option value='image' className='bg-slate-950'>
                        Image
                      </option>
                      <option value='article' className='bg-slate-950'>
                        Article
                      </option>
                    </select>
                  </div>

                  {/* Date */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>
                      Date:
                    </label>
                    <div className='mt-1 w-full px-3 py-2 border rounded-lg shadow-sm bg-transparent dark:text-white'>
                      {date}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>
                      Tags:
                    </label>
                    <div className='flex items-center gap-2'>
                      <input
                        type='text'
                        className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder='Add tags and press Enter'
                      />
                    </div>
                    <div className='flex flex-wrap mt-2 gap-2'>
                      {tags.map((tag, index) => (
                        <div
                          key={index}
                          className='flex items-center bg-purple-400/10 px-2 py-1 rounded-lg text-sm'
                        >
                          {tag}
                          <button
                            type='button'
                            onClick={() => handleRemoveTag(index)}
                            className='ml-2 text-red-600 hover:text-red-800'
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className='flex flex-col sm:flex-row justify-end gap-2'>
                    <Button
                      onClick={closeCreateModal}
                      variant={'ghost'}
                      className='flex justify-center items-center gap-1 text-center rounded-md bg-transparent no-underline cursor-pointer shadow-2xl leading-6  text-white  border-[1px] border-slate-500 px-4 py-2 font-mono font-medium transition-colors hover:text-indigo-300'
                    >
                      Cancel
                    </Button>

                    <Button type='submit'>Create</Button>
                  </div>
                </form>

                {/* <div>
                  <Input type='date' className='bg-transparent dark:text-white flex justify-between' />
                  <button>button</button>
                </div> */}
              </ModalHeader>
            </ModalContent>
          </Modal>

          <Modal open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
            <ModalContent>
              <ModalHeader className='flex justify-center items-center gap-5'>
                <ModalTitle>Share Your Second Brain</ModalTitle>
                <ModalDescription className='flex gap-7'>
                  <div className='flex flex-col gap-5'>
                    <span>
                      Share your entire collection of notes, documents, tweets,
                      and videos with others. They&apos;ll be able to import your
                      content into their own second brain.{' '}
                    </span>
                      <Button className='w-full bg-purple-200' onClick={shareBrain}>
                      <Copy />
                      Share brain
                      </Button>
                  </div>
                  <div>
                    <div className='w-32 h-32 bg-black'>QR code</div>
                  </div>
                </ModalDescription>
              </ModalHeader>
            </ModalContent>
          </Modal>
        </div>
        <Separator />
        <div className='flex gap-2 flex-1 h-full overflow-y-auto bg-slate-800/20 p-5'>
          <div className='h-full w-full rounded-lg '>

            <Thoughtcard thoughts={thoughtData} />

          </div>
        </div>
      </div>
    </div>
  )
}
