import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	await prisma.task.delete({
		where: {
			id: params.id,
		},
	});

	return NextResponse.json({ message: "Task deleted" });
}
