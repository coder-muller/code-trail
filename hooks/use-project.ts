import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project, Task } from "@/lib/generated/prisma";

interface ProjectsResponse {
    ownProjects: Project[];
    memberProjects: Project[];
}

interface ProjectWithTasks extends Project {
    tasks: Task[];
}

export const useProject = (projectId?: string) => {
    const queryClient = useQueryClient();

    // Lista todos os projetos
    const { data: projects, isLoading: loading, error } = useQuery<ProjectsResponse, Error>({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await axios.get("/api/project");
            return response.data;
        },
        initialData: { ownProjects: [], memberProjects: [] }
    });

    // Busca projeto específico com tasks
    const { data: project, isLoading: loadingProject } = useQuery<ProjectWithTasks>({
        queryKey: ["project", projectId],
        queryFn: async () => {
            const response = await axios.get(`/api/project/${projectId}`);
            return response.data;
        },
        enabled: !!projectId // Só executa se tiver um projectId
    });

    // Criar projeto
    const { mutateAsync: createProject } = useMutation({
        mutationFn: async ({ name, description }: { name: string; description?: string }) => {
            const response = await axios.post("/api/project", { name, description: description || "" });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    // Atualizar projeto
    const { mutateAsync: updateProject } = useMutation({
        mutationFn: async ({ name, description }: { name: string; description?: string }) => {
            if (!projectId) throw new Error("Project ID is required");
            const response = await axios.patch(`/api/project/${projectId}`, { name, description });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", projectId] });
        },
    });

    // Deletar projeto
    const { mutateAsync: deleteProject } = useMutation({
        mutationFn: async () => {
            if (!projectId) throw new Error("Project ID is required");
            await axios.delete(`/api/project/${projectId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return {
        // Dados
        projects,
        project,
        
        // Loading states
        loading,
        loadingProject,
        
        // Error
        error: error?.message || null,
        
        // Mutations
        createProject: (name: string, description?: string) => createProject({ name, description }),
        updateProject: (name: string, description?: string) => updateProject({ name, description }),
        deleteProject: () => deleteProject()
    };
}