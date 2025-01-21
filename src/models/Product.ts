export interface Product {
    id: string,
    name: string,
    price: number,
    description?: string;
    link: string,
    category: string;    
    brand?: string;    
    sku?: string;
    images?: Image[] | null;
}