import mongoConnect from "@/database/mongodb";
import Commandments from "@/model/CommandmentModel";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoConnect();

    try {
        const commandments = await Commandments.find().sort({ questionnaireNumber: 1 }); 
        return NextResponse.json(commandments, { status: 200 });
    } catch (error) {
        console.error("Error fetching commandments:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
