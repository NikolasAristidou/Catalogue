"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperFactory = void 0;
const StephanisScraper_1 = require("../providers/StephanisScraper");
class ScraperFactory {
    static getScraper(affiliate, browserService) {
        switch (affiliate.name) {
            case 'Stephanis':
                return new StephanisScraper_1.StephanisScraper(browserService, affiliate);
            case 'website2':
            // return new Website2Scraper();
            // Add cases for other websites
            default:
                throw new Error('No scraper available for this website');
        }
    }
}
exports.ScraperFactory = ScraperFactory;
//# sourceMappingURL=ScraperFactory.js.map