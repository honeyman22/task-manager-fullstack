import express from "express";
import prisma from "./prisma";
import UserRoutes from "./routes/user.router";
import TaskRoutes from "./routes/task.router";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(UserRoutes, TaskRoutes);

app.use(errorMiddleware);

prisma
  .$connect()
  .then(() => {
    app.listen(3005, () => {
      console.log(`listening to port : http://localhost:3005`);
    });
  })
  .catch((err: any) => {
    console.log("Error while connecting to the database : ", err);
  });
