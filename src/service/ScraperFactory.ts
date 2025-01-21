import { Scraper } from "../models/Scrapper/Scraper";
import { StephanisScraper } from "../providers/StephanisScraper";
import { AffiliateSettings } from "./AffiliateSettings";
import { BrowserService } from "./BrowserService";

export class ScraperFactory {
    static getScraper(affiliate: AffiliateSettings, browserService: BrowserService): Scraper {
        switch (affiliate.name) {
            case 'Stephanis':
                return new StephanisScraper(browserService, affiliate);
            case 'website2':
                // return new Website2Scraper();
            // Add cases for other websites
            default:
                throw new Error('No scraper available for this website');
        }
    }
}
