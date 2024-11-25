import { BookOpenCheck, Layers, MessageCircle, Pen, Search, Twitter } from "lucide-react";
export const cards = [
    {
        title: "Twitter Bookmarks",
        description: "Use all the knowledge you've saved on Twitter to train your own supermemory.",
        icon: <Twitter />
    },
    {
        title: "Powerful search",
        description: "Look up anything you've saved in your supermemory, and get the information you need in seconds.",
        icon: <Search />
    },
    {
        title: "Chat with collections",
        description: "Use collections to talk to specific knowledgebases like 'My twitter bookmarks', or 'Learning web development'.",
        icon: <MessageCircle />
    },
    {
        title: "Knowledge canvas",
        description: "Arrange your saved information in a way that makes sense to you in a 2D canvas.",
        icon: <Layers />
    },
    {
        title: "Just... bookmarks",
        description: "AI is cool, but sometimes you just need a place to save your stuff. Supermemory is that place.",
        icon: <BookOpenCheck />
    },
    {
        title: "Writing assistant",
        description: "Use our markdown editor to write content based on your saved data, with the help of AI.",
        icon: <Pen />
    }

];
