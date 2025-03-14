"use client";
import { usePathname } from 'next/navigation';
import NavbarClient from './navbar-client';

// This is a server component
const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'About Me', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Resume', path: '#resume' },
    { name: 'Skills', path: '#skills' },
    { name: 'Hire Me', path: '#contact' },
  ];

  return (
    <NavbarClient pathname={pathname} navItems={navItems} />
  );
};

export default Navbar;
