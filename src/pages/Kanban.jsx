import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, User, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const Kanban = () => {
  const { kanbanData, updateKanbanData } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-700' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' },
  ];

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = kanbanData[source.droppableId];
    const destColumn = kanbanData[destination.droppableId];
    const draggedItem = sourceColumn.find(item => item.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const newItems = Array.from(sourceColumn);
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggedItem);

      updateKanbanData({
        ...kanbanData,
        [source.droppableId]: newItems,
      });
    } else {
      // Moving to a different column
      const sourceItems = Array.from(sourceColumn);
      const destItems = Array.from(destColumn);

      sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, draggedItem);

      updateKanbanData({
        ...kanbanData,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });

      toast.success(`Task moved to ${columns.find(col => col.id === destination.droppableId)?.title}`);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newTask = {
      id: Date.now().toString(),
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      assignee: formData.get('assignee'),
    };

    updateKanbanData({
      ...kanbanData,
      [selectedColumn]: [...kanbanData[selectedColumn], newTask],
    });

    toast.success('Task added successfully');
    setShowAddModal(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const TaskCard = ({ task, index }) => (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 mb-3 cursor-pointer transition-shadow ${
            snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <User className="w-3 h-3" />
              <span>{task.assignee}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your tasks with drag and drop</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span>{column.title}</span>
                  <span className="bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    {kanbanData[column.id].length}
                  </span>
                </h2>
                <button
                  onClick={() => {
                    setSelectedColumn(column.id);
                    setShowAddModal(true);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver ? 'bg-gray-100 dark:bg-dark-600' : ''
                    }`}
                  >
                    {kanbanData[column.id].map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Task Title
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assignee
                </label>
                <input
                  name="assignee"
                  type="text"
                  placeholder="Assign to..."
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Column
                </label>
                <select
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                >
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
