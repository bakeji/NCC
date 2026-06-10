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

export interface Blog {
    id: string
    title: string
    author: string
    category: string
    image?: string // Cloudinary URL
    excerpt?: string
    content?: string
    created?: Timestamp
    updated?: Timestamp
}

type BlogFormData = Omit<Blog, 'id' | 'created' | 'updated' | 'image'> & { image?: File }

// Hook for all blog operations
export function useBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const auth = getAuth(app)
    const db = getFirestore(app)
    const user = auth.currentUser

    // Get all blogs
    useEffect(() => {
        const blogsRef = collection(db, 'blogs')
        const q = query(blogsRef, orderBy('created', 'desc'))

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const blogsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Blog))
                setBlogs(blogsData)
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
                toast.error(`Error fetching blogs: ${err.message}`)
            }
        )

        return () => unsubscribe()
    }, [])

    

    // Delete blog
    const deleteBlog = useCallback(async (blogId: string) => {
        if (!user) {
            toast.error('You must be logged in to delete a blog')
            return false
        }

        try {
            await deleteDoc(doc(db, 'blogs', blogId))
            toast.success('Blog deleted successfully!')
            return true
        } catch (error) {
            const errorMessage = (error as Error).message
            toast.error(`Error deleting blog: ${errorMessage}`)
            return false
        }
    }, [user?.uid])

    return {
        blogs,
        loading,
        error,
        deleteBlog
    }
}

// Hook for single blog operations
export function useSingleBlog(blogId: string | null) {
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const auth = getAuth(app)
    const db = getFirestore(app)
    const user = auth.currentUser

    useEffect(() => {
        if (!blogId) {
            setLoading(false)
            return
        }

        const blogRef = doc(db, 'blogs', blogId)
        const unsubscribe = onSnapshot(
            blogRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setBlog({
                        id: snapshot.id,
                        ...snapshot.data()
                    } as Blog)
                } else {
                    setError('Blog not found')
                }
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
                toast.error(`Error fetching blog: ${err.message}`)
            }
        )

        return () => unsubscribe()
    }, [blogId])

    // Update blog
    const updateBlog = useCallback(async (data: Partial<BlogFormData>) => {
        if (!blogId || !user) {
            toast.error('Invalid blog ID or user not authenticated')
            return false
        }

        try {
            let imageUrl: string | undefined
            if (data.image instanceof File) {
                imageUrl = await uploadImage(data.image)
            }

            const blogRef = doc(db, 'blogs', blogId)
            await updateDoc(blogRef, {
                ...data,
                ...(imageUrl && { image: imageUrl }),
                updatedAt: Timestamp.now()
            })
            toast.success('Blog updated successfully!')
            return true
        } catch (error) {
            const errorMessage = (error as Error).message
            toast.error(`Error updating blog: ${errorMessage}`)
            return false
        }
    }, [blogId, user?.uid])

    // Publish blog
    // const publishBlog = useCallback(async () => {
    //     return await updateBlog({ status: 'published' })
    // }, [updateBlog])

    // // Save as draft
    // const saveDraft = useCallback(async () => {
    //     return await updateBlog({ status: 'draft' })
    // }, [updateBlog])

    return {
        blog,
        loading,
        error,
        updateBlog,
        // publishBlog,
        // saveDraft
    }
}

// Hook for blogs filtered by status
export function useBlogsByStatus(status: 'draft' | 'published') {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const db = getFirestore(app)

    useEffect(() => {
        const blogsRef = collection(db, 'blogs')
        const q = query(
            blogsRef,
            where('status', '==', status),
            orderBy('created', 'desc')
        )

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const blogsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Blog))
                setBlogs(blogsData)
                setLoading(false)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
                toast.error(`Error fetching ${status} blogs: ${err.message}`)
            }
        )

        return () => unsubscribe()
    }, [status])

    return { blogs, loading, error }
}

// Convenience hooks
export const usePublishedBlogs = () => useBlogsByStatus('published')
export const useDraftBlogs = () => useBlogsByStatus('draft')