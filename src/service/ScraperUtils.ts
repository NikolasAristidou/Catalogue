import * as fs from 'fs/promises';
import { Mappings } from "../models/CategoryMappings";
import { AffiliateSettings } from './AffiliateSettings';

export class ScraperUtils 
{
    static mappings: Mappings;

    static setMappings(mappings: Mappings): void 
    {
        this.mappings = mappings;
    }

    static async retrieveMappings(filePath: string): Promise<void> 
    {
        try {

            await fs.access(filePath);

            const fileContent = await fs.readFile(filePath, 'utf-8');

            const mappingsData: Mappings = JSON.parse(fileContent);

            if (!mappingsData.genericCategories) {
                throw new Error(`Invalid mappings structure: ${JSON.stringify(mappingsData)}`);
            }

            this.setMappings(mappingsData);

        } catch (error) {
            console.error(`Error loading mappings: ${error}`);
            throw error;
        }
    }

    static retrievedCategories(query: string): string[] 
    {
        // Match the categories with the appropriate mappings
        const queryWords = query.toLowerCase().split(' ');
        const matchedCategories: string[] = [];

        for (const [categoryName, categoryData] of Object.entries(this.mappings.genericCategories)) {
            const isMatch = queryWords.some(queryWord => 
                categoryData.keywords.some(keyword => keyword.toLowerCase().includes(queryWord))
            );

            if (isMatch) {
                matchedCategories.push(categoryName);
            }
        }

        return matchedCategories;
    }

    static retrieveAffiliateCategories(matchedCategories: string[], affiliateSettings: AffiliateSettings): { name: string, value: string }[] 
    {
        const matchedAffiliateCategories: { name: string, value: string }[] = [];

        for (const affiliateCategory of affiliateSettings.urlCategories) {
            if (matchedCategories.includes(affiliateCategory.name)) {
                matchedAffiliateCategories.push(affiliateCategory);
            }
        }

        return matchedAffiliateCategories;
    }

    static RetrieveSelectors(selectors: { key: keyof BaseSelector, selector: string }[]): { [key in keyof BaseSelector]: string } {
        return selectors.reduce((acc, { key, selector }) => {
            acc[key] = selector;
            return acc;
        }, {} as { [key in keyof BaseSelector]: string });
    }

}