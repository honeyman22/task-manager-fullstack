"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./prisma"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const task_router_1 = __importDefault(require("./routes/task.router"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(user_router_1.default, task_router_1.default, auth_router_1.default);
app.use(error_middleware_1.default);
prisma_1.default
    .$connect()
    .then(() => {
    app.listen(3005, () => {
        console.log(`listening to port : http://localhost:3005`);
    });
})
    .catch((err) => {
    console.log("Error while connecting to the database : ", err);
});
