import HackyButton from './hacky-button'
import { Icon } from './ui/card-binary'

export default function Supercharge () {
  return (
    <div className='border border-black/[0.2] bg-gradient-to-tr from-purple-400/10 to-transparent/5 dark:border-white/[0.2] flex flex-col items-start  relative h-full w-full px-5 '>
      <Icon className='absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black' />
      <Icon className='absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black' />
      <Icon className='absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black' />
      <Icon className='absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black' />

      <div className='w-full h-full text-2xl md:text-6xl flex flex-col gap-11 justify-center items-center text-center'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <h2 className='bg-gradient-to-tr  from-purple-300/80 to-white/90 bg-clip-text text-transparent mt-4 font-light text-2xl sm:text-4xl md:text-6xl text-center'>
            Supercharge your bookmarks today.
          </h2>
          <p className='text-lg md:text-xl font-light  text-black dark:text-white px-2 py-0.5'>
            Start using your{' '}
            <span className='text-purple-100'>secondbrain</span> now and unlock
            your second brain.
          </p>
        </div>
        <a href={'/signup'}>
          <HackyButton text={'Get Started'} />
        </a>
      </div>

      {/* <ButtonStd route={props.icon} text="Read More" /> */}
    </div>
  )
}
