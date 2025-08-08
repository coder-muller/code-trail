import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const task = await prisma.task.findUnique({
		where: { id: params.id }
	})
	if (!task) {
		return NextResponse.json({ error: "Task not found" }, { status: 404 });
	}

	const updated = await prisma.task.update({
		where: { id: params.id },
		data: { completedAt: task.completedAt ? null : new Date() },
	});

	return NextResponse.json(updated);
}

