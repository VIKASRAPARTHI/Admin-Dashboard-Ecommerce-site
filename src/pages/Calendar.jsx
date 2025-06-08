import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Plus, X } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { calendarEvents, addCalendarEvent } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [view, setView] = useState('month');

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    toast.success(`Event: ${event.title}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newEvent = {
      title: formData.get('title'),
      start: new Date(formData.get('start')),
      end: new Date(formData.get('end')),
      resource: formData.get('type'),
    };

    addCalendarEvent(newEvent);
    toast.success('Event added successfully');
    setShowModal(false);
    setSelectedSlot(null);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3b82f6';
    
    switch (event.resource) {
      case 'meeting':
        backgroundColor = '#10b981';
        break;
      case 'review':
        backgroundColor = '#f59e0b';
        break;
      case 'call':
        backgroundColor = '#8b5cf6';
        break;
      default:
        backgroundColor = '#3b82f6';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your events and schedule</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="h-[600px]">
          <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            view={view}
            onView={setView}
            eventPropGetter={eventStyleGetter}
            className="text-gray-900 dark:text-white"
            style={{
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Event</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedSlot(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Enter event title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date & Time
                </label>
                <input
                  name="start"
                  type="datetime-local"
                  defaultValue={selectedSlot ? moment(selectedSlot.start).format('YYYY-MM-DDTHH:mm') : ''}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date & Time
                </label>
                <input
                  name="end"
                  type="datetime-local"
                  defaultValue={selectedSlot ? moment(selectedSlot.end).format('YYYY-MM-DDTHH:mm') : ''}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Type
                </label>
                <select
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                >
                  <option value="meeting">Meeting</option>
                  <option value="review">Review</option>
                  <option value="call">Call</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg transition-colors"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedSlot(null);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Event Types</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Meeting</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Call</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Other</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
