"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
// create router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
userRouter.post("/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User Created Successfully!",
        data: user,
    });
});
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course Created Successfully!",
        data: course,
    });
});
//using middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get("/", logger, (req, res) => {
    res.send("Hello Developer!");
});
// handle error
app.post("/", (req, res, next) => {
    try {
        // console.log(something wrong);
        console.log("something wrong");
        res.json({
            message: "post request send",
        });
    }
    catch (error) {
        next(error);
        // console.log(error);
        // res.status(400).json({
        //   success: false,
        //   message: "field to post request data",
        // });
    }
});
// route not found handle
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route Not found",
    });
});
//global error handler
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        res.status(400).json({
            success: false,
            message: "field to post request data",
        });
    }
});
exports.default = app;
