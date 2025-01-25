import { Product } from '../models/Product';
import { Scraper } from '../Interfaces/Scrapper/Scraper';
import { AffiliateSettings } from '../service/AffiliateSettings';
import { BrowserService } from '../service/BrowserService';
import { ScraperUtils } from '../service/ScraperUtils';
import { UrlCategory } from "../models/Affiliate Models/UrlCategory";
import {ProductRetrievalUtils} from "../service/ProductRetrievalUtils";

export class StephanisScraper implements Scraper
{
    private browserService: BrowserService;
    private readonly affiliateSettings: AffiliateSettings;

    constructor(browserService: BrowserService, affiliateSettings: AffiliateSettings)
    {
        this.browserService = browserService;
        this.affiliateSettings = affiliateSettings;
    }

    async search(query: string): Promise<Product[]>
    {
        // Retrieve Categories here
        const retrievedCategories = ScraperUtils.retrievedCategories(query);
        const matchedAffiliateCategories = ScraperUtils.retrieveAffiliateCategories(retrievedCategories, this.affiliateSettings);

        //TV hardcoded for now for testing
        const category = matchedAffiliateCategories.find(cat => cat.name === "TV") as UrlCategory;
        const selectors = ScraperUtils.RetrieveSelectors(category.selectors);

        await this.browserService.goTo(`${this.affiliateSettings.baseUrl}${category.value}`);
        const page = this.browserService.getPage();
        if (!page) {
            throw new Error('Page not initialized');
        }

        // Extract products from the page
        const products = await page.evaluate((selectors) => {

            const productElements = document.querySelectorAll(selectors.itemWrapper);

            let items: Product[] = [];

            productElements.forEach((element) => {
                const id = element.querySelector(selectors.id)?.getAttribute('data-productid') || '';
                const name = element.querySelector(selectors.name)?.textContent?.trim() || '';
                const priceString = element.querySelector(selectors.price)?.textContent?.replace('€', '').replace(',', '').trim() || '0';
                const price = parseFloat(priceString);
                const originalPriceString = element.querySelector(selectors.originalPrice)?.textContent?.replace('€', '').replace(',', '').trim() || null;
                const originalPrice = originalPriceString ? parseFloat(originalPriceString) : null;
                const description = element.querySelector(selectors.description)?.textContent?.trim() || '';
                const link = element.querySelector(selectors.link)?.getAttribute('href') || '';
                const category = 'Television';
                const brand = name.split(' ')[0] || '';
                const sku = element.querySelector(selectors.sku)?.textContent?.trim() || '';
                const imageElements = element.querySelectorAll(selectors.images);
                const images = Array.from(imageElements).map((img) => ({
                    url: img.getAttribute('style')?.match(/url\("(.+?)"\)/)?.[1] || '',
                })).filter(image => image.url); // Exclude invalid URLs

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

        }, selectors);

        await this.browserService.closeBrowser();

        return products;
    }
}
