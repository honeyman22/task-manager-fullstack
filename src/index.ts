import express from "express";
import prisma from "./prisma";
import UserRoutes from "./routes/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(UserRoutes);

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
