import React, { useEffect } from 'react';
import useStore from '../store/useStore';

const ThemeProvider = ({ children }) => {
  const { colorTheme, colorThemes } = useStore();

  useEffect(() => {
    const currentTheme = colorThemes[colorTheme];
    if (currentTheme) {
      // Update CSS custom properties for dynamic theming
      const root = document.documentElement;
      root.style.setProperty('--color-primary', currentTheme.primary);
      root.style.setProperty('--color-secondary', currentTheme.secondary);
      root.style.setProperty('--color-accent', currentTheme.accent);
      
      // Update Tailwind classes dynamically
      const style = document.getElementById('dynamic-theme-style') || document.createElement('style');
      style.id = 'dynamic-theme-style';
      
      style.textContent = `
        .bg-primary-500 { background-color: ${currentTheme.primary} !important; }
        .bg-primary-600 { background-color: ${currentTheme.secondary} !important; }
        .text-primary-500 { color: ${currentTheme.primary} !important; }
        .text-primary-600 { color: ${currentTheme.secondary} !important; }
        .border-primary-500 { border-color: ${currentTheme.primary} !important; }
        .ring-primary-500 { --tw-ring-color: ${currentTheme.primary} !important; }
        .focus\\:ring-primary-500:focus { --tw-ring-color: ${currentTheme.primary} !important; }
        .hover\\:bg-primary-600:hover { background-color: ${currentTheme.secondary} !important; }
        .bg-gradient-to-r.${currentTheme.gradient.replace('from-', 'from-').replace('to-', 'to-')} {
          background-image: linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.secondary}) !important;
        }
        
        /* Chart colors */
        .recharts-default-tooltip {
          background-color: ${currentTheme.primary}20 !important;
          border: 1px solid ${currentTheme.primary} !important;
        }
        
        /* Button variants */
        .btn-primary {
          background-color: ${currentTheme.primary} !important;
          border-color: ${currentTheme.primary} !important;
        }
        .btn-primary:hover {
          background-color: ${currentTheme.secondary} !important;
          border-color: ${currentTheme.secondary} !important;
        }
        
        /* Status indicators */
        .status-primary {
          background-color: ${currentTheme.primary}20 !important;
          color: ${currentTheme.primary} !important;
        }
        
        /* Progress bars */
        .progress-primary {
          background-color: ${currentTheme.primary} !important;
        }
        
        /* Links */
        .link-primary {
          color: ${currentTheme.primary} !important;
        }
        .link-primary:hover {
          color: ${currentTheme.secondary} !important;
        }
      `;
      
      if (!document.getElementById('dynamic-theme-style')) {
        document.head.appendChild(style);
      }
    }
  }, [colorTheme, colorThemes]);

  return <>{children}</>;
};

export default ThemeProvider;
