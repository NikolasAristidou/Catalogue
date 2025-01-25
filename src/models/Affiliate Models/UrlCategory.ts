export interface UrlCategory {
    name: string;
    value: string;
    selectors: { key: keyof BaseSelector, selector: string }[]; // Array of key-selector pairs
}