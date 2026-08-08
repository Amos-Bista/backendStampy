"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const app_js_1 = __importDefault(require("../src/app.js"));
const database_js_1 = require("../src/config/database.js");
let databaseConnected = false;
async function handler(req, res) {
    try {
        if (!databaseConnected) {
            await (0, database_js_1.connectDatabase)();
            databaseConnected = true;
        }
        return (0, app_js_1.default)(req, res);
    }
    catch (error) {
        console.error('Vercel function error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
//# sourceMappingURL=index.js.map