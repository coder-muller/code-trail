import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ownProjects = await prisma.project.findMany({
        where: {
            ownerId: session.user.id,
        },
    });

    const memberProjects = await prisma.project.findMany({
        where: {
            projectMembers: {
                some: {
                    userId: session.user.id,
                },
            },
        },
    });

    return NextResponse.json({ ownProjects, memberProjects });
}

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await request.json();

    const project = await prisma.project.create({
        data: {
            name,
            description,
            ownerId: session.user.id,
        },
    });

    return NextResponse.json(project);
}
