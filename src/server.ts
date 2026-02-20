import express, { Request, Response } from "express";
import config from "./config";
import initBD, { pool } from "./config/db";
import logger from "./middleware/logger";
const app = express();

const port=config.port;

app.use(express.json());

initBD();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World mosarafffffmmmm!");
});

// users crud
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,
      [name, email],
    );
    console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "data inserted successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "data fetching successfully!",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "result not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user found successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      `UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "result not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user found successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "result not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user found successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});