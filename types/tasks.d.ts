export type Task = {
	id: string;
	title: string;
	description: string;
	completedAt: Date;
	completedBy: string;
	dueAt: Date;
	assignee: string;
}
