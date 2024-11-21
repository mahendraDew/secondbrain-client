import React from 'react';
import { BrainCircuit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignOut }) => {
  return (
    <header className=" shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center text-orange-50">
            <BrainCircuit className="h-8 w-8 " />
            <span className="ml-2 text-xl font-semibold text-gray-900">Second Brain</span>
          </div>
          <Button 
            onClick={onSignOut}
            variant="ghost" 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;