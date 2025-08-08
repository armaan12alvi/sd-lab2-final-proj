import { Model, Types } from "mongoose";

export interface IBook {
    title :string,
    author :string,
    genre :string,
    isbn :string,
    description :string,
    copies :number,
    available :boolean
}

export interface BookStaticMethods extends Model<IBook> {
  updateAvailability(bookId: Types.ObjectId, quantity: number): Promise<void>;
}