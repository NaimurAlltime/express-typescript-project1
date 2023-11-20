import express, { NextFunction, Request, Response } from "express";
const app = express();

//parsers
app.use(express.json());

// create router
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User Created Successfully!",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: "Course Created Successfully!",
    data: course,
  });
});

//using middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);

  next();
};

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Developer!");
});

// handle error
app.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(something wrong);
    console.log("something wrong");
    res.json({
      message: "post request send",
    });
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(400).json({
    //   success: false,
    //   message: "field to post request data",
    // });
  }
});

// route not found handle
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route Not found",
  });
});

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error) {
    res.status(400).json({
      success: false,
      message: "field to post request data",
    });
  }
});

export default app;
