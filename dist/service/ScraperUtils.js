"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.ScraperUtils = void 0;
const fs = __importStar(require("fs/promises"));
class ScraperUtils {
    static setMappings(mappings) {
        this.mappings = mappings;
    }
    static retrieveMappings(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.access(filePath);
                const fileContent = yield fs.readFile(filePath, 'utf-8');
                const mappingsData = JSON.parse(fileContent);
                if (!mappingsData.genericCategories) {
                    throw new Error(`Invalid mappings structure: ${JSON.stringify(mappingsData)}`);
                }
                this.setMappings(mappingsData);
            }
            catch (error) {
                console.error(`Error loading mappings: ${error}`);
                throw error;
            }
        });
    }
    static retrievedCategories(query) {
        // Match the categories with the appropriate mappings
        const queryWords = query.toLowerCase().split(' ');
        const matchedCategories = [];
        for (const [categoryName, categoryData] of Object.entries(this.mappings.genericCategories)) {
            const isMatch = queryWords.some(queryWord => categoryData.keywords.some(keyword => keyword.toLowerCase().includes(queryWord)));
            if (isMatch) {
                matchedCategories.push(categoryName);
            }
        }
        return matchedCategories;
    }
    static retrieveAffiliateCategories(matchedCategories, affiliateSettings) {
        const matchedAffiliateCategories = [];
        for (const affiliateCategory of affiliateSettings.urlCategories) {
            if (matchedCategories.includes(affiliateCategory.name)) {
                matchedAffiliateCategories.push(affiliateCategory);
            }
        }
        return matchedAffiliateCategories;
    }
}
exports.ScraperUtils = ScraperUtils;
//# sourceMappingURL=ScraperUtils.js.map