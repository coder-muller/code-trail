"use client"

import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Loader2, Plus, Sparkles, X } from "lucide-react";
import { useProject } from "@/hooks/use-project";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
});

export default function Header() {
    // Hooks
    const { createProject, loading, error } = useProject();

    // State
    const [open, setOpen] = useState(false);

    // Form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const handleOpen = () => {
        form.reset();
        setOpen(true);
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await createProject(data.name, data.description);
        if (!error) {
            form.reset();
            setOpen(false);
        } else {
            toast.error(error);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Button variant="outline" onClick={handleOpen}>
                        <Plus />
                        New Project
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-gradient-to-r hover:text-white from-primary to-primary/80 text-white hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary transition-colors duration-300">
                        <Sparkles />
                        <span className="hidden md:block">Ask AI</span>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Project</DialogTitle>
                        <DialogDescription>Create a new project to get started.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter the project name" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter the project description" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <DialogFooter>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <Loader2 className="size-4 animate-spin" /> : "Create"}
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="outline" disabled={loading}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}