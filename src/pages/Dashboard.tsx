
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/card"
import { Share2, Plus, Trash2, Twitter, Youtube, FileText, LinkIcon, Hash } from 'lucide-react'
import Header from "@/components/Header"

const handleSignOut = () => {
  // Implement your sign-out logic here
  console.log('User signed out');
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header onSignOut={handleSignOut}/>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r min-h-screen p-6">
          {/* <div className="flex items-center gap-2 mb-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 text-[#5E43EC]"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="text-xl font-semibold">Second Brain</span>
          </div> */}
          
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              Tweets
            </a>
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
              <Youtube className="h-5 w-5" />
              Videos
            </a>
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
              <FileText className="h-5 w-5" />
              Documents
            </a>
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
              <LinkIcon className="h-5 w-5" />
              as
            </a>
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
              <Hash className="h-5 w-5" />
              Tags
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">All Notes</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Brain
              </Button>
              <Button className="gap-2 bg-[#5E43EC] hover:bg-[#4930c9]">
                <Plus className="h-4 w-4" />
                Add Content
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Ideas Card */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <h3 className="font-medium">Project Ideas</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg font-semibold mb-2">Future Projects</h4>
                <ul className="space-y-2 mb-4">
                  <li>• Build a personal knowledge base</li>
                  <li>• Create a habit tracker</li>
                  <li>• Design a minimalist todo app</li>
                </ul>
                <div className="flex gap-2">
                  <span className="text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm">
                    #productivity
                  </span>
                  <span className="text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm">
                    #ideas
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-4">
                  Added on 10/03/2024
                </div>
              </CardContent>
            </Card>

            {/* How to Build Card */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  <h3 className="font-medium">How to Build a Second Brain</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted aspect-video rounded-md flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex gap-2">
                  <span className="text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm">
                    #productivity
                  </span>
                  <span className="text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm">
                    #learning
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-4">
                  Added on 09/03/2024
                </div>
              </CardContent>
            </Card>

            {/* Productivity Tip Card */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  <h3 className="font-medium">Productivity Tip</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.
                </p>
                <div className="flex gap-2">
                  <span className="text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm">
                    #productivity
                  </span>
                  <span className="text-[#5E43EC] bg-[#5E43EC]/10 px-2 py-1 rounded-md text-sm">
                    #learning
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-4">
                  Added on 08/03/2024
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}