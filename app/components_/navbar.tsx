"use client";
import { usePathname } from 'next/navigation';
import NavbarClient from './navbar-client';

// This is a server component
const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'About Me', path: '#about', type: 'scroll' },
    { name: 'Projects', path: '#projects', type: 'scroll' },
    { name: 'Resume', path: '#resume', type: 'modal' },
    { name: 'Hire Me', path: '#contact', type: 'scroll' },
  ];

  return (
    <NavbarClient pathname={pathname} navItems={navItems} />
  );
};

export default Navbar;
