export interface CategoryMapping {
  keywords: string[];
  brands: string[];
}

export interface Mappings {
  genericCategories: {
    [category: string]: CategoryMapping;
  };
}