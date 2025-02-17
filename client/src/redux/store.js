import { configureStore } from "@reduxjs/toolkit";
import getAllBooks from "./reducers/books/getAllBooks";
import getAllAuthors from "./reducers/authors/getAllAuthors";
import getAllMajors from "./reducers/majors/getAllMajors";
import getAllDepartments from "./reducers/departments/getAllDepartments";
import getAllSubjects from "./reducers/subjects/getAllSubjects";
export const store = configureStore({
    reducer: {
        getAllBooks,
        getAllAuthors,
        getAllMajors,
        getAllDepartments,
        getAllSubjects
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})