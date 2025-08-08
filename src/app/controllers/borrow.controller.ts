import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

import mongoose from "mongoose";

export const borrowRoutes = express.Router();

import { z } from "zod";

export const borrowBookZodSchema = z.object({
  book: z.string(),
  quantity: z.number().min(1),
  dueDate: z.coerce.date(),
});
borrowRoutes.post("/", async (req: Request, res: Response,next: NextFunction) : Promise<void> => {
  try {
    const body = await borrowBookZodSchema.parseAsync(req.body);

    // Check if valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(body.book)) {
        res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    // Update availability using static method
    await Book.updateAvailability(new mongoose.Types.ObjectId(body.book), body.quantity);

    // Create borrow record
    const borrow = await Borrow.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
     res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error.message,
    });
  }
});

