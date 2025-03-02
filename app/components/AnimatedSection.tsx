import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
}

export default function AnimatedSection({ children }: AnimatedSectionProps) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
} 