export interface ListingsApiRes {
    title: string;
    description: string;
    price: Number;
    categoryId: string;
    images: Array<Object> | string;
}

export interface Stock {
    _v: number;
    _id: string;
    categoryId: string;
    description: string;
    images: string;
    price: number;
    title: string;
    updatedAt: string;
}
