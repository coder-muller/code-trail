import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";

export default function TasksTab() {
    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-col">
                <h1 className="text-lg font-bold">Tasks</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your tasks for this project.
                </p>
            </div>

            <div className="flex items-center justify-between gap-2 border border-border rounded-md p-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                        placeholder="Search tasks"
                        className="pl-8"
                    />
                </div>

                <Button variant="default">
                    <Plus />
                    <span className="hidden md:block">Add Task</span>
                </Button>
            </div>

            <div className="flex flex-col gap-4 p-4 border border-border rounded-md">
                <div className="flex flex-col">
                    <Label>All Tasks</Label>
                    <Label className="text-xs text-muted-foreground">
                        All tasks from your project.
                    </Label>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Checkbox />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">Create a new task for this project</p>
                                <p className="text-xs text-muted-foreground">
                                    Create a new task for this project. This task is a placeholder for the task you want to create.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                Due: 05/08/2025
                            </Badge>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Checkbox />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">Start the UI for the task</p>
                                <p className="text-xs text-muted-foreground">
                                    Start the UI for the task. This task is a placeholder for the task you want to create.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* line through when task is completed */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer line-through">
                        <div className="flex items-center gap-4">
                            <Checkbox />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">Finish the UI for the task</p>
                                <p className="text-xs text-muted-foreground">
                                    Finish the UI for the task. This task is a placeholder for the task you want to create.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                Due: 19/08/2025
                            </Badge>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer line-through">
                        <div className="flex items-center gap-4">
                            <Checkbox />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">Finish the backend for the task</p>
                                <p className="text-xs text-muted-foreground">
                                    Finish the backend for the task. This task is a placeholder for the task you want to create.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                Due: 26/08/2025
                            </Badge>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer line-through">
                        <div className="flex items-center gap-4">
                            <Checkbox />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">Finish the backend for the task</p>
                                <p className="text-xs text-muted-foreground">
                                    Finish the backend for the task. This task is a placeholder for the task you want to create.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                Due: 02/09/2025
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
                    <Select>
                        <SelectTrigger className="hidden md:flex">
                            <SelectValue placeholder="Items per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 items</SelectItem>
                            <SelectItem value="20">20 items</SelectItem>
                            <SelectItem value="30">30 items</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="size-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            1 of 10
                        </span>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}   