import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Folder, History, Lightbulb, ListTodo, Users } from "lucide-react"
import ProjectTab from "./tabs/projectTab"
import TasksTab from "./tabs/tasksTab"
import IdeasTab from "./tabs/ideasTab"
import IssuesTab from "./tabs/issuesTab"
import HistoryTab from "./tabs/historyTab"
import MembersTab from "./tabs/membersTab"

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params

    return (
        <div className="flex flex-col gap-6 max-w-screen-xl mx-auto">
            <Tabs defaultValue="project" className="w-full flex flex-col gap-4">
                <TabsList className="w-full md:w-fit">
                    <TabsTrigger value="project" className="px-4">
                        <Folder />
                        <span className="hidden md:block">Project</span>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="px-4">
                        <ListTodo />
                        <span className="hidden md:block">Tasks</span>
                    </TabsTrigger>
                    <TabsTrigger value="ideas" className="px-4">
                        <Lightbulb />
                        <span className="hidden md:block">Ideas</span>
                    </TabsTrigger>
                    <TabsTrigger value="issues" className="px-4">
                        <Bug />
                        <span className="hidden md:block">Issues</span>
                    </TabsTrigger>
                    <TabsTrigger value="history" className="px-4">
                        <History />
                        <span className="hidden md:block">History</span>
                    </TabsTrigger>
                    <TabsTrigger value="members" className="px-4">
                        <Users />
                        <span className="hidden md:block">Members</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="project">
                    <ProjectTab
                        projectId={projectId}
                    />
                </TabsContent>
                <TabsContent value="tasks">
                    <TasksTab />
                </TabsContent>
                <TabsContent value="ideas">
                    <IdeasTab />
                </TabsContent>
                <TabsContent value="issues">
                    <IssuesTab />
                </TabsContent>
                <TabsContent value="history">
                    <HistoryTab />
                </TabsContent>
                <TabsContent value="members">
                    <MembersTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}