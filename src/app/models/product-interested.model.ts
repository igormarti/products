import { Product } from "./product.model";

export interface ProductInterested extends Product {
    isFavorite:boolean;
    isCart:boolean;
}