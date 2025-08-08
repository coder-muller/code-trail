"use client"
import { Badge } from "@/components/ui/badge";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Task } from "@/types/tasks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Calendar24 from "@/components/calendar-24";
import axios from "axios";

const taskSchema = z.object({
	title: z.string(),
	description: z.string(),
	dueAt: z.date(),
})

export default function TasksTab() {

	const pathname = usePathname();
	const projectId = pathname.split("/")[2];

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: "",
			description: "",
			dueAt: new Date(),
		},
	});

	const [addingTask, setAddingTask] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);

	const fetchTasks = async () => {
		axios.get(`/api/tasks?projectId=${projectId}`)
			.then((response) => {
				setTasks(response.data.tasks);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const addTask = async (values: z.infer<typeof taskSchema>) => {
		toast.success(`Task "${values.title}" was added successfully!`)
		console.log(values)
		const body = { ...values, projectId: projectId }
		axios.post(`/api/tasks`, body)
			.then((response) => {
				console.log(response)
				fetchTasks();
			})
			.catch((error) => {
				console.error(error);
			});
		setAddingTask(false);
	}

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

				<Button
					variant="default"
					onClick={() => setAddingTask(prev => !prev)}
					className={`${addingTask ? "bg-muted" : "bg-primary"} transition-all`}
				>
					<Plus className={`${addingTask ? "rotate-45" : ""} transition-all`} />
					{addingTask ?
						<span className="hidden md:block">Cancel</span>
						:
						<span className="hidden md:block">Add Task</span>
					}
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
					{
						addingTask ?
							<div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(addTask)} className="w-full flex flex-col gap-2">
										<div className="flex flex-col gap-2 w-full">
											<FormField
												control={form.control}
												name="title"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormControl className="w-full">
															<Input required placeholder="Add a title" className="w-full h-full" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="description"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Textarea placeholder="Maybe also add a description" className="w-full h-full" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="flex w-full justify-between gap-2">
											<FormField
												control={form.control}
												name="description"
												render={({ field }) => (
													<FormItem className="flex gap-2">
														<FormLabel className="text-xs text-muted-foreground">Wanna add a due date?</FormLabel>
														<FormControl>
															<Calendar24 />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Button type="submit" variant="default" className="h-full self-end">
												<Check />
												<span className="italic">Add Task</span>
											</Button>
										</div>
									</form>
								</Form>
							</div>
							:
							tasks.length === 0 ?
								<>
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
									<div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4">
										<p>You currently have no tasks. Maybe try adding one?</p>
									</div>
								</>
								:
								tasks.map((task) => {
									return (
										<div key={task.id} className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer">
											<div className="flex items-center gap-4">
												<Checkbox />
												<div className="flex flex-col">
													<p className="text-sm font-medium">{task.title}</p>
													<p className="text-xs text-muted-foreground">
														{task.description}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												{task.dueAt ?
													<Badge variant="outline">
														Due: {task.dueAt.toLocaleDateString()}
													</Badge>
													:
													<Badge variant="outline">
														Due: No due date
													</Badge>
												}
											</div>
										</div>
									)
								})
					}
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
