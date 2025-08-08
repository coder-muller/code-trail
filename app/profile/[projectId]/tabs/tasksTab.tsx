"use client"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Check, ChevronLeft, ChevronRight, EllipsisVertical, Plus, Search, Trash } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Task } from "@/types/tasks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const taskSchema = z.object({
	title: z.string(),
	description: z.string(),
	dueAt: z.date().optional(),
})

interface Props {
	projectId: string;
	initialTasks: Task[];
}

export default function TasksTab({ projectId, initialTasks }: Props) {

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: "",
			description: "",
			dueAt: undefined,
		},
	});

	const [addingTask, setAddingTask] = useState(false);
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
	const [search, setSearch] = useState("");

	const refetch = async () => {
		const { data } = await axios.get(`/api/tasks?projectId=${projectId}`)
		setAllTasks(data.tasks);
		setTasks(data.tasks);
	}

	const sortTasks = (tasks: Task[]) => {
		return tasks.slice().sort((a, b) => {
			if (a.completedAt && !b.completedAt) return 1;
			if (!a.completedAt && b.completedAt) return -1;

			if (a.dueAt && b.dueAt) {
				return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
			}

			if (a.dueAt && !b.dueAt) return -1;
			if (!a.dueAt && b.dueAt) return 1;

			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		})
	}

	const sortedTasks = sortTasks(tasks);

	const addTask = async (values: z.infer<typeof taskSchema>) => {
		toast.success("Task added successfully")
		console.log(values)
		const body = { ...values, projectId: projectId }
		axios.post(`/api/tasks`, body)
			.then((response) => {
				console.log(response)
				refetch()
			})
			.catch((error) => {
				console.error(error);
			});
		setAddingTask(false);
	}

	const toggleTask = (id: string) => {
		axios.patch(`/api/tasks/${id}/toggle`)
			.then(() => refetch())
			.catch(console.error)
	}

	const deleteTask = (id: string) => {
		console.log(id)
		axios.delete(`/api/tasks/${id}`)
			.then((response) => {
				console.log(response)
				refetch()
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (search == "") return setTasks(allTasks);
		const filteredTasks = allTasks.filter((task) => {
			return task.title.toLowerCase().includes(e.target.value.toLowerCase())
		})
		setTasks(filteredTasks);
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
						onChange={(e) => handleSearch(e)}
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
						addingTask &&
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
											name="dueAt"
											render={({ field }) => (
												<FormItem className="flex gap-2">
													<FormLabel className="text-xs text-muted-foreground">Wanna add a due date?</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={"outline"}
																	className={cn(
																		"w-[240px] pl-3 text-left font-normal",
																		!field.value && "text-muted-foreground"
																	)}
																>
																	{field.value ? (
																		format(field.value, "PPP")
																	) : (
																		<span>Pick a date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>

															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="w-auto p-0" align="start">
															<Calendar
																mode="single"
																selected={new Date(field.value!)}
																onSelect={field.onChange}
																captionLayout="dropdown"
															/>
														</PopoverContent>
													</Popover>
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

					}{
						tasks.length === 0 ?
							<>
								<div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4">
									<p>You currently have no tasks. Maybe try adding one?</p>
								</div>
							</>
							:
							sortedTasks.map((task) => {
								return (
									<div key={task.id} className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-md border border-border p-4 hover:bg-muted/40 transition-colors cursor-pointer">
										<div className="flex items-center gap-4">
											<Checkbox
												checked={!!task.completedAt}
												onCheckedChange={() => toggleTask(task.id)}
											/>
											<div className="flex flex-col">
												<p className={`text-sm font-medium ${task.completedAt ? "line-through text-muted-foreground" : ""}`}>
													{task.title}
												</p>
												<p className={`text-xs text-muted-foreground ${task.completedAt ? "line-through" : ""}`}>
													{task.description}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											{task.dueAt &&
												<Badge variant={`${new Date(task.dueAt) < new Date() ? "destructive" : "outline"}`}>
													Due: {new Date(task.dueAt).toLocaleDateString()}
												</Badge>
											}
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<EllipsisVertical className="size-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="w-auto p-1" align="start">
													<DropdownMenuItem onClick={() => deleteTask(task.id)}>
														<Trash className="size-4" />
														<span>Delete Task</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
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
