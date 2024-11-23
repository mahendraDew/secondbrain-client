// import { allPosts } from "@/.contentlayer/generated";
import { PostCard } from './ui/card-binary-view'
import { Separator } from './ui/separator'
import { TextGenerateEffect } from './ui/text-gen'
import { cards } from "../data/data";


const Trendy = () => {
  // const posts = allPosts
  //   .filter((post) => post.date)
  //   .sort((a, b) => {
  //     PostCard;
  //     return compareDesc(new Date(a.date), new Date(b.date));
  //   });



  // const postsData = [
  //   {
  //     title: 'this is title',
  //     description: 'this is description',
  //     _id: "123123123",
  //     date: "14 jun 2023",
  //     slug: "slug",
  //     body: {
  //       code: 'this is code'
  //     }
  //   },
  //   {
  //     title: 'this is title',
  //     description: 'this is description',
  //     _id: "1231231234",
  //     date: "14 jun 2023",
  //     slug: "slug",
  //     body: {
  //       code: 'this is code'
  //     }
  //   }
  // ]

  // const firstTwo = [cards[0], cards[1]]
  return (
    <div className='flex flex-col gap-5 justify-center items-center container max-w-4xl py-6 lg:py-10 mt-24'>
      <h1 className='relative z-10 text-2xl md:text-7xl font-headingAlt  bg-clip-text text-transparent bg-gradient-to-b from-purple-300/90 to-white/90  text-center font-bold'>
        <TextGenerateEffect
          words="A Knowledgebase made for you"
          className=' text-3xl md:text-6xl font-headingAlt  bg-clip-text text-transparent bg-gradient-to-b from-purple-300/90 to-white/90  text-center '
        />
      </h1>
      <Separator />
      <div className='flex items-center justify-center text-center'>
      <p>Secondbrain offers all the vital building blocks you need to transform your gold mine of content into a powerful knowledgebase for yourself, your team or even a group of friends!</p>
      </div>

      <div className='relative flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8 mt-24'>
        {/* <hr className='my-8' /> */}
        {cards?.length ? (
          <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {cards.map((post, index) => (
              <PostCard
                key={index}
                title={post.title}
                description={post.description!}
                icon={post.icon}
              />

              // <article
              //   key={post._id}
              //   className="group relative flex flex-col space-y-2"
              // >
              //   {post.image && (
              //     <Image
              //       src={post.image}
              //       alt={post.title}
              //       width={804}
              //       height={452}
              //       className="rounded-md border bg-muted transition-colors"
              //       priority={index <= 1}
              //     />
              //   )}
              //   <h2 className="text-2xl font-extrabold">{post.title}</h2>
              //   {post.description && (
              //     <p className="text-muted-foreground">{post.description}</p>
              //   )}
              //   {post.date && (
              //     <p className="text-sm text-muted-foreground">
              //       {formatDate(post.date)}
              //     </p>
              //   )}
              //   <Link href={post.slug} className="absolute inset-0">
              //     <span className="sr-only">View Article</span>
              //   </Link>
              // </article>
            ))}
            <div className='absolute -top-4 -z-10 flex w-full justify-center'>
              <div className='h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]' />
            </div>
            <div className='absolute -top-4 -z-10 flex w-full justify-center'>
              <div className='h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]' />
            </div>
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </div>
      <div>
        {/* ? signup for now */}
        {/* <a href={'/'}>
          <HackyButton key={12} text='Explore More' />
         
        </a> */}
      </div>
    </div>
  )
}

export default Trendy
