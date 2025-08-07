import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Project } from "@/lib/generated/prisma";

export const useProject = () => {
    const [projects, setProjects] = useState<{ ownProjects: Project[], memberProjects: Project[] }>({ ownProjects: [], memberProjects: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/project");
            setProjects(response.data as { ownProjects: Project[], memberProjects: Project[] });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.error);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    const createProject = async (name: string, description: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post("/api/project", { name, description });
            getProjects();
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.error);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    return { projects, loading, error, createProject };
}