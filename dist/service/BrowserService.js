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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class BrowserService {
    constructor() {
        this.browser = null;
        this.page = null;
    }
    goTo(BaseURL) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startBrowser();
            yield this.createNewPage();
            yield this.gotoUrl(BaseURL);
        });
    }
    startBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser)
                return; // If browser is already running, do nothing
            this.browser = yield puppeteer_1.default.launch({ headless: true });
        });
    }
    createNewPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                throw new Error('Browser not started. Call startBrowser() first.');
            }
            if (this.page)
                return;
            this.page = yield this.browser.newPage();
        });
    }
    gotoUrl(BaseURL) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                throw new Error('Page not created. Call createNewPage() first.');
            }
            yield this.page.goto(BaseURL);
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser) {
                yield this.browser.close();
                this.browser = null;
                this.page = null;
            }
        });
    }
    getPage() {
        if (!this.page) {
            throw new Error('Page not initialized');
        }
        return this.page;
    }
}
exports.BrowserService = BrowserService;
//# sourceMappingURL=BrowserService.js.map