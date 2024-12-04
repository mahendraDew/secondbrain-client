import { useEffect, useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'
import { motion } from 'framer-motion'
// import { Img } from 'react-image'
import { cn } from '@/lib/utils'
import {
  BadgeX,
  BrainCircuit,
  Copy,
  FileText,
  Frown,
  Hash,
  Link,
  Loader2,
  Plus,
  Share2,
  Twitter,
  User,
  X,
  Youtube
} from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import Thoughtcard from './Thoughtcard'
// import { thoughtData } from '@/data/thoughdata'

import axios from 'axios'
import { ApiRoutes } from '@/utils/routeAPI'
import { ThoughtProp } from './type/thougthtype'
import { Switch } from './ui/switch'

export function DashboardComp () {
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
  const userData = JSON.parse(localStorage.getItem('user') || '{}') // Replace with your key

  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row  w-screen flex-1  mx-auto   h-screen bg-transparent'
        // 'rounded-md flex flex-col md:flex-row  w-screen flex-1  mx-auto  overflow-hidden h-screen bg-transparent'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10 '>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden  bg-transparent'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2 '>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className=''>
            <SidebarLink
              link={{
                label: userData.username,
                href: '/',
                icon: (
                  // <Img
                  //     src='https://assets.aceternity.com/manu.png'
                  //     className='h-7 w-7 flex-shrink-0 rounded-full'
                  //     width={50}
                  //     height={50}
                  //     alt='Avatar'
                  // />
                  <span className='bg-gray-600 p-1 rounded-full'>
                    <User />
                  </span>
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
      href={'/'}
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      {/* add logo here */}
      <div>
        <BrainCircuit className='text-gray-800 dark:text-purple-100 h-full w-full' />
      </div>
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
    </a>
  )
}

// Dummy dashboard component with content
const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //form data (title(string), desc(string), date(date), tags({id,string}), link )
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date] = useState(new Date().toISOString().slice(0, 10))
  const [alltagsId, setAlltagsId] = useState<string[]>([])
  const [type, setType] = useState('tweet')
  const [link, setLink] = useState('')
  const [validateFormErr, setValidateFormErr] = useState<{
    [key: string]: string
  }>({})

  const [createCardLoading, setCreateCardLoading] = useState(false)

  // const [tags, setTags] = useState<string[]>([])
  const [thoughtData, setThoughtData] = useState<ThoughtProp[]>([])
  const [newDataUpdated, setNewDataUpdated] = useState(0)

  // const [tagInput, setTagInput] = useState('')

  const [alltags, setAllTags] = useState<{ _id: string; title: string }[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filteredTags, setFilteredTags] = useState<
    { _id: string; title: string }[]
  >([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [serverdown, setServerdown] = useState(false)

  //share modal :
  const [isPublicAccess, setIsPublicAccess] = useState(false)
  const [hashVal, setHashVal] = useState<string>('')
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  //   const [isConfirmModal, setIsConfirmModal] = useState(false)

  // const closeShareModal = () => setIsShareModalOpen(false)

  const openCreateModal = async () => {
    setIsCreateModalOpen(true)
    fetchTags()
  }
  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    setSelectedTags([])
    setAlltagsId([])
  }

  const openShareModal = () => setIsShareModalOpen(true)
  // const closeShareModal = () => setIsShareModalOpen(false)

  const fetchTags = async () => {
    try {
      const response = await axios.get(ApiRoutes.alltags)
      console.log(response.data.tags)
      setAllTags(response.data.tags)
      setFilteredTags(response.data.tags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  // Filter tags based on input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Filter tags that match the input (showing max 5 results)
    const filtered = alltags
      .filter(tag => tag.title.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5) // Show only top 5 results
    setFilteredTags(filtered)
  }

  const createNewTag = async (newTagtitle: string) => {
    console.log('create new tag called', newTagtitle)
    try {
      await axios.post(ApiRoutes.createtag, {
        title: newTagtitle.toLowerCase()
      }) // Replace with your endpoint
      // setAllTags([...alltags, { _id: Date.now().toString(), title: newTagtitle.toLowerCase() }]);
      const alltagres = await axios.get(ApiRoutes.alltags)
      setAllTags(alltagres.data.tags)
      console.log(alltagres.data.tags) //right now this doesnt have anything
      setSelectedTags([...selectedTags, newTagtitle.toLowerCase()])
      setFilteredTags([
        ...filteredTags,
        alltagres.data.tags[alltagres.data.tags.length - 1]
      ])
      setAlltagsId([
        ...alltagsId,
        alltagres.data.tags[alltagres.data.tags.length - 1]._id
      ])
      console.log('all tags id from create new wala elas: ', alltagsId)
      // setFilteredTags([...filteredTags, newTagtitle.toLowerCase()]);
    } catch (error) {
      console.error('Error adding tag:', error)
    }
  }

  // Handle adding a tag (check if it exists in the database)
  const addTag = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault;

    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const existingTag = alltags.find(
        tag => tag.title === inputValue.trim().toLowerCase()
      )
      if (existingTag) {
        console.log('already existed tag,')
        console.log('existingtag:', existingTag)
        // Add to selected tags if it exists
        setSelectedTags([...selectedTags, existingTag.title])
        console.log('selected tag:', selectedTags)
        setAlltagsId([...alltagsId, existingTag._id])
        console.log('all tags id : ', alltagsId)
      } else {
        // Add new tag to the database
        console.log(inputValue)
        createNewTag(inputValue.trim())
      }

      setInputValue(''), e.preventDefault()
    }
  }

  const isValidURL = (url: string) => {
    const urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i
    return urlRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreateCardLoading(true)

    // Validate form fields
    let newErrors: { [key: string]: string } = {}
    if (!title.trim()) {
      newErrors.title = 'Title is required.'
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.'
    }
    if (!link.trim() || !isValidURL(link)) {
      newErrors.link = 'A valid reference link is required.'
    }
    if (alltagsId.length <= 0) {
      newErrors.tag = 'Add atleast one tag.'
    }

    if (Object.keys(newErrors).length > 0) {
      setValidateFormErr(newErrors)
      return
    }

    const userData = JSON.parse(localStorage.getItem('user') || '{}') // Replace with your key
    const userId = userData ? userData.id : null

    console.log('type:', type)
    console.log(type)

    if (type === undefined || type === '' || type === null) {
      setType('article')
    }
    console.log({ title, description, date, alltagsId, type, link, userId })

    const newcontent = {
      title,
      description,
      link,
      type,
      tags: alltagsId,
      userId
    }
    console.log('newcontent:', newcontent)

    try {
      // Call the backend endpoint
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.post(ApiRoutes.create, newcontent, config)
      const data = await response.data
      if (response.status === 201) {
        //   alert("Form submitted successfully!");
        // Optionally reset the form fields
        //   resetForm();
        //   closeCreateModal();
        setThoughtData(prevThought => [...prevThought, data]) // Using functional update here
        setNewDataUpdated(c => c + 1)
        onClose()
      } else {
        // Handle server errors
        const errorData = await response.data
        alert(`Error: ${errorData.message || 'Submission failed'}`)
      }
    } catch (error) {
      console.log('Error submitting the form:', error)
      alert('An unexpected error occurred. Please try again.')
    }

    setTitle('')
    setDescription('')
    setAlltagsId([]), setType('')
    setLink('')
    setValidateFormErr({})
    setCreateCardLoading(false)
    onClose() // Close the modal after submission
  }

  const onClose = () => {
    setIsCreateModalOpen(false)
    setIsShareModalOpen(false)

    setSelectedTags([])
    setAlltagsId([])

    setTitle('')
    setDescription('')
    setAlltagsId([]), setType('')
    setLink('')

    setValidateFormErr({})
  }

  const [showCopiedMsg, setShowCopiedMsg] = useState(false)
  const [linkToCopy, setLinkToCopy] = useState('')

  useEffect(() => {
    // Only run on the client-side
    if (typeof window !== 'undefined') {
      setLinkToCopy(`${window.location.origin}`)
    }
  }, [])
  const shareBrain = async () => {
    const sharelink = `${linkToCopy}/share/brain/${hashVal}`
    console.log('sharelink:', sharelink)
    try {
      await navigator.clipboard.writeText(sharelink)
    } catch (err) {
      console.log('Failed to copy link:', err)
      alert('Failed to copy link.')
    }
    setTimeout(() => {
      setShowCopiedMsg(false)
    }, 2000)
    setShowCopiedMsg(true)

    // onClose()
  }

  useEffect(() => {
    setIsLoading(true)
    console.log('useeffect called out')
    const fetchUserContents = async () => {
      const userData = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : null // Check if user data exists in localStorage
      const userId = userData ? userData.id : null

      if (userId) {
        try {
          //   const token = `Bearer ${localStorage.getItem('token')}`
          // set loading here
          const response = await axios.get(ApiRoutes.contents, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
              userId: userId
            }
          })
          setThoughtData(response.data)
        } catch (error) {
          setServerdown(true)
        }
      } else {
        setServerdown(true)
        console.log('server error!')
      }
      setIsLoading(false)
    }

    const fetchUserShareable = async () => {
      const userData = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : null // Check if user data exists in localStorage
      const userId = userData ? userData.id : null

      if (userId) {
        try {
          //   const token = `Bearer ${localStorage.getItem('token')}`
          // set loading here
          const sharedHex = await axios.get(
            ApiRoutes.shareHexVal + '/' + userId
          )
          console.log(sharedHex)
          setHashVal(sharedHex.data.link.hash)
          setIsPublicAccess(true)
          console.log(sharedHex.data.link.hash)
        } catch (error) {
          //   setServerdown(true)
          console.log('kuch to error aaya:', error)
          setIsPublicAccess(false)
        }
      } else {
        // setServerdown(true);
        console.log('pata nai kya error aaya!')
      }
    }
    fetchUserContents()
    fetchUserShareable()
  }, [newDataUpdated])

  const handlePublicAccessToggle = () => {
    // e.preventDefault;
    console.log('handle public access toggle called')
    console.log('ispublicaccess:', isPublicAccess)
    if (!isPublicAccess) {
      //   setIsConfirmModal(true)
      setIsConfirmationModalOpen(true)
      setIsPublicAccess(true)
      console.log('confirm?')

      // setIsPublicAccess(true);
    } else {
      setIsPublicAccess(false)
      setIsShareModalOpen(false)
      //   make a req so that share == false
      shareRequest(false)
      console.log('confirm ka else')
    }
  }

  const shareRequest = async (share: boolean) => {
    const shareBody = {
      share: share
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const res = await axios.post(ApiRoutes.share, shareBody, config)
      console.log(res)
      if (
        res.status === 201 ||
        res.statusText === 'OK' ||
        res.statusText.toLowerCase() === 'created'
      ) {
        //   alert("Form submitted successfully!");
        // Optionally reset the form fields
        //   resetForm();
        //   closeCreateModal();
        console.log('hashvalue:', res.data.hashval)
        setHashVal(res.data.hashval)
        // setThoughtData(prevThought => [...prevThought, data]) // Using functional update here
        // setNewDataUpdated(c => c + 1)
        // onClose()
      } else {
        // Handle server errors
        const errorData = await res.data
        alert(`Error: ${errorData.message || 'Submission failed'}`)
      }
    } catch (error) {
      console.log('Error submitting the form:', error)
      alert('An unexpected error occurred. Please try again.')
    }
  }

  const confirmPublicAccess = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault
    console.log('confirm clicked')
    setIsPublicAccess(true)
    setIsConfirmationModalOpen(false)
    // setIsShareModalOpen(true)

    //make a share req

    shareRequest(true)
  }

  // if (isLoading)
  //   return (
  //     <div className='w-full h-screen flex flex-col justify-center items-center text-sm md:text-lg '>
  //       <Loader2 className='animate-spin' />
  //     </div>
  //   )

  return (
    <div className='flex flex-1'>
      <div className='p-10 md:p-10 rounded-tl-2xl  bg-transparent flex flex-col gap-2 flex-1 w-full h-full'>
        <div className='flex gap-2'>
          <div className='h-20 w-full rounded-lg  flex justify-between items-center '>
            <div>
              <h1 className='text-xl md:text-3xl'>My brain</h1>
            </div>
            <div className='flex gap-5'>
              <Button
                onClick={openCreateModal}
                variant={'ghost'}
                className='flex justify-center items-center gap-1 text-center rounded-md bg-transparent no-underline cursor-pointer shadow-2xl leading-6  text-white  border-[1px] border-slate-500 px-4 py-2 font-mono font-medium transition-colors hover:text-indigo-300'
              >
                <Plus />
                <span className='sm:inline hidden'>Create New</span>
              </Button>
              <Button onClick={openShareModal}>
                <Share2 />
                <span className='sm:inline hidden'>Share</span>
              </Button>
            </div>
          </div>
          {isCreateModalOpen && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
              onClick={onClose} // Close modal when clicking background
            >
              <div
                onClick={e => e.stopPropagation()} // Prevents modal click from closing it
                className='border border-black/[0.2] dark:border-white/[0.2]   bg-slate-950 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100'
              >
                {createCardLoading ? (
                  <div className='bg-transparent rounded-lg flex flex-col justify-center items-center'>
                    creating...
                    <Loader2 className='animate-spin' />
                  </div>
                ) : (
                  <div>
                    <h2 className='text-white text-xl mb-4 text-center'>
                      New Thought
                    </h2>
                    <p className='text-center text-gray-400'>
                      Save your new thought before you forget it
                    </p>
                    <button
                      className='absolute top-4 right-6  rounded-full text-xs'
                      onClick={onClose}
                    >
                      <X className='h-5 w-5' />
                    </button>

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
                        {validateFormErr.title && (
                          <p className='text-sm text-red-500'>
                            {validateFormErr.title}
                          </p>
                        )}
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
                        {validateFormErr.description && (
                          <p className='text-sm text-red-500'>
                            {validateFormErr.description}
                          </p>
                        )}
                      </div>

                      {/* Type Selection */}
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>
                          Type:
                        </label>
                        <select
                          className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                          value={type}
                          onChange={e => {
                            console.log('select called')
                            setType(e.target.value.toLowerCase())
                            console.log('type:', type.toLowerCase())
                          }}
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

                      {/* Link */}
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>
                          Ref Link:
                        </label>
                        <input
                          type='text'
                          className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                          value={link}
                          onChange={e => setLink(e.target.value)}
                          required
                        />
                        {validateFormErr.link && (
                          <p className='text-sm text-red-500'>
                            {validateFormErr.link}
                          </p>
                        )}
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

                      {/* Tags input */}
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-500 mb-1'>
                          Tags:
                        </label>
                        <div className='relative flex flex-col'>
                          <input
                            type='text'
                            className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={addTag}
                            // onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                            placeholder='Add tags and press Enter'
                          />
                          {validateFormErr.tag && alltagsId.length <= 0 && (
                            <p className='text-sm text-red-500 text-left'>
                              {validateFormErr.tag}
                            </p>
                          )}

                          {/* Dropdown for filtered tags */}
                          {inputValue && (
                            <ul className='bg-slate-950 absolute top-10 border w-full rounded-b-lg max-h-40 overflow-auto'>
                              {filteredTags.map(tag => (
                                <li
                                  key={tag._id}
                                  onClick={() => {
                                    setSelectedTags([
                                      ...selectedTags,
                                      tag.title
                                    ])
                                    setAlltagsId([...alltagsId, tag._id])
                                    setInputValue('')
                                  }}
                                  className='px-3 py-2 text-white hover:bg-purple-600 cursor-pointer'
                                >
                                  {tag.title}
                                </li>
                              ))}
                              {filteredTags.length === 0 && (
                                <li className='text-gray-400 px-3 py-2'>
                                  No matching tags
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                        {/* Display selected tags */}
                        <div className='flex flex-wrap mt-4 gap-2 '>
                          {selectedTags.map((tag, index) => (
                            <div
                              key={index}
                              className='flex items-center bg-purple-400/20 px-2 py-1 rounded-lg text-sm'
                            >
                              {tag}
                              <button
                                type='button'
                                onClick={() => {
                                  setSelectedTags(
                                    selectedTags.filter((_, i) => i !== index)
                                  )
                                  setAlltagsId(
                                    alltagsId.filter((_, i) => i !== index)
                                  )
                                }}
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
                  </div>
                )}
              </div>
            </div>
          )}

          {isShareModalOpen && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
              onClick={onClose} // Close modal when clicking background
            >
              <div
                onClick={e => e.stopPropagation()} // Prevents modal click from closing it
                className='border border-black/[0.2] dark:border-white/[0.2]   bg-slate-950 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100'
              >
                <h2 className='text-white text-xl mb-4 text-center'>
                  Share Your Second Brain
                </h2>
                <button
                  className='absolute top-4 right-6  rounded-full text-xs'
                  onClick={onClose}
                >
                  <X className='h-5 w-5' />
                </button>
                <div className='mt-4 flex items-center justify-between  py-2'>
                  <span className='text-sm text-gray-400'>
                    Allow public access
                  </span>
                  <Switch
                    checked={isPublicAccess}
                    onCheckedChange={handlePublicAccessToggle}
                  />
                </div>
                {<div>{hashVal}</div>}
                <Separator />
                <div className='flex gap-7 mt-2'>
                  <div className='flex flex-col gap-5'>
                    <span className='text-sm text-gray-300'>
                      Share your entire collection of notes, documents, tweets,
                      and videos with others. They&apos;ll be able to import
                      your content into their own second brain.{' '}
                    </span>
                    <div>
                      <Button
                        className='w-full bg-purple-200'
                        onClick={shareBrain}
                        disabled={!isPublicAccess}
                      >
                        {<Copy />}
                        Share brain
                      </Button>
                      <p
                        className={`text-sm text-purple-200 transition-opacity duration-300 ease-out ${
                          showCopiedMsg ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        Copied!
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='w-32 h-32 bg-black text-center'>
                      QR code
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isConfirmationModalOpen && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 transition-opacity duration-300'
              onClick={onClose} // Close modal when clicking background
            >
              <div
                onClick={e => e.stopPropagation()} // Prevents modal click from closing it
                className='border border-black/[0.2] dark:border-white/[0.2]   bg-slate-950 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100'
              >
                <h2 className='text-white text-xl mb-4 text-center'>
                  Confirm Public Access
                </h2>
                <button
                  className='absolute top-4 right-6  rounded-full text-xs'
                  onClick={() => setIsConfirmationModalOpen(false)}
                >
                  <X className='h-5 w-5' />
                </button>
                <div className='flex gap-7 mt-2'>
                  <div className='flex flex-col gap-5'>
                    <span className='text-sm text-gray-300'>
                      Are you sure you want to make your dashboard publicly
                      accessible? This will allow anyone with the link to view
                      your content.
                    </span>
                    <div className='mt-4 flex justify-end space-x-2'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium   border border-gray-200 rounded-md hover:bg-gray-200/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
                        onClick={() => setIsConfirmationModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-purple-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                        onClick={e => confirmPublicAccess(e)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Separator />
        <div className='flex gap-2 flex-1 h-full overflow-y-auto bg-slate-800/20 p-5'>
          { isLoading ? (<div className='w-full h-full flex flex-col justify-center items-center text-sm md:text-lg '>
               <Loader2 className='animate-spin' />
            </div>
          ) : serverdown ? (
            <div className='w-full flex flex-col justify-center items-center text-sm md:text-lg '>
              <Frown /> server down <p className='text-sm'>try again later!!</p>
            </div>
          ) : thoughtData.length === 0 ? (
            <div className='w-full flex flex-col justify-center items-center text-sm md:text-lg gap-1 '>
              <BadgeX /> You dont have anything here!
              <p className='text-sm'>
                <Button
                  onClick={openCreateModal}
                  variant={'ghost'}
                  className='flex justify-center items-center gap-1 text-center rounded-md bg-transparent no-underline cursor-pointer shadow-2xl leading-6  text-white  border-[1px] border-slate-500 px-2 py-1 font-mono font-medium transition-colors hover:text-indigo-300'
                >
                  <Plus />
                  <span className='sm:inline hidden'>add</span>
                </Button>
              </p>
            </div>
          ) : (
            <DashboardContent
              thoughtData={thoughtData}
              setThoughtData={setThoughtData}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const DashboardContent = ({
  thoughtData,
  setThoughtData
}: {
  thoughtData: ThoughtProp[]
  setThoughtData: React.Dispatch<React.SetStateAction<ThoughtProp[]>>
}) => {
  return (
    <div className='h-full w-full rounded-lg  '>
      <Thoughtcard thoughts={thoughtData} setThoughtData={setThoughtData} />
    </div>
  )
}
