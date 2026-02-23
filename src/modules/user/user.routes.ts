import express, { Request, Response } from "express"
import { pool } from "../../config/db";
const router=express.Router();


router.post("/", );



router.get("/", async (req: Request, res: Response) => {
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
})


export const userRoutes=router;