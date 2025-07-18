import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const records = await prisma.attendancedetails_tb.findMany();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendance records" });
    }
  } else if (req.method === "POST") {
    const { Employee_Name, Employee_ID, Date, Check_In_Time, Check_Out_TIme, Status } = req.body;

    try {
      const newRecord = await prisma.attendancedetails_tb.create({
        data: {
          Employee_Name,
          Employee_ID,
          Date: new Date(Date),
          Check_In_Time: new Date(Check_In_Time),
          Check_Out_TIme: new Date(Check_Out_TIme),
          Status,
        },
      });
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(400).json({ error: "Failed to create attendance record" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
