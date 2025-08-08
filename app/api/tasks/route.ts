import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
	const projectId = request.nextUrl.searchParams.get("projectId");
	if (!projectId) {
		return NextResponse.json({ error: "No project ID provided" }, { status: 400 });
	}

	const project = await prisma.project.findFirst({
		where: {
			id: projectId
		}
	})

	if (!project) {
		return NextResponse.json({ error: "Project not found" }, { status: 404 });
	}

	const tasks = await prisma.task.findMany({
		where: {
			projectId: projectId
		}
	});

	return NextResponse.json({ tasks });
}

export async function POST(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { title, description, dueAt, projectId } = await request.json();

	const task = await prisma.task.create({
		data: {
			title,
			description,
			dueAt,
			projectId,
			assigneeId: session.user.id,
		},
	});

	return NextResponse.json(task);
}

