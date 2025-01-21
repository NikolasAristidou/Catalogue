import * as fs from 'fs/promises';

export class AffiliateSettings {
    name: string;
    baseUrl: string;
    category?: string;
    additionalConfig?: Record<string, any>;

    constructor(name: string, baseUrl: string, category?: string, additionalConfig?: Record<string, any>) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.category = category;
        this.additionalConfig = additionalConfig;
    }

    // Static method to load settings from a JSON file
static async populate(filePath: string): Promise<AffiliateSettings[]> {
    try {
        // Check if file exists
        await fs.access(filePath);
        
        // Read file content
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Parse JSON and map settings
        const settingsArray = JSON.parse(fileContent);
        return settingsArray.map((setting: any) => {
            if (!setting.name || !setting.baseUrl) {
                throw new Error(`Invalid affiliate setting: ${JSON.stringify(setting)}`);
            }
            return new AffiliateSettings(setting.name, setting.baseUrl, setting.category, setting.additionalConfig);
        });
    } catch (error) {
        console.error(`Error loading affiliate settings: ${error}`);
        throw error; // Re-throw to let the caller handle it
    }
}

}
