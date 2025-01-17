import axios from "axios";

import { TypePost } from "@/types/TypePost";

const API_URL = "http://localhost:8080/api/v1/posts"; // URL base

export const getPosts = async () => {
    const { data } = await axios.get<TypePost[]>(API_URL);
    return data;
};

export const createPost = async (post: Omit<TypePost, "id" | "created_at">): Promise<TypePost> => {
    const { data } = await axios.post(API_URL, post);
    return data;
};

export const updatePost = async (id: number, post: Omit<TypePost, "id">): Promise<TypePost> => {
    const { data } = await axios.put(`${API_URL}/${id}`, post);
    return data;
};

export const deletePost = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

