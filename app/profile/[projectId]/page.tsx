import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Folder, History, Lightbulb, ListTodo } from "lucide-react"
import ProjectTab from "./tabs/projectTab"
import TasksTab from "./tabs/tasksTab"
import IdeasTab from "./tabs/ideasTab"
import IssuesTab from "./tabs/issuesTab"
import HistoryTab from "./tabs/historyTab"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
    const { projectId } = params

    return (
        <div className="flex flex-col gap-4">
            <Tabs defaultValue="project" className="w-full flex flex-col gap-4">
                <TabsList>
                    <TabsTrigger value="project" className="px-4">
                        <Folder />
                        Project
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="px-4">
                        <ListTodo />
                        Tasks
                    </TabsTrigger>
                    <TabsTrigger value="ideas" className="px-4">
                        <Lightbulb />
                        Ideas
                    </TabsTrigger>
                    <TabsTrigger value="issues" className="px-4">
                        <Bug />
                        Issues
                    </TabsTrigger>
                    <TabsTrigger value="history" className="px-4">
                        <History />
                        History
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
            </Tabs>
        </div>
    )
}