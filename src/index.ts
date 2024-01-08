import express from "express";
import prisma from "./prisma";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
