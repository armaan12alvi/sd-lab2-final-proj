import { model, Schema, Types } from "mongoose"
import { BookStaticMethods, IBook} from "../interfaces/book.interface"


const bookSchema = new Schema <IBook> ({
    title :{
        type: String,
        required: true,
        trim: true,
    },
    author :{
        type: String,
        required: true,
        trim: true,
    },
    genre :{
        type: String,
        enum: ["FICTION","NON_FICTION","SCIENCE","HISTORY","BIOGRAPHY","FANTASY"],
        required: true,
        trim: true,
    },
    isbn :{
        type: String,
        required: true,
        unique:true
    },
    description :{
        type: String,
        trim: true,
    },
    copies :{
        type: Number,
        required: true,
        min:0,
    },
    available :{
        type: Boolean,
        required: true,
        default: true,
    }
},{
    versionKey:false,
    timestamps:true
})



bookSchema.statics.updateAvailability = async function (
  bookId: Types.ObjectId,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();
};



export const Book = model<IBook,BookStaticMethods>("Book",bookSchema)

