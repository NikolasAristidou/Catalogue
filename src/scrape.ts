import { AffiliateSettings } from "./service/AffiliateSettings";
import { BrowserService } from "./service/BrowserService";
import { ScraperFactory } from "./service/ScraperFactory";
import * as path from 'path';

async function main() {

    const filePath = path.join(__dirname, 'settings.json');

    const browserService = new BrowserService(); // Create an instance of BrowserService

    const affiliates = await AffiliateSettings.populate(filePath);

    const affiliate = affiliates[0]; // Use default stephanis for now

    const stephanisScraper = ScraperFactory.getScraper(affiliate, browserService);

    const products = await stephanisScraper.search('4K TV');
    
    console.log(products);    
    console.log(products);
}

main();
