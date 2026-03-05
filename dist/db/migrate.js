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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const drizzle_orm_1 = require("drizzle-orm");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function runMigrations() {
    console.log("🚀 Starting migrations...");
    const migrationsDir = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationsDir).sort();
    for (const file of files) {
        if (file.endsWith(".sql")) {
            console.log(`📜 Running migration: ${file}`);
            const filePath = path.join(migrationsDir, file);
            const query = fs.readFileSync(filePath, "utf-8");
            try {
                await db_1.db.execute(drizzle_orm_1.sql.raw(query));
                console.log(`✅ Completed: ${file}`);
            }
            catch (error) {
                console.error(`❌ Error in ${file}:`, error);
                process.exit(1);
            }
        }
    }
    console.log("✨ All migrations completed successfully!");
    process.exit(0);
}
runMigrations();
