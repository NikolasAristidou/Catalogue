import { AffiliateSettings } from "./service/AffiliateSettings";
import { BrowserService } from "./service/BrowserService";
import { ScraperFactory } from "./service/ScraperFactory";
import * as path from 'path';
import { ScraperUtils } from "./service/ScraperUtils";

async function main() {

    const browserService = new BrowserService();
    const mappingsPath = path.join(__dirname, 'mappings.json');
    const filePath = path.join(__dirname, 'settings.json');
    const affiliates = await AffiliateSettings.populate(filePath);

    await ScraperUtils.retrieveMappings(mappingsPath);

    const affiliate = affiliates[0]; // Use default stephanis for now

    const stephanisScraper = ScraperFactory.getScraper(affiliate, browserService);

    const products = await stephanisScraper.search('4K TV');
    
    console.log(products);    
}

main();
