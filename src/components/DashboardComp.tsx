import { useEffect, useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'
import { motion } from 'framer-motion'
// import { Img } from 'react-image'
import { cn } from '@/lib/utils'
import {
  BadgeX,
  BrainCircuit,
  Copy,
  FileImage,
  FileText,
  Filter,
  Frown,
  Link,
  Loader2,
  LogOut,
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
import { ThoughtCardType, ThoughtProp } from './type/thougthtype'
import { Switch } from './ui/switch'
import { useNavigate } from 'react-router-dom'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import QRcode from 'qrcode'

export function DashboardComp () {
  const navigate = useNavigate()
  const links = [
    {
      label: 'Tweet',
      icon: (
        <Twitter className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Video',
      icon: (
        <Youtube className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Link',
      icon: (
        <Link className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Image',
      icon: (
        <FileImage className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Article',
      icon: (
        <FileText className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    }
  ]
  const [open, setOpen] = useState(false)
  const userData = JSON.parse(localStorage.getItem('user') || '{}') // Replace with your key

  const [selectedType, setSelectedType] = useState<ThoughtCardType>(null)

  const [signOutConfirmationModel, setSignOutConfirmationModel] =
    useState(false)

  const signOut = () => {
    setSignOutConfirmationModel(true)
  }
  const signOutHandler = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

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
                <SidebarLink
                  key={idx}
                  link={link}
                  selectedType={selectedType}
                  onSelectType={setSelectedType}
                />
              ))}
            </div>
          </div>
          <div className='   flex justify-between items-center'>
            <div className='flex gap-2 justify-center items-center cursor-pointer'>
              <span className='border-[1px] border-gray-100 p-1 rounded-full'>
                <User className=' rounded-full' />
              </span>
              {open && <p>{userData.username}</p>}
            </div>
            {open && (
              <a onClick={signOut}>
                <LogOut className='hover:text-gray-100 text-gray-500 cursor-pointer' />
              </a>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      {signOutConfirmationModel && (
        <div
          className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-55 transition-opacity duration-300'
          onClick={() => setSignOutConfirmationModel(false)} // Close modal when clicking background
        >
          <div
            onClick={e => e.stopPropagation()} // Prevents modal click from closing it
            className='border border-black/[0.2] dark:border-white/[0.2]   bg-slate-950 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100'
          >
            <h2 className='text-white text-xl mb-4 text-center'>
              Are you sure?
            </h2>
            <button
              className='absolute top-4 right-6  rounded-full text-xs'
              onClick={() => setSignOutConfirmationModel(false)}
            >
              <X className='h-5 w-5' />
            </button>
            <div className='w-full  flex gap-7 mt-2'>
              <div className='w-full flex flex-col justify-center gap-5'>
                <div className='text-sm text-gray-300 text-center '>
                  Are you sure you want to sign out from your Secondbrain?
                </div>
                <div className='w-full mt-4 flex justify-center space-x-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium   border border-gray-200 rounded-md hover:bg-gray-200/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
                    onClick={() => setSignOutConfirmationModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-purple-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={signOutHandler}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dashboard
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
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
const Dashboard = ({
  selectedType,
  setSelectedType
}: {
  selectedType: ThoughtCardType
  setSelectedType: React.Dispatch<React.SetStateAction<ThoughtCardType>>
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //form data (title(string), desc(string), date(date), tags({id,string}), link )
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date] = useState(new Date().toISOString().slice(0, 10))
  const [alltagsId, setAlltagsId] = useState<string[]>([])
  const [type, setType] = useState('article')
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
      // console.log(response.data.tags)
      setAllTags(response.data.tags)
      setFilteredTags(response.data.tags)
    } catch (error) {
      alert('Error fetching tags: (-_-)')
      // console.log('Error fetching tags:', error)
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
    // console.log('create new tag called', newTagtitle)
    try {
      await axios.post(ApiRoutes.createtag, {
        title: newTagtitle.toLowerCase()
      }) // Replace with your endpoint
      // setAllTags([...alltags, { _id: Date.now().toString(), title: newTagtitle.toLowerCase() }]);
      const alltagres = await axios.get(ApiRoutes.alltags)
      setAllTags(alltagres.data.tags)
      // console.log(alltagres.data.tags) //right now this doesnt have anything
      setSelectedTags([...selectedTags, newTagtitle.toLowerCase()])
      setFilteredTags([
        ...filteredTags,
        alltagres.data.tags[alltagres.data.tags.length - 1]
      ])
      setAlltagsId([
        ...alltagsId,
        alltagres.data.tags[alltagres.data.tags.length - 1]._id
      ])
      // console.log('all tags id from create new wala elas: ', alltagsId)
      // setFilteredTags([...filteredTags, newTagtitle.toLowerCase()]);
    } catch (error) {
      alert('Error adding tag: (-_-) try again!!')
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
        // console.log('already existed tag,')
        // console.log('existingtag:', existingTag)
        // Add to selected tags if it exists
        setSelectedTags([...selectedTags, existingTag.title])
        // console.log('selected tag:', selectedTags)
        setAlltagsId([...alltagsId, existingTag._id])
        // console.log('all tags id : ', alltagsId)
      } else {
        // Add new tag to the database
        // console.log(inputValue)
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

    // console.log('type:', type)
    // console.log(type)

    if (type === undefined || type === '' || type === null) {
      setType('article')
    }
    // console.log({ title, description, date, alltagsId, type, link, userId })
    setCreateCardLoading(true)

    const newcontent = {
      title,
      description,
      link,
      type,
      tags: alltagsId,
      userId
    }
    // console.log('newcontent:', newcontent)

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
      // console.log('Error submitting the form:', error)
      alert('An unexpected error occurred. Please try again. (-_-)')
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
    // console.log('sharelink:', sharelink)
    try {
      await navigator.clipboard.writeText(sharelink)
    } catch (err) {
      // console.log('Failed to copy link:', err)
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
    // console.log('useeffect called out')
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
        // console.log('server error!')
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
          // console.log(sharedHex)
          setHashVal(sharedHex.data.link.hash)
          setIsPublicAccess(true)
          // console.log(sharedHex.data.link.hash)
        } catch (error) {
          //   setServerdown(true)
          // console.log('kuch to error aaya:', error)
          setIsPublicAccess(false)
        }
      } else {
        // setServerdown(true);
        // console.log('pata nai kya error aaya!')
        alert('Error: User is not defined! (-_-)')
      }
    }
    fetchUserContents()
    fetchUserShareable()
  }, [newDataUpdated])

  const handlePublicAccessToggle = () => {
    // e.preventDefault;
    // console.log('handle public access toggle called')
    // console.log('ispublicaccess:', isPublicAccess)
    if (!isPublicAccess) {
      //   setIsConfirmModal(true)
      setIsConfirmationModalOpen(true)
      setIsPublicAccess(true)
      // console.log('confirm?')

      // setIsPublicAccess(true);
    } else {
      setIsPublicAccess(false)
      setIsShareModalOpen(false)
      //   make a req so that share == false
      shareRequest(false)
      // console.log('confirm ka else')
    }
  }

  const [shareBtnLoading, setShareBtnLoading] = useState(false)

  const shareRequest = async (share: boolean) => {
    console.log('sharereq called')
    const shareBody = {
      share: share
    }
    setShareBtnLoading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const res = await axios.post(ApiRoutes.share, shareBody, config)
      const data = await res.data
      // console.log(res)
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.statusText === 'OK' ||
        res.statusText.toLowerCase() === 'created'
      ) {
        //   alert("Form submitted successfully!");
        // Optionally reset the form fields
        //   resetForm();
        //   closeCreateModal();
        // const hashval = await res.data
        // console.log('hashval:', data.hashvalue)
        // console.log('hashvalue:', res.data.hashvalue)
        setHashVal(data.hashvalue)
        // generateQR(data.hashvalue);
        // setThoughtData(prevThought => [...prevThought, data]) // Using functional update here
        // setNewDataUpdated(c => c + 1)
        // onClose()
      } else {
        // Handle server errors
        const errorData = await res.data
        alert(`Error: ${errorData.message || 'Submission failed'}`)
      }
    } catch (error) {
      // console.log('Error submitting the form:', error)
      alert('An unexpected error occurred. Please try again. (-_-)')
    }

    setShareBtnLoading(false)
  }

  const confirmPublicAccess = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault
    // console.log('confirm clicked')
    setIsPublicAccess(true)
    setIsConfirmationModalOpen(false)
    // setIsShareModalOpen(true)

    //make a share req

    shareRequest(true)
  }

  //-------------------------------------------------import stuff------------------------------------------

  const [importLink, setImportLink] = useState('')

  const ImportLinkSubmit = async (e: React.FormEvent) => {
    // console.log('ImportLinkSubmit called')
    e.preventDefault()

    // here we have to check if the import link is yt link or x link
    const youtubeVideoId = getYouTubeVideoId(importLink)
    const tweetId = getTweetId(importLink)
    let newErrors: { [key: string]: string } = {}

    if (youtubeVideoId) {
      // Validate form fields
      if (!importLink.trim() || !isValidURL(importLink)) {
        newErrors.importLink = 'A valid import link is required.'
      }
      if (importLink.trim() === '') {
        newErrors.importLink = 'Please enter a YouTube URL'
      }
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
      if (!youtubeRegex.test(importLink)) {
        newErrors.importLink = 'Please enter a valid YouTube URL'
      }
      const videoId = getYouTubeVideoId(importLink)
      if (!videoId) {
        newErrors.importLink = 'Invalid YouTube URL'
      }
      if (Object.keys(newErrors).length > 0) {
        setValidateFormErr(newErrors)
        setTimeout(() => {
          setValidateFormErr({})
        }, 3000)
        return
      }

      // try {
      const videoDetails = videoId
        ? await fetchVideoDetails(videoId)
        : { title: '', description: '' }
      const { title, description } = videoDetails

      const userData = JSON.parse(localStorage.getItem('user') || '{}') // Replace with your key
      const userId = userData ? userData.id : null
      const tagId = addingFixedTags('youtube')
      const alltagId: string[] = []
      if (tagId) {
        alltagId[0] = tagId
      }

      // console.log({
      //   title,
      //   description,
      //   date,
      //   alltagsId: alltagId,
      //   type: 'video',
      //   link: importLink,
      //   userId
      // })
      setCreateCardLoading(true)

      const newcontent = {
        title,
        description,
        link: importLink,
        type: 'video',
        tags: alltagId,
        userId
      }

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
          setThoughtData(prevThought => [...prevThought, data]) // Using functional update here
          setNewDataUpdated(c => c + 1)
          onClose()
        } else {
          // Handle server errors
          const errorData = await response.data
          alert(`Error: ${errorData.message || 'Submission failed'}`)
        }
      } catch (error) {
        // console.log('Error submitting the form:', error)
        alert('An unexpected error occurred. Please try again.(-_-)')
      }

      setTitle('')
      setDescription('')
      setAlltagsId([]), setType('')
      setLink('')
      setValidateFormErr({})
      setCreateCardLoading(false)
      onClose()
      setImportLink('')

      // } catch (err) {
      //   console.error('Error adding video:', err);
      //   newErrors.importLink = 'Error adding video. Please try again.';
      //   if (Object.keys(newErrors).length > 0) {
      //     setValidateFormErr(newErrors)
      //     setTimeout(() => {
      //       setValidateFormErr({});
      //     }, 3000);
      //     return
      //   }
      // }
    } else if (tweetId) {
      // console.log('this is tweet>>>>>>>>')
      // await fetchTweetText(tweetId);
      // const title = await getTweetId(tweetId);
      // console.log("tweet title: ",title);

      // Validate form fields
      if (!importLink.trim() || !isValidURL(importLink)) {
        newErrors.importLink = 'A valid import link is required.'
      }
      if (importLink.trim() === '') {
        newErrors.importLink = 'Please enter a Twitter URL'
      }
      // const twitterRegExp = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
      // const xRegExp = /^https?:\/\/x\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
      // if (!twitterRegExp.test(importLink)) {
      //   newErrors.importLink = 'Please enter a Tweet URL'
      // }
      // if (!xRegExp.test(importLink)) {
      //   newErrors.importLink = 'Please enter a Tweet URL'
      // }
      // const tweetId = getTweetId(importLink);
      if (!tweetId) {
        newErrors.importLink = 'Invalid Tweet URL'
      }
      if (Object.keys(newErrors).length > 0) {
        setValidateFormErr(newErrors)
        setTimeout(() => {
          setValidateFormErr({})
        }, 3000)
        return
      }

      const userData = JSON.parse(localStorage.getItem('user') || '{}') // Replace with your key
      const userId = userData ? userData.id : null
      const tagId = addingFixedTags('tweet')
      const alltagId: string[] = []
      if (tagId) {
        alltagId[0] = tagId
      }

      const tweetUsername = importLink.split('/')[3]
      // console.log("tweet username: ", tweetUsername)

      const title = tweetUsername + "'s tweet"
      const description = ' '

      // console.log({
      //   title:title,
      //   description:description,
      //   date,
      //   alltagsId: alltagId,
      //   type: 'tweet',
      //   link: importLink,
      //   userId
      // })
      setCreateCardLoading(true)

      const newcontent = {
        title: title,
        description: description,
        link: importLink,
        type: 'tweet',
        tags: alltagId,
        userId
      }

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
          setThoughtData(prevThought => [...prevThought, data]) // Using functional update here
          setNewDataUpdated(c => c + 1)
          onClose()
        } else {
          // Handle server errors
          const errorData = await response.data
          alert(`Error: ${errorData.message || 'Submission failed'}`)
        }
      } catch (error) {
        // console.log('Error submitting the form:', error)
        alert('An unexpected error occurred. Please try again.(-_-)')
      }

      setTitle('')
      setDescription('')
      setAlltagsId([]), setType('')
      setLink('')
      setValidateFormErr({})
      setCreateCardLoading(false)
      onClose()
      setImportLink('')
    } else {
      newErrors.importLink =
        'Invalid URL. Please enter a valid YouTube or Twitter URL.'
      if (Object.keys(newErrors).length > 0) {
        setValidateFormErr(newErrors)
        setTimeout(() => {
          setValidateFormErr({})
        }, 3000)
        return
      }
    }

    // console.log("Import link:",importLink)
    // setCreateCardLoading(true);
  }
  // const [tweetUser, setTweetUser] = useState('')
  const getTweetId = (url: string): string | null => {
    const regExp =
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
    const match = url.match(regExp)
    if (match) {
      // console.log('twitter reg match: ', match)
      // setTweetUser(match[1])
      return match ? match[3] : null
    } else {
      const regExp_newformate =
        /^https?:\/\/x\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
      const match_newformate = url.match(regExp_newformate)
      // match_newformate && setTweetUser(match_newformate[1])
      return match_newformate ? match_newformate[3] : null
    }
  }

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const fetchVideoDetails = async (
    videoId: string
  ): Promise<{ title: string; description: string }> => {
    try {
      const response = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
      )
      const data = await response.json()
      const title = data.title || `YouTube Video (${videoId})`
      const fullDescription =
        data.author_name + "'s youtube video on - " + title || ''
      const description = fullDescription.split('\n').slice(0, 5).join('\n')
      return { title, description }
    } catch (error) {
      // console.error('Error fetching video details:', error)
      return {
        title: `You"3Blue1Brown's youtube video on - Transformers (how LLMs work) explained visually | DL5"Tube Video (${videoId})`,
        description: ''
      }
    }
  }

  const addingFixedTags = (fixtag: string) => {
    // console.log('addeing fix tag fun called')
    const existingTag = alltags.find(
      tag => tag.title === fixtag.trim().toLowerCase()
    )
    if (existingTag) {
      // Add to selected tags if it exists
      // console.log('tag is : ', existingTag.title, existingTag._id)
      return existingTag._id
    }
  }

  // -------------------------------------------------- qr code -------------------------------------------
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    const generateQR = () => {
      console.log('geneerate QR called!', hashVal)
      const sharelink = `${linkToCopy}/share/brain/${hashVal}`
      QRcode.toDataURL(sharelink).then(setSrc)
    }
    generateQR()
  }, [hashVal])

  return (
    <div className='flex flex-1'>
      <div className='p-10 md:p-10 rounded-tl-2xl  bg-transparent flex flex-col gap-2 flex-1 w-full h-full'>
        <div className='flex flex-col gap-2 '>
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
          {selectedType && (
            <div className='flex items-center gap-2 text-md'>
              <div className='bg-purple-200/10 rounded-full px-3 flex justify-center items-center gap-1'>
                <Filter className='w-4 h-4' />
                {selectedType}
                <X
                  className='h-4 w-4 text-red-700 hover:text-red-300 cursor-pointer'
                  onClick={() => setSelectedType(null)}
                />
              </div>
            </div>
          )}
          {isCreateModalOpen && (
            <div
              className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
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
                  <Tabs defaultValue='automatic' className='w-full '>
                    <TabsList className=' w-full'>
                      <TabsTrigger value='automatic' className='w-full'>
                        Automatic
                      </TabsTrigger>
                      <TabsTrigger value='manual' className='w-full'>
                        Manual
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value='automatic'>
                      <div>
                        <h2 className='text-white text-xl text-center'>
                          New Thought
                        </h2>
                        <p className='text-center text-gray-200 mb-4'>
                          import your thought before you forget it
                        </p>
                        <p className='text-gray-400 text-sm text-center'>
                          *NOTE: This only support{' '}
                          <a href='https://x.com' target='_blank'>
                            {' '}
                            <span className='text-purple-200 italic'>
                              tweet
                            </span>
                          </a>{' '}
                          and{' '}
                          <a href='https://youtube.com' target='_blank'>
                            <span className='text-purple-200 italic'>
                              youtube
                            </span>
                          </a>{' '}
                          link for now{' '}
                        </p>
                        <button
                          className='absolute -top-4 -right-6  rounded-full text-xs'
                          onClick={onClose}
                        >
                          <X className='h-5 w-5' />
                        </button>

                        <form
                          onSubmit={ImportLinkSubmit}
                          className='text-white px-4 sm:px-6 md:px-8 lg:px-10 py-4'
                        >
                          {/* Import Link */}
                          <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-50 mb-1'>
                              Import from Link:
                            </label>
                            <input
                              type='text'
                              placeholder='paste your yt/tweet link here'
                              className='w-full px-3 py-2 border border-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 bg-transparent'
                              value={importLink}
                              onChange={e => setImportLink(e.target.value)}
                              required
                            />
                            {validateFormErr.importLink && (
                              <p className='text-sm text-red-500'>
                                {validateFormErr.importLink}
                              </p>
                            )}
                            <Button
                              className='mt-3 w-full '
                              disabled={importLink ? false : true}
                              type='submit'
                            >
                              Import
                            </Button>
                          </div>
                        </form>
                      </div>
                    </TabsContent>
                    <TabsContent value='manual'>
                      <div>
                        <h2 className='text-white text-xl mb-4 text-center'>
                          New Thought
                        </h2>
                        <p className='text-center text-gray-400'>
                          Save your new thought before you forget it
                        </p>
                        <button
                          className='absolute -top-4 -right-6  rounded-full text-xs'
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
                                // console.log('select called')
                                setType(e.target.value.toLowerCase())
                                // console.log('type:', type.toLowerCase())
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
                                        selectedTags.filter(
                                          (_, i) => i !== index
                                        )
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
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </div>
          )}

          {isShareModalOpen && (
            <div
              className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'
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
                {isPublicAccess && (
                  <div className='font-mono text-sm text-wrap'>
                    hash: {hashVal}
                  </div>
                )}
                <Separator />
                <div className='flex flex-col md:flex-row gap-7 mt-2'>
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
                        {shareBtnLoading ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          <>
                            <Copy />
                            Share brain
                          </>
                        )}
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
                  <div className='flex justify-center items-center'>
                    <div className='w-64 h-64 md:w-32 md:h-32  text-center'>
                      {isPublicAccess ? (
                        <div className=' w-full h-full'>
                          {shareBtnLoading ? (
                            <div className='w-full h-full bg-slate-600/20 animate-pulse'></div>
                          ) : (
                            <img src={src} className='w-full' />
                          )}
                        </div>
                      ) : (
                        <div className='w-full h-full '>
                          <BrainCircuit className='w-full h-full text-purple-100' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isConfirmationModalOpen && (
            <div
              className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-55 transition-opacity duration-300'
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
                  onClick={() => {
                    setIsConfirmationModalOpen(false)
                    setIsPublicAccess(false)
                  }}
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
                        onClick={() => {
                          setIsConfirmationModalOpen(false)
                          setIsPublicAccess(false)
                        }}
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
          {isLoading ? (
            <div className='w-full h-full flex flex-col justify-center items-center text-sm md:text-lg '>
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
              selectedType={selectedType}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const DashboardContent = ({
  thoughtData,
  setThoughtData,
  selectedType
}: {
  thoughtData: ThoughtProp[]
  setThoughtData: React.Dispatch<React.SetStateAction<ThoughtProp[]>>
  selectedType: ThoughtCardType
}) => {
  return (
    <div className='h-full w-full rounded-lg  '>
      <Thoughtcard
        thoughts={thoughtData}
        setThoughtData={setThoughtData}
        selectedType={selectedType}
      />
    </div>
  )
}
