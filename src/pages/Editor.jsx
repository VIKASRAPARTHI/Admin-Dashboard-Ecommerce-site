import React, { useState } from 'react';
import { Save, Download, Upload, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Eye, Code } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const Editor = () => {
  const { colorTheme, colorThemes } = useStore();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const currentTheme = colorThemes[colorTheme];

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    const editor = document.getElementById('editor');
    editor.focus();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const saveDocument = () => {
    const doc = {
      title: title || 'Untitled Document',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('editor-document', JSON.stringify(doc));
    toast.success('Document saved successfully!');
  };

  const exportDocument = () => {
    const doc = {
      title: title || 'Untitled Document',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'document'}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Document exported successfully!');
  };

  const loadDocument = () => {
    const saved = localStorage.getItem('editor-document');
    if (saved) {
      const doc = JSON.parse(saved);
      setTitle(doc.title);
      setContent(doc.content);
      document.getElementById('editor').innerHTML = doc.content;
      toast.success('Document loaded successfully!');
    } else {
      toast.error('No saved document found');
    }
  };

  const ToolbarButton = ({ onClick, icon: Icon, title, isActive = false }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors ${
        isActive ? 'bg-gray-200 dark:bg-dark-600' : ''
      }`}
    >
      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rich Text Editor</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and edit documents with rich formatting</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <button
            onClick={loadDocument}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Load</span>
          </button>
          <button
            onClick={exportDocument}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={saveDocument}
            className="btn-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Document Title */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Editor */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden">
        {!isPreview && (
          <>
            {/* Toolbar */}
            <div className="border-b border-gray-200 dark:border-dark-700 p-3">
              <div className="flex items-center space-x-1 flex-wrap gap-2">
                {/* Text Formatting */}
                <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-dark-600 pr-3">
                  <ToolbarButton
                    onClick={() => formatText('bold')}
                    icon={Bold}
                    title="Bold"
                  />
                  <ToolbarButton
                    onClick={() => formatText('italic')}
                    icon={Italic}
                    title="Italic"
                  />
                  <ToolbarButton
                    onClick={() => formatText('underline')}
                    icon={Underline}
                    title="Underline"
                  />
                </div>

                {/* Alignment */}
                <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-dark-600 pr-3">
                  <ToolbarButton
                    onClick={() => formatText('justifyLeft')}
                    icon={AlignLeft}
                    title="Align Left"
                  />
                  <ToolbarButton
                    onClick={() => formatText('justifyCenter')}
                    icon={AlignCenter}
                    title="Align Center"
                  />
                  <ToolbarButton
                    onClick={() => formatText('justifyRight')}
                    icon={AlignRight}
                    title="Align Right"
                  />
                </div>

                {/* Lists */}
                <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-dark-600 pr-3">
                  <ToolbarButton
                    onClick={() => formatText('insertUnorderedList')}
                    icon={List}
                    title="Bullet List"
                  />
                  <ToolbarButton
                    onClick={() => formatText('insertOrderedList')}
                    icon={ListOrdered}
                    title="Numbered List"
                  />
                </div>

                {/* Insert */}
                <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-dark-600 pr-3">
                  <ToolbarButton
                    onClick={insertLink}
                    icon={Link}
                    title="Insert Link"
                  />
                  <ToolbarButton
                    onClick={insertImage}
                    icon={Image}
                    title="Insert Image"
                  />
                </div>

                {/* Format */}
                <div className="flex items-center space-x-1">
                  <select
                    onChange={(e) => formatText('formatBlock', e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-dark-600 rounded bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  >
                    <option value="div">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="h5">Heading 5</option>
                    <option value="h6">Heading 6</option>
                    <option value="p">Paragraph</option>
                    <option value="blockquote">Quote</option>
                  </select>
                  
                  <select
                    onChange={(e) => formatText('fontSize', e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-dark-600 rounded bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  >
                    <option value="1">8pt</option>
                    <option value="2">10pt</option>
                    <option value="3" selected>12pt</option>
                    <option value="4">14pt</option>
                    <option value="5">18pt</option>
                    <option value="6">24pt</option>
                    <option value="7">36pt</option>
                  </select>

                  <input
                    type="color"
                    onChange={(e) => formatText('foreColor', e.target.value)}
                    className="w-8 h-8 border border-gray-300 dark:border-dark-600 rounded cursor-pointer"
                    title="Text Color"
                  />
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div
              id="editor"
              contentEditable
              className="min-h-[500px] p-6 outline-none text-gray-900 dark:text-white"
              style={{ lineHeight: '1.6' }}
              onInput={(e) => setContent(e.target.innerHTML)}
              placeholder="Start writing your document..."
            />
          </>
        )}

        {/* Preview Mode */}
        {isPreview && (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {title || 'Untitled Document'}
            </h1>
            <div
              className="prose prose-lg max-w-none text-gray-900 dark:text-white"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Characters', 
            value: content.replace(/<[^>]*>/g, '').length,
            icon: '📝'
          },
          { 
            label: 'Words', 
            value: content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length,
            icon: '📄'
          },
          { 
            label: 'Paragraphs', 
            value: (content.match(/<p>/g) || []).length || (content.length > 0 ? 1 : 0),
            icon: '📋'
          },
          { 
            label: 'Reading Time', 
            value: `${Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)} min`,
            icon: '⏱️'
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Templates */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Business Letter',
              content: '<h2>Business Letter</h2><p>Date: [Date]</p><p>Dear [Recipient],</p><p>[Your message here]</p><p>Sincerely,<br>[Your name]</p>'
            },
            {
              name: 'Meeting Notes',
              content: '<h2>Meeting Notes</h2><p><strong>Date:</strong> [Date]</p><p><strong>Attendees:</strong> [Names]</p><h3>Agenda</h3><ul><li>Item 1</li><li>Item 2</li></ul><h3>Action Items</h3><ul><li>Task 1</li><li>Task 2</li></ul>'
            },
            {
              name: 'Project Proposal',
              content: '<h1>Project Proposal</h1><h2>Executive Summary</h2><p>[Brief overview]</p><h2>Objectives</h2><ul><li>Objective 1</li><li>Objective 2</li></ul><h2>Timeline</h2><p>[Project timeline]</p><h2>Budget</h2><p>[Budget details]</p>'
            }
          ].map((template, index) => (
            <button
              key={index}
              onClick={() => {
                setContent(template.content);
                document.getElementById('editor').innerHTML = template.content;
                setTitle(template.name);
                toast.success(`${template.name} template loaded`);
              }}
              className="p-4 text-left border border-gray-200 dark:border-dark-600 rounded-lg hover:border-gray-300 dark:hover:border-dark-500 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Click to load template</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
