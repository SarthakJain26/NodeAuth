import express, { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { __PROD__ } from "./constants";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    database: "authentication",
    username: "postgres",
    password: "123",
    synchronize: !__PROD__,
    entities: [],
  });
  const App = express();

  App.get("/", (_: Request, res: Response) => {
    res.send("Hello World");
  });

  App.listen(5000, () => {
    console.log("listening at port 5000");
  });
};

main().catch((err) => {
  console.error(err);
});
