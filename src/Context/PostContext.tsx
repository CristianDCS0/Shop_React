import React, { createContext, useContext } from "react";
import { usePostCrud } from "@/hooks/Post/hookPost";
import { TypePost } from "@/types/TypePost";

interface PostsContextType {
    posts: TypePost[];
    handleCreate: () => void;
    handleDelete: (id: number) => void;
    newPost: { title: string; description: string };
    setNewPost: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { posts, handleCreate, handleDelete, newPost, setNewPost } = usePostCrud();

    return (
        <PostsContext.Provider value={{ posts, handleCreate, handleDelete, newPost, setNewPost }}>
            {children}
        </PostsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePosts must be used within a PostsProvider");
    }
    return context;
};
