import { useEffect } from 'react';

interface TwitterEmbedProps {
  tweetUrl: string;
  loading?: boolean;
}

// Extend the global Window interface to include twttr
declare global {
    interface Window {
      twttr: {
        widgets: {
          load: () => void;
        };
      };
    }
  }
  export function TwitterEmbed({ tweetUrl }: TwitterEmbedProps) {
    // const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // setIsLoading(true);
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        if (window.twttr) {
          window.twttr.widgets.load();
          // setTimeout(() => setIsLoading(false), 500); // Add a small delay to ensure the tweet is rendered
        }
      };
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, [tweetUrl]);
  
    // if (isLoading) {
    //   return (
    //     <div className="flex items-center justify-center ">
    //       {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div> */}
    //       <Loader2 />
    //     </div>
    //   );
    // }
  
    return (
      <div className="twitter-embed w-full">
        <blockquote className="twitter-tweet " data-dnt="true">
         <div className='w-full h-32 bg-slate-600/20 animate-pulse'></div> 
         <a href={tweetUrl} className='w-full'></a>
        </blockquote>
      </div>
    );
  }