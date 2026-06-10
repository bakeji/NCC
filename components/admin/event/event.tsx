'use client';

import { useState } from 'react';

import { Search, Filter, MapPin, Users } from 'lucide-react';
import PageHeader from '../pageHeader';
import Table from '../table';
import Modal from '../modal';
import EventForm from './eventForm';
import { useEvents, type Event as EventType } from '@/lib/hooks/useEvents';
import DeleteEventModal from './deleteEventModal';


const EventsPage = () => {

  const {events, deleteEvent} = useEvents()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventType | null>(null)


  const columns = [
    { key: 'title', label: 'Event Title' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    {
      key: 'location',
      label: 'Location',
      render: (value: string) => (
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-gray-400" />
          {value}
        </span>
      ),
    },
    
    // {
    //   key: 'status',
    //   label: 'Status',
    //   render: (value: string) => (
    //     <span
    //       className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${value === 'Published'
    //           ? 'bg-green-100 text-green-700'
    //           : value === 'Draft'
    //             ? 'bg-yellow-100 text-yellow-700'
    //             : 'bg-red-100 text-red-700'
    //         }`}
    //     >
    //       {value}
    //     </span>
    //   ),
    // },
  ];

  console.log(events)

  const handleEdit = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (event: EventType) => {
   setEventToDelete(event)
  };


 
  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs"
        description="Manage church events and gatherings"
        actionLabel="Create Event"
        onAction={() => {
          setSelectedEvent(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        title={selectedEvent ? 'Edit Event' : 'Create Event'}
        size="lg"
      >
     
        <EventForm 
        key={selectedEvent?.id?? 'new'}
        initialData={selectedEvent}
          onSuccess = {()=>{
            setIsModalOpen(false)
            setSelectedEvent(null)

          }}
        />


      </Modal>

      <DeleteEventModal 
        event={eventToDelete}
        isOpen={!!eventToDelete}
        onClose={() => setEventToDelete(null)}
        onConfirm={deleteEvent}
      />
    </div>
  );
};

export default EventsPage;