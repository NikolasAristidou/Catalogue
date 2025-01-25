"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StephanisScraper = void 0;
const ScraperUtils_1 = require("../service/ScraperUtils");
class StephanisScraper {
    constructor(browserService, affiliateSettings) {
        this.browserService = browserService;
        this.affiliateSettings = affiliateSettings;
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve Categories here
            const retrievedCategories = ScraperUtils_1.ScraperUtils.retrievedCategories(query);
            const matchedAffiliateCategories = ScraperUtils_1.ScraperUtils.retrieveAffiliateCategories(retrievedCategories, this.affiliateSettings);
            yield this.browserService.goTo(`${this.affiliateSettings.baseUrl}/en/products/sound-and-vision/television-and-accessories/television`);
            const page = this.browserService.getPage();
            if (!page) {
                throw new Error('Page not initialized');
            }
            // Extract products from the page
            const products = yield page.evaluate(() => {
                const items = [];
                const productElements = document.querySelectorAll('.item-wrapper');
                productElements.forEach((element) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                    const id = ((_a = element.querySelector('.spotlight-list-text')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-productid')) || '';
                    const name = ((_c = (_b = element.querySelector('.tile-product-name')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '';
                    const priceString = ((_e = (_d = element.querySelector('.listing-details-heading.large-now-price')) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.replace('€', '').replace(',', '').trim()) || '0';
                    const price = parseFloat(priceString);
                    const originalPriceString = ((_g = (_f = element.querySelector('.listing-details.large-was-price')) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.replace('€', '').replace(',', '').trim()) || null;
                    const originalPrice = originalPriceString ? parseFloat(originalPriceString) : null;
                    const description = ((_j = (_h = element.querySelector('.specs')) === null || _h === void 0 ? void 0 : _h.textContent) === null || _j === void 0 ? void 0 : _j.trim()) || '';
                    const link = ((_k = element.querySelector('a')) === null || _k === void 0 ? void 0 : _k.getAttribute('href')) || '';
                    const category = 'Television'; // Hardcoded as per this scraper's focus
                    const brand = name.split(' ')[0] || ''; // Assuming the brand is the first word in the name
                    const sku = ((_m = (_l = element.querySelector('.product-code')) === null || _l === void 0 ? void 0 : _l.textContent) === null || _m === void 0 ? void 0 : _m.trim()) || '';
                    const imageElements = element.querySelectorAll('.property-spotlight-image-link-3');
                    const images = Array.from(imageElements).map((img) => {
                        var _a, _b;
                        return ({
                            url: ((_b = (_a = img.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.match(/url\("(.+?)"\)/)) === null || _b === void 0 ? void 0 : _b[1]) || '',
                        });
                    }).filter(image => image.url); // Exclude invalid URLs
                    items.push({
                        id,
                        name,
                        price,
                        description,
                        link: link.startsWith('/') ? `https://www.stephanis.com.cy${link}` : link,
                        category,
                        brand,
                        sku,
                        images,
                    });
                });
                return items;
            });
            yield this.browserService.closeBrowser();
            return products;
        });
    }
}
exports.StephanisScraper = StephanisScraper;
//# sourceMappingURL=StephanisScraper.js.map