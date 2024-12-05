// interface YouTubeEmbedProps {
//   url: string;
//   title?: string;
//   description?: string;
// }

export function YouTubeEmbed({ url }: {url:string}) {
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
        <p className="text-red-500">Invalid YouTube URL</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedUrl}
        // title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}

