import { Dispatch } from "react";

export interface initialCategoryType {
    categories: Array<any>;
    errors: Array<any>;
    loading: boolean;
}

export interface CategoryContextType {
    categoryState: initialCategoryType;
    categoryDispatch: Dispatch<any>;
}
