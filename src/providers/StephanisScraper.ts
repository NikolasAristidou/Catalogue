import { Product } from '../models/Product';
import { Scraper } from '../models/Scrapper/Scraper';
import { BrowserService } from '../service/BrowserService';

export class StephanisScraper implements Scraper {
    private browserService: BrowserService;
    private url: string;

    constructor(browserService: BrowserService, url: string) {
        this.url = url;
        this.browserService = browserService;
        this.url = "https://www.stephanis.com.cy/en/products/sound-and-vision/television-and-accessories/television";
    }

    async search(query: string): Promise<Product[]> {

        await this.browserService.goTo(this.url);

        const page = this.browserService.getPage();
        
        if (!page) {
            throw new Error('Page not initialized');
        }

        // Extract products from the page

        const products = await page.evaluate(() => {
            
            const items: Product[] = [];
            const productElements = document.querySelectorAll('.item-wrapper');

            productElements.forEach((element) => {
                const id = element.querySelector('.spotlight-list-text')?.getAttribute('data-productid') || '';
                const name = element.querySelector('.tile-product-name')?.textContent?.trim() || '';
                const priceString = element.querySelector('.listing-details-heading.large-now-price')?.textContent?.replace('€', '').replace(',', '').trim() || '0';
                const price = parseFloat(priceString);
                const originalPriceString = element.querySelector('.listing-details.large-was-price')?.textContent?.replace('€', '').replace(',', '').trim() || null;
                const originalPrice = originalPriceString ? parseFloat(originalPriceString) : null;
                const description = element.querySelector('.specs')?.textContent?.trim() || '';
                const link = element.querySelector('a')?.getAttribute('href') || '';
                const category = 'Television'; // Hardcoded as per this scraper's focus
                const brand = name.split(' ')[0] || ''; // Assuming the brand is the first word in the name
                const sku = element.querySelector('.product-code')?.textContent?.trim() || '';
                const imageElements = element.querySelectorAll('.property-spotlight-image-link-3');
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
        });

        await this.browserService.closeBrowser();
        return products;
    }
}
