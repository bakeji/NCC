"use client"
import { app } from "@/lib/firebase.config";
import {type Event} from "@/lib/hooks/useEvents"
import { uploadImage } from "@/lib/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {z} from "zod";



// Initial data
interface EventFormProps {
  initialData?: Event | null;  // ← use Blog directly
  onSuccess?: () => void;
}




// Zod Schema
const eventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    date: z.string(),
    time: z.string(),
    location: z.string().min(1,'location is required'),
    eventType: z.string().min(1,'Excerpt must be less than 200 characters'),
    description: z.string().min(1,'Content is required'),
    banner: z.instanceof(File).optional(),
    link: z.string().optional(),
    contact: z.string().optional(),

})

type EventFormData = z.infer<typeof eventSchema>

export default function EventForm({initialData, onSuccess}:EventFormProps){

      const {
         register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
      } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData
          ? {
                title: initialData.title,
                date: initialData.date,
                time: initialData.time,
                location:initialData.location,
                eventType: initialData.eventType,
                description:initialData.description,
                // banner: initialData.banner,
                link: initialData.link,
                contact: initialData.contact
            
            }
          : undefined,
      });



      useEffect(()=>{
        if(initialData){
            reset({
                   title: initialData.title,
                date: initialData.date,
                time: initialData.time,
                location:initialData.location,
                eventType: initialData.eventType,
                description:initialData.description,
                // banner: initialData.banner,
                link: initialData.link,
                contact: initialData.contact

            })
        } else{
            reset();
        }
      }, [initialData, reset]);

      const [loading, setLoading] = useState(false)


      async function addEvent(data:EventFormData){
        setLoading(true);
        try{
            const auth = getAuth(app);
            const db = getFirestore(app);
            const user = auth.currentUser;

            if(!user){
                toast.error("you must be logged in to create Event")
            }

            let imageUrl  = initialData?.banner ?? '';
            if(data.banner instanceof File) {
                imageUrl = await uploadImage(data.banner)
            }

            if (initialData?.id){
                await updateDoc(doc(db, 'events', initialData.id), {
                     title: data.title,
                date: data.date,
                time: data.time,
                location:data.location,
                eventType: data.eventType,
                description:data.description,
                // banner: initialData.banner,
                link: data.link,
                contact: data.contact,
                updated: serverTimestamp()

                })
                toast.success('Event updated successfully! ')
            } else{
                await addDoc(collection(db, 'events'), {
                      title: data.title,
                date: data.date,
                time: data.time,
                location:data.location,
                eventType: data.eventType,
                description:data.description,
                 banner: imageUrl,
                link: data.link,
                contact: data.contact,
                created: serverTimestamp()

                });
                toast.success('Event published successfully')
            }

            onSuccess?.()
        } catch (error){
            toast.error(`Error: ${(error as Error).message}`)
        } finally{
            setLoading(false)
        }
      }


       const handleCancel = () => {
                reset();

        };

        const eventTypes = [
        { value: 'service', label: 'Church Service' },
        { value: 'conference', label: 'Conference' },
        { value: 'fellowship', label: 'Fellowship' },
        { value: 'prayer', label: 'Prayer Meeting' },
        { value: 'outreach', label: 'Outreach' },
        ];





    return(
        <form onSubmit={handleSubmit(addEvent)} className="space-y-6" >

              {/* Title */}
      <div className="w-full">

            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
            <span className="text-red-500 ml-1">*</span>
            </label>

            <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            className={`block w-full rounded-lg border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
            } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
            {...register('title')}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* time & date */}

      <div  className="grid gap-6 sm:grid-cols-2" >
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                    <span className="text-red-500 ml-1">*</span>
                </label>

                <input 
                    type="date"
                    id="date"
                    className={`block w-full rounded-lg border ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                    {...register('date')} 
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}   
            </div>

                 <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Time
                    <span className="text-red-500 ml-1">*</span>
                </label>

                <input 
                    type="time"
                    id="time"
                    className={`block w-full rounded-lg border ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                    {...register('time')} 
                />
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}   
            </div>

      </div>


       <div className="w-full">

            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
            <span className="text-red-500 ml-1">*</span>
            </label>

            <input
            id="location"
            type="text"
            placeholder="Enter event location"
            className={`block w-full rounded-lg border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
            } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
            {...register('location')}
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
      </div>


        <div className="w-full">

            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
            <span className="text-red-500 ml-1">*</span>
            </label>

            <select
                id="event type"
            className={`block w-full rounded-lg border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
            } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
            {...register('eventType')}
            >

                    
                <option value=""> select an event type </option>
                 {eventTypes.map((type, id)=>(
                <option key={id} value={type.value}>{type.label} </option>
                
                ))}
            </select>
            {errors.eventType && <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>}
      </div>


       {/* Featured Image */}
            <div className="w-full">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Event Banner
              </label>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className={`block w-full rounded-lg border ${
                      errors.banner ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                    {...field}
                  />
                )}
              />
              {errors.banner && <p className="mt-1 text-sm text-red-600">{errors.banner.message}</p>}
              {!errors.banner && (
                <p className="mt-1 text-sm text-gray-500">Upload a banner image for this event</p>
              )}
            </div>


             {/* description */}
      <div className="w-full">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Description
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="description"
          placeholder="Write your event description here."
          rows={6}
          className={`block w-full rounded-lg border ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors resize-none`}
          {...register('description')}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        {!errors.description && (
          <p className="mt-1 text-sm text-gray-500">Detailed description of event</p>
        )}
      </div>


       {/* link & email */}

      <div  className="grid gap-6 sm:grid-cols-2" >
            <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Link (optional)
                </label>

                <input 
                    type="text"
                    id="link"
                    className={`block w-full rounded-lg border ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                    {...register('link')} 
                />
                {errors.link && <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>}   
            </div>

                 <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact number
                </label>
                

                <input 
                    type="tel"
                    id="contact"
                    className={`block w-full rounded-lg border ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                    {...register('contact')} 
                    placeholder="080 0000 0000"
                />
                {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}   
            </div>

      </div>


       {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
        >
        {loading
    ? initialData ? 'Saving...' : 'Publishing...'
    : initialData ? 'Save Changes' : 'Publish Event'}
        </button>
      </div>








            



        </form>
    )
}