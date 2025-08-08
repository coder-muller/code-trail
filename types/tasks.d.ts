export type Task = {
	id: string;
	title: string;
	description: string;
	createdAt: Date;
	completedAt: Date?;
	completedBy: string?;
	dueAt: Date?;
	assignee: string;
}
