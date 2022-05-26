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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var mainWindow = null;
main();
function testSqlite() {
    var sqlite3 = require('sqlite3').verbose();
    var testDb = new sqlite3.Database('test.db');
    var sqlite3Encrypt = require('@journeyapps/sqlcipher').verbose();
    var testEncryptDb = new sqlite3Encrypt.Database('test-encrypt.db');
    var insert = function (db) {
        db.serialize(function () {
            // This is the default, but it is good to specify explicitly:
            db.run('PRAGMA cipher_compatibility = 4');
            // To open a database created with SQLCipher 3.x, use this:
            // db.run("PRAGMA cipher_compatibility = 3");
            db.run("PRAGMA key = 'mysecret'");
            db.run('CREATE TABLE lorem (info TEXT)');
            var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
            for (var i = 0; i < 10; i++) {
                stmt.run('Ipsum ' + i);
            }
            stmt.finalize();
            db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
                if (err) {
                    console.error(err);
                }
                console.log(row.id + ': ' + row.info);
            });
        });
        db.close();
    };
    insert(testDb);
    insert(testEncryptDb);
}
function main() {
    var _this = this;
    testSqlite();
    electron_1.app.on('before-quit', function () {
        // cleanUp();
    });
    electron_1.app.whenReady().then(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createWindow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mainWindow = new electron_1.BrowserWindow({
                        width: 2048,
                        height: 1000,
                        // maxWidth: 1024,
                        // minWidth: 1024,
                        minHeight: 768,
                        frame: true,
                        resizable: true,
                        maximizable: true,
                        fullscreen: false,
                        // backgroundColor: '#212121',
                        show: true,
                        webPreferences: {
                            webSecurity: true,
                            nodeIntegration: false,
                            devTools: true,
                            contextIsolation: true,
                            // preload: path.join(__dirname, 'preload.js'),
                        },
                        title: 'test-abc',
                    });
                    mainWindow.on('closed', function () {
                        mainWindow = null;
                    });
                    return [4 /*yield*/, mainWindow.loadURL('http://localhost:8080')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
