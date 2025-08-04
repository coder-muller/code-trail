import { Label } from "@/components/ui/label";

interface ProjectTabProps {
    projectId: string
}

export default function ProjectTab({ projectId }: ProjectTabProps) {
    return (
        <div className="flex flex-col gap-4">
            <Label>Project Tab: Project {projectId}</Label>
        </div>
    )
}