import { Home, User } from 'lucide-react'
export const navItems = [
  {
    name: 'Home',
    link: '/home',
    // icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    icon: <Home className='h-4 w-4 text-neutral-500 dark:text-white' />
  },
  {
    name: 'Use Case',
    link: '#usecase',
    // icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    icon: <User className='h-4 w-4 text-neutral-500 dark:text-white' />
  }
]
