Initial setup:

<pre>
$ https://github.com/JayedXishan/library_management.git
$ npm install
$ npm install mongoose express zod
$ npm install -D @types/express
$ npm run dev
</pre>

API's :

1. Creating New book : post-> /api/books
2. Getting All books : get-> /api/books
3. Getting book by id : get-> /api/books/:bookId
4. Updating book: put-> /api/books/:bookId
5. Deleting book: delete-> /api/books/:bookId
6. Borrowing book: post-> /api/borrow
7. Getting total borrowed books group by book_id: get->/api/borrow

Features :

1. CRUD operation.
2. 3 layer validation (typescript,mongoose and zod)
3. Custom Error handeling
4. Getting total borrowed book by book Id.
5. Automatic book availability update based on borrowed quantity
6. Separate controllers, routes, models, and validation schemas

Tech stack :

1. Runtime: Node.js
2. Framework: Express.js
3. Database: MongoDB
4. ODM: Mongoose
5. Validation: Zod
6. Language: TypeScript

Prerequisites :

1. node.js
2. npm
3. mongoDB
