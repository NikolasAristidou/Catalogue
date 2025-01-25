import { Product } from "../../models/Product";

export interface Scraper {
    search(query: string): Promise<Product[]>;
}