# Book Bazaar — Experiment 9
## Working with MongoDB using Shell Commands

This is the Experiment 9 program adapted to the **Second-Hand Book Store** theme.

### Fields used
`bookId`, `title`, `author`, `category`, `price`, `stock`

### Run
1. Ensure MongoDB is installed and running.
2. Open a terminal and type `mongosh`.
3. Copy/paste commands from `experiment9_book_bazaar.js` into mongosh **in order**.
4. Commands are intended to be entered one at a time. `use`, `show collections`, and `show dbs` are mongosh commands.

Database: `BookBazaarDB`
Collection: `books`

Note: `deleteMany({ stock: 0 })` removes all zero-stock books; run it only when you intend to perform the deletion.
