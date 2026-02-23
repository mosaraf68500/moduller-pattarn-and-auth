import { Request, Response } from "express";
import { pool } from "../../config/db";

const createUsers= async (req: Request, res: Response) => {
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
}