import puppeteer, { Browser, Page } from 'puppeteer';

export class BrowserService {
    private browser: Browser | null = null;
    private page: Page | null = null;

    public async goTo(BaseURL: string): Promise<void> {
        await this.startBrowser();
        await this.createNewPage();
        await this.gotoUrl(BaseURL);
    }

    private async startBrowser(): Promise<void> {
        if (this.browser) return; // If browser is already running, do nothing
        this.browser = await puppeteer.launch({ headless: true });
    }

    private async createNewPage(): Promise<void> {
        if (!this.browser) {
            throw new Error('Browser not started. Call startBrowser() first.');
        }
        if (this.page) return;
        this.page = await this.browser.newPage();
    }

    private async gotoUrl(BaseURL: string): Promise<void> {
        if (!this.page) {
            throw new Error('Page not created. Call createNewPage() first.');
        }
        await this.page.goto(BaseURL);
    }

    public async closeBrowser(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null; 
        }
    }

    public getPage(): Page | null {

        if (!this.page) {
            throw new Error('Page not initialized');
        }
        return this.page;
    }
}
