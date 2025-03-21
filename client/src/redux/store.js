import { configureStore } from "@reduxjs/toolkit";
import getAllBooks from "./reducers/books/getAllBooks";
import getAllAuthors from "./reducers/authors/getAllAuthors";
import getAllMajors from "./reducers/majors/getAllMajors";
import getAllDepartments from "./reducers/departments/getAllDepartments";
import getAllSubjects from "./reducers/subjects/getAllSubjects";
import getAllUsers from "./reducers/user/getAllUser";
import getAllBorrows from "./reducers/borrows/getAllBorrows";
export const store = configureStore({
    reducer: {
        getAllBooks,
        getAllAuthors,
        getAllMajors,
        getAllDepartments,
        getAllSubjects,
        getAllUsers,
        getAllBorrows
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})