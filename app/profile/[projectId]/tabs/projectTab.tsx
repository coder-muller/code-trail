"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Activity, Bug, Calendar, Lightbulb, ListTodo, Target, TrendingUp } from "lucide-react";

interface ProjectTabProps {
    projectId: string
}

export default function ProjectTab({ projectId }: ProjectTabProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <Label className="text-lg font-bold">Project {projectId}</Label>
                <Label className="text-sm text-muted-foreground">A calendar that you can use to plan your project</Label>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target size={20} />
                        Overall Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col w-full items-start justify-center gap-1">
                    <Label className="text-lg font-bold">{Number(projectId) * 10}%</Label>
                    <Progress value={Number(projectId) * 10} className="w-full" />
                </CardContent>
            </Card>

            {/* Project Stats */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ListTodo size={20} />
                            Tasks
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex w-full items-center justify-start gap-1">
                        <Label className="text-2xl font-bold">{Number(projectId) * 2}/{Number(projectId) * 3}</Label>
                    </CardContent>
                    <CardFooter>
                        <Label className="text-sm text-muted-foreground">tasks completed</Label>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb size={20} />
                            Ideas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex w-full items-center justify-start gap-1">
                        <Label className="text-2xl font-bold">{Number(projectId) * 5}</Label>
                    </CardContent>
                    <CardFooter>
                        <Label className="text-sm text-muted-foreground">{Number(projectId) * 2} ideas approved</Label>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bug size={20} />
                            Issues
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex w-full items-center justify-start gap-1">
                        <Label className="text-2xl font-bold">{Number(projectId) * 10}</Label>
                    </CardContent>
                    <CardFooter>
                        <Label className="text-sm text-muted-foreground">{Number(projectId) * 9} issues resolved</Label>
                    </CardFooter>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity size={20} />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Task Completed</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">implement new OAuth flow</Label>
                                </div>
                            </div>
                            <Label className="text-xs font-normal text-muted-foreground">2 hours ago</Label>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Idea Approved</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">implement new OAuth flow</Label>
                                </div>
                            </div>
                            <Label className="text-xs font-normal text-muted-foreground">12 hours ago</Label>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Issue Resolved</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">fix login issue</Label>
                                </div>
                            </div>
                            <Label className="text-xs font-normal text-muted-foreground">1 day ago</Label>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Idea Rejected</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">add a way to add a new task</Label>
                                </div>
                            </div>
                            <Label className="text-xs font-normal text-muted-foreground">4 days ago</Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Deadlines */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp size={20} />
                            Next Deadlines
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <Calendar size={14} className="text-muted-foreground" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Implementar OAuth flow</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">14/08/2025</Label>
                                </div>
                            </div>
                            <Badge variant="outline">
                                High Priority
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <Calendar size={14} className="text-muted-foreground" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Add a new task</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">16/08/2025</Label>
                                </div>
                            </div>
                            <Badge variant="outline">
                                Low Priority
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-4">
                                <Calendar size={14} className="text-muted-foreground" />
                                <div className="flex flex-col gap-1">
                                    <Label className="text-xs font-bold">Create tests for the new feature</Label>
                                    <Label className="text-xs font-normal text-muted-foreground">22/08/2025</Label>
                                </div>
                            </div>
                            <Badge variant="outline">
                                High Priority
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}