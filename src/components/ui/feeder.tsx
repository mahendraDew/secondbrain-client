// import Link from "next/link";



const Feeder = ({feed}: {feed:string} ) => {
  return (
    <div>
      <button className="h-8 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 tracking-wide  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(214,203,230,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="h-8 relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-0.5 px-4 ring-1 ring-white/10 ">
          <a href={'/signin'}>
            <span>{feed}</span>
          </a>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-1 w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
    </div>
  );
};

export default Feeder;