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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var app = (0, express_1.default)();
// Middleware to log request time
app.use(function (req, res, next) {
    console.log('Request received at:', new Date().toISOString());
    next();
});
// Route: Home
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
// Route: About
app.get('/about', function (req, res) {
    res.send('This is the About page');
});
// Route: Users
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, users, table, _i, users_1, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get('https://jsonplaceholder.typicode.com/users')];
            case 1:
                response = _a.sent();
                users = response.data;
                table = "\n      <table>\n        <tr>\n          <th>ID</th>\n          <th>Name</th>\n          <th>User Name</th>\n          <th>Email</th>\n          <th>Address</th>\n        \n        </tr>";
                for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                    user = users_1[_i];
                    table += "\n        <tr>\n          <td>".concat(user.id, "</td>\n          <td>").concat(user.name, "</td>\n          <td>").concat(user.username, "</td>\n          <td>").concat(user.email, "</td>\n          <td>").concat(user.address.street, ", ").concat(user.address.suite, ", ").concat(user.address.city, ", ").concat(user.address.zipcode, "\n              ").concat(user.address.geo.lat, ", ").concat(user.address.geo.lng, "\n          </td>\n         \n        </tr>");
                }
                table += '</table>';
                res.send(table);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error:', error_1);
                res.status(500).send('Something went wrong');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route: User by ID
app.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, response, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get("https://jsonplaceholder.typicode.com/users/".concat(userId))];
            case 2:
                response = _a.sent();
                user = response.data;
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error:', error_2);
                res.status(500).send('Something went wrong');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
});
// Start the server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
