import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project } from "@/lib/generated/prisma";

interface ProjectsResponse {
    ownProjects: Project[];
    memberProjects: Project[];
}

export const useProject = () => {
    const queryClient = useQueryClient();

    const { data: projects, isLoading: loading, error } = useQuery<ProjectsResponse, Error>({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await axios.get("/api/project");
            return response.data;
        },
        initialData: { ownProjects: [], memberProjects: [] }
    });

    const { mutateAsync: createProject } = useMutation({
        mutationFn: async ({ name, description }: { name: string; description?: string }) => {
            await axios.post("/api/project", { name, description: description || "" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        projects,
        loading,
        error: error?.message || null,
        createProject: (name: string, description?: string) => createProject({ name, description })
    };
}