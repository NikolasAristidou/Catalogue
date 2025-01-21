import { Product } from "../Product";

export interface Scraper {
    search(query: string): Promise<Product[]>;
}