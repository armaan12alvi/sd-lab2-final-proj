import express, {  Request, Response } from "express";
import { Book } from "../models/books.model";
import { z } from "zod";

export const booksRoutes = express.Router()

const createBookZodSchema = z.object({
    title :z.string(),
    author :z.string(),
    genre :z.string(),
    isbn :z.string(),
    description :z.string().optional(),
    copies :z.number(),
    available :z.boolean(),
})

booksRoutes.post('/',async (req:Request, res : Response)=>{
    

    try{
        const body = await createBookZodSchema.parseAsync(req.body);
        const book = await Book.create(body);

        res.status(201).json({
            success: true,
            message: "book created successfully ",
            book
        })
    }
    catch(error : any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }

})

booksRoutes.get('/',async (req:Request, res : Response)=>{
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc'} = req.query;

        const query: any = {};
        if (filter) query.genre = filter;

        const books = await Book.find(query)
        .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
        

        res.json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }

})
booksRoutes.get('/:bookId',async (req:Request, res : Response)=>{
    const bookId=req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        book
    })

})
booksRoutes.put('/:bookId',async (req:Request, res : Response)=>{
    const updatedBody =req.body;
    const bookId=req.params.bookId;
    const book = await Book.findByIdAndUpdate(bookId,updatedBody,{new :true});

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        book
    })

})
booksRoutes.delete('/:bookId',async (req:Request, res : Response)=>{
    const bookId=req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        book
    })

})