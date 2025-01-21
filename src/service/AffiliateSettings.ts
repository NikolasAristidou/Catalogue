import * as fs from 'fs/promises';

export interface urlCategory {
    name: string;
    value: string;
}

export class AffiliateSettings {
    name: string;
    baseUrl: string;
    category?: string;
    urlCategories: urlCategory[];

    constructor(name: string, baseUrl: string, category: string, urlCategories: urlCategory[]) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.category = category;
        this.urlCategories = urlCategories;  // No need for optional anymore
    }
    static async populate(filePath: string): Promise<AffiliateSettings[]>
    {
        try {
            await fs.access(filePath);

            const fileContent = await fs.readFile(filePath, 'utf-8');

            const settingsArray = JSON.parse(fileContent);

            return settingsArray.map((setting: any) => {
                if (!setting.name || !setting.baseUrl || !setting.urlCategories) {
                    throw new Error(`Invalid affiliate setting: ${JSON.stringify(setting)}`);
                }

                // Fix: Ensure you are passing `urlCategories` and not `additionalConfig`
                return new AffiliateSettings(
                    setting.name,
                    setting.baseUrl,
                    setting.category, // Optional, can be undefined
                    setting.urlCategories // Corrected field to use `urlCategories`
                );
            });
        } catch (error) {
            console.error(`Error loading affiliate settings: ${error}`);
            throw error;
        }
    }
}
