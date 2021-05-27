import express, { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { __PORT__, __PROD__ } from "./constants";
import { Student } from "./models/Student";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "authentication",
    username: "postgres",
    password: "123",
    synchronize: !__PROD__,
    entities: [Student],
  });
  const App = express();

  App.use(express.json());

  App.get("/", (_: Request, res: Response) => {
    res.send("Hello World");
  });

  // Finding one student
  App.get("/student/:roll", async (req: Request, res: Response) => {
    const student: Student | undefined = await Student.findOne({
      roll: parseInt(req.params.roll),
    });
    res.status(200).json(student);
  });

  // Fetching all students
  App.get("/students", async (_: Request, res: Response) => {
    const students: Student[] = await Student.find();
    res.status(200).json({ message: "Successful", students: students });
  });

  // Registering students
  App.post("/register", async (req: Request, res: Response) => {
    const student: Student | undefined = await Student.findOne(req.body.roll);
    if (!student) {
      const response = await Student.save({
        ...req.body,
      });
      res.status(200).json(response);
    } else {
      res.status(300).json({ error: "user already exists" });
    }
  });

  App.listen(__PORT__, () => {
    console.log(`listening at port ${__PORT__}`);
  });
};

main().catch((err) => {
  console.error(err);
});
