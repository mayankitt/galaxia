import React, { useState } from 'react';
import { 
  Home,
  Wallet,
  Leaf,
  Settings,
  Menu,
  X
} from 'lucide-react';

// Define types for our navigation items
interface NavigationItem {
  name: string;
  icon: React.FC<{ className?: string; size?: number }>;
  id: 'portfolio' | 'finance' | 'green' | 'utilities';
}

// Define type for active section
type ActiveSection = NavigationItem['id'];

const PortfolioPWA: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('portfolio');

  const navigation: NavigationItem[] = [
    { name: 'Portfolio', icon: () => <Home className="mr-3 h-5 w-5" />, id: 'portfolio' },
    { name: 'Finance Tools', icon: () => <Wallet className="mr-3 h-5 w-5" />, id: 'finance' },
    { name: 'Green Living', icon: () => <Leaf className="mr-3 h-5 w-5" />, id: 'green' },
    { name: 'Utilities', icon: () => <Settings className="mr-3 h-5 w-5" />, id: 'utilities' }
  ];

  // Component for section content to avoid repetition
  const SectionContent: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="ml-4 text-xl font-semibold">My Portfolio & Tools</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium ${
                  activeSection === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeSection === 'portfolio' && (
          <SectionContent 
            title="Welcome to My Portfolio"
            description="This is where your portfolio content will go. We'll make this section dynamic and interactive as we build it out."
          />
        )}

        {activeSection === 'finance' && (
          <SectionContent 
            title="Financial Tools"
            description="This section will house our collection of personal finance tools."
          />
        )}

        {activeSection === 'green' && (
          <SectionContent 
            title="Green Living Tools"
            description="Track and improve your environmental impact with these tools."
          />
        )}

        {activeSection === 'utilities' && (
          <SectionContent 
            title="Utility Tools"
            description="General purpose utilities and helpful tools."
          />
        )}
      </main>
    </div>
  );
};

export default PortfolioPWA;