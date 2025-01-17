import { useState, useEffect } from "react";
import {createPost, deletePost, getPosts} from "@/services/apiPost.ts";
import { TypePost } from "@/types/TypePost";
import {toast} from "sonner";
import {Ban, Save, Trash} from "lucide-react";

export const usePostCrud = () => {
    const [posts, setPosts] = useState<TypePost[]>([]);
    const [newPost, setNewPost] = useState<Omit<TypePost, "id" | "created_at">>({title: "", description: "" });

    const loadPosts = async () => {
        try {
            const posts = await getPosts();
            setPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleCreate = async () => {
        try {
            await createPost(newPost);
            setNewPost({title: "", description: "" });
            toast("Event has been created", {
                description: "Post created at " + new Date().toLocaleString(),
                duration: 3000,
                position: "top-right",
                icon: (
                    <Save size={16} />
                )
            })
            loadPosts();
        } catch (error) {
            console.error("Error creating post:", error);
            toast("Error creating post", {
                description: "Error creating post",
                duration: 3000,
                position: "top-right",
                icon: (
                    <Ban size={16} />
                )
            })
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts(posts.filter(p => p.id !== id));
            const postToDelete = posts.find(p => p.id === id);
            toast("Event has been deleted", {
                description: `Post deleted at ${new Date().toLocaleString()}. Title: ${postToDelete?.title}`,
                duration: 3000,
                position: "top-right",
                icon: (
                    <Trash size={16} />
                ),
            });
            loadPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);// Cargar posts al montar el componente

    return { loadPosts, handleCreate, handleDelete, posts, setPosts, newPost, setNewPost}; // Exponemos el estado y las funciones
};
