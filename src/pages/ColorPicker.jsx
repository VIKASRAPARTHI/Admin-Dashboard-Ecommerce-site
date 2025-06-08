import React, { useState } from 'react';
import { Palette, Save, RotateCcw, Eye, Download, Upload } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const ColorPicker = () => {
  const { colorTheme, setColorTheme, colorThemes } = useStore();
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
  });
  const [previewMode, setPreviewMode] = useState(false);

  const predefinedThemes = [
    { name: 'Ocean Blue', colors: { primary: '#0ea5e9', secondary: '#0284c7', accent: '#38bdf8' } },
    { name: 'Forest Green', colors: { primary: '#059669', secondary: '#047857', accent: '#10b981' } },
    { name: 'Sunset Orange', colors: { primary: '#ea580c', secondary: '#c2410c', accent: '#fb923c' } },
    { name: 'Royal Purple', colors: { primary: '#7c3aed', secondary: '#6d28d9', accent: '#a78bfa' } },
    { name: 'Rose Pink', colors: { primary: '#e11d48', secondary: '#be123c', accent: '#fb7185' } },
    { name: 'Emerald', colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399' } },
    { name: 'Amber', colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' } },
    { name: 'Indigo', colors: { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8' } },
  ];

  const handleColorChange = (colorType, value) => {
    setCustomColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const applyCustomTheme = () => {
    // Create a new custom theme
    const customTheme = {
      primary: customColors.primary,
      secondary: customColors.secondary,
      accent: customColors.accent,
      gradient: `from-[${customColors.primary}] to-[${customColors.secondary}]`
    };

    // Apply the theme immediately
    const root = document.documentElement;
    root.style.setProperty('--color-primary', customTheme.primary);
    root.style.setProperty('--color-secondary', customTheme.secondary);
    root.style.setProperty('--color-accent', customTheme.accent);

    // Update dynamic styles
    const style = document.getElementById('dynamic-theme-style') || document.createElement('style');
    style.id = 'dynamic-theme-style';
    
    style.textContent = `
      .bg-primary-500 { background-color: ${customTheme.primary} !important; }
      .bg-primary-600 { background-color: ${customTheme.secondary} !important; }
      .text-primary-500 { color: ${customTheme.primary} !important; }
      .text-primary-600 { color: ${customTheme.secondary} !important; }
      .border-primary-500 { border-color: ${customTheme.primary} !important; }
      .ring-primary-500 { --tw-ring-color: ${customTheme.primary} !important; }
      .focus\\:ring-primary-500:focus { --tw-ring-color: ${customTheme.primary} !important; }
      .hover\\:bg-primary-600:hover { background-color: ${customTheme.secondary} !important; }
      .btn-primary { background-color: ${customTheme.primary} !important; border-color: ${customTheme.primary} !important; }
      .btn-primary:hover { background-color: ${customTheme.secondary} !important; border-color: ${customTheme.secondary} !important; }
    `;
    
    if (!document.getElementById('dynamic-theme-style')) {
      document.head.appendChild(style);
    }

    toast.success('Custom theme applied successfully!');
  };

  const resetToDefault = () => {
    setCustomColors({
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#60a5fa',
    });
    setColorTheme('blue');
    toast.success('Reset to default theme');
  };

  const exportTheme = () => {
    const themeData = {
      name: 'Custom Theme',
      colors: customColors,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-theme.json';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Theme exported successfully');
  };

  const ColorInput = ({ label, value, onChange, description }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <div 
          className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-dark-600 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => document.getElementById(`color-${label.toLowerCase()}`).click()}
        />
        <input
          id={`color-${label.toLowerCase()}`}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white font-mono text-sm"
            placeholder="#000000"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );

  const ThemePreview = ({ colors, name, onClick }) => (
    <div 
      className="p-4 rounded-lg border-2 border-gray-200 dark:border-dark-600 cursor-pointer hover:border-gray-300 dark:hover:border-dark-500 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
        <div className="flex space-x-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.secondary }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }} />
        </div>
      </div>
      <div className="space-y-2">
        <div 
          className="h-8 rounded flex items-center justify-center text-white text-sm font-medium"
          style={{ backgroundColor: colors.primary }}
        >
          Primary Button
        </div>
        <div className="flex space-x-2">
          <div 
            className="flex-1 h-6 rounded"
            style={{ backgroundColor: colors.secondary }}
          />
          <div 
            className="flex-1 h-6 rounded"
            style={{ backgroundColor: colors.accent }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Color Picker & Theme Customizer</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your dashboard colors and create unique themes</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? 'Exit Preview' : 'Preview Mode'}</span>
          </button>
          <button
            onClick={exportTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Custom Color Picker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Custom Color Palette
            </h2>
            
            <div className="space-y-6">
              <ColorInput
                label="Primary"
                value={customColors.primary}
                onChange={(value) => handleColorChange('primary', value)}
                description="Main brand color used for buttons, links, and highlights"
              />
              
              <ColorInput
                label="Secondary"
                value={customColors.secondary}
                onChange={(value) => handleColorChange('secondary', value)}
                description="Darker shade for hover states and emphasis"
              />
              
              <ColorInput
                label="Accent"
                value={customColors.accent}
                onChange={(value) => handleColorChange('accent', value)}
                description="Light accent color for backgrounds and subtle highlights"
              />
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={applyCustomTheme}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Apply Theme</span>
              </button>
              <button
                onClick={resetToDefault}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Predefined Themes */}
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Predefined Themes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predefinedThemes.map((theme, index) => (
                <ThemePreview
                  key={index}
                  name={theme.name}
                  colors={theme.colors}
                  onClick={() => {
                    setCustomColors(theme.colors);
                    applyCustomTheme();
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Live Preview</h2>
            
            <div className="space-y-4">
              {/* Buttons Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buttons</h3>
                <div className="space-y-2">
                  <button 
                    className="w-full py-2 px-4 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: customColors.primary }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="w-full py-2 px-4 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: customColors.secondary }}
                  >
                    Secondary Button
                  </button>
                  <button 
                    className="w-full py-2 px-4 rounded-lg border-2 font-medium transition-colors"
                    style={{ 
                      borderColor: customColors.primary, 
                      color: customColors.primary 
                    }}
                  >
                    Outline Button
                  </button>
                </div>
              </div>

              {/* Progress Bars */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Progress Bars</h3>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: customColors.primary, width: '75%' }}
                    />
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: customColors.accent, width: '50%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Cards Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cards</h3>
                <div 
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    borderLeftColor: customColors.primary,
                    backgroundColor: customColors.accent + '10'
                  }}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white">Sample Card</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This is how cards will look with your theme</p>
                </div>
              </div>

              {/* Links Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Links & Text</h3>
                <div className="space-y-1">
                  <p className="text-gray-900 dark:text-white">
                    Regular text with <span style={{ color: customColors.primary }} className="font-medium cursor-pointer">primary link</span>
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    Text with <span style={{ color: customColors.secondary }} className="font-medium cursor-pointer">secondary link</span>
                  </p>
                </div>
              </div>

              {/* Badges Preview */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: customColors.primary }}
                  >
                    Primary
                  </span>
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: customColors.secondary }}
                  >
                    Secondary
                  </span>
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-full"
                    style={{ 
                      backgroundColor: customColors.accent + '30',
                      color: customColors.primary
                    }}
                  >
                    Accent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Theme Info */}
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Theme</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Theme:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{colorTheme}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Primary:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: customColors.primary }}
                    />
                    <span className="text-sm font-mono text-gray-900 dark:text-white">{customColors.primary}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secondary:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: customColors.secondary }}
                    />
                    <span className="text-sm font-mono text-gray-900 dark:text-white">{customColors.secondary}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Accent:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: customColors.accent }}
                    />
                    <span className="text-sm font-mono text-gray-900 dark:text-white">{customColors.accent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
