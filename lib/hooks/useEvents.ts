import { getAuth } from "firebase/auth"
import { 
    addDoc, 
    collection, 
    doc, 
    getFirestore, 
    onSnapshot, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp
} from "firebase/firestore"
import { useEffect, useState, useCallback } from "react"
import { app } from "../firebase.config"
import { toast } from "sonner"
import { uploadImage } from "@/lib/uploadImage"

export interface Event {
    id: string
    title: string
    date: string
    time: string
    eventType: string
    location: string
    description: string
    banner?: string // Cloudinary URL
    link?:string
    contact?:string
    createdAt?: Timestamp
    updatedAt?: Timestamp
}

type EventFormData = Omit< Event, 'id' | 'createdAt' | 'updatedAt' | 'image'> & { image?: File }

// Hook for all Events operations
export function useEvents() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const auth = getAuth(app)
    const db = getFirestore(app)
    const user = auth.currentUser

    // Get all events
    useEffect(() => {
        const EventRef = collection(db, 'events')
        const q = query(EventRef, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                 console.log('snapshot size:', snapshot.size)
        console.log('snapshot docs:', snapshot.docs)
                const eventsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Event))
                setEvents(eventsData)
                console.log('eventsData:', eventsData)
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                console.log(err.message)
                setLoading(false)
                toast.error(`Error fetching events: ${err.message}`)
            }
        )

        return () => unsubscribe()
    }, [])

    

    // Delete event
    const deleteEvent = useCallback(async (eventId: string) => {
        if (!user) {
            toast.error('You must be logged in to delete an event')
            return false
        }

        try {
            await deleteDoc(doc(db, 'events', eventId))
            toast.success('event deleted successfully!')
            return true
        } catch (error) {
            const errorMessage = (error as Error).message
            toast.error(`Error deleting event: ${errorMessage}`)
            return false
        }
    }, [user?.uid])

    return {
        events,
        loading,
        error,
        deleteEvent
    }
}

// Hook for single event operations
export function useSingleEvent(eventId: string | null) {
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const auth = getAuth(app)
    const db = getFirestore(app)
    const user = auth.currentUser

    useEffect(() => {
        if (!eventId) {
            setLoading(false)
            return
        }

        const eventRef = doc(db, 'events', eventId)
        const unsubscribe = onSnapshot(
            eventRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setEvent({
                        id: snapshot.id,
                        ...snapshot.data()
                    } as Event)
                } else {
                    setError('Event not found')
                }
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
                toast.error(`Error fetching event: ${err.message}`)
            }
        )

        return () => unsubscribe()
    }, [eventId])

    // Update event
    const updateEvent = useCallback(async (data: Partial<EventFormData>) => {
        if (!eventId || !user) {
            toast.error('Invalid event ID or user not authenticated')
            return false
        }

        try {
            let imageUrl: string | undefined
            if (data.image instanceof File) {
                imageUrl = await uploadImage(data.image)
            }

            const eventRef = doc(db, 'events', eventId)
            await updateDoc(eventRef, {
                ...data,
                ...(imageUrl && { image: imageUrl }),
                updatedAt: Timestamp.now()
            })
            toast.success('event updated successfully!')
            return true
        } catch (error) {
            const errorMessage = (error as Error).message
            toast.error(`Error updating event: ${errorMessage}`)
            return false
        }
    }, [eventId, user?.uid])

  

    return {
        event,
        loading,
        error,
        updateEvent,
        
    }
}

// Hook for events filtered by status
export function useEventsByStatus(status: 'draft' | 'published') {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const db = getFirestore(app)

    useEffect(() => {
        const eventsRef = collection(db, 'events')
        const q = query(
            eventsRef,
            where('status', '==', status),
            orderBy('createdAt', 'desc')
        )

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const eventsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Event))
                setEvents(eventsData)
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
                toast.error(`Error fetching ${status} eventss: ${err.message}`)
            }
        )

        return () => unsubscribe()
    }, [status])

    return { events, loading, error }
}

// Convenience hooks
export const usePublishedEvents = () => useEventsByStatus('published')
export const useDraftEvents = () => useEventsByStatus('draft')