"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const whitelist = ['*'];
dotenv_1.default.config();
require("./infra/database/dataSource");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static('public'));
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)({
    origin: whitelist,
}));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: '/swagger.json',
    },
}));
app.use(routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`🦜: App rodando em http://localhost:${process.env.PORT}`);
});
