
interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'work', label: 'My Work' },
    { id: 'contact', label: 'Contact Me' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 px-4 py-6 text-center font-medium transition-colors duration-200
                ${
                  activeSection === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}