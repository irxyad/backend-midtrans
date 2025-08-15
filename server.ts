import express, { Request, Response } from "express";
import midtransClient from "midtrans-client";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SERVER_KEY = process.env.SERVER_KEY;

if (!SERVER_KEY) {
  console.error("SERVER_KEY is required");
  process.exit(1);
}

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: SERVER_KEY,
});

app.post(
  "/get-snap-token",
  async (req: Request<{}, {}, SnapRequest>, res: Response) => {
    try {
      const { orderId, grossAmount, firstName, email, phone } = req.body;

      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        customer_details: {
          first_name: firstName,
          email: email,
          phone: phone,
        },
      };

      console.log("Transaction parameter:", parameter);

      const transaction = await snap.createTransaction(parameter);

      res.json({ token: transaction.token });
    } catch (error) {
      console.error("Error creating Snap Token:", error);

      const e = error as MidtransError;

      res.status(e.httpStatusCode ?? 500).json({
        message: "Failed to create Snap Token",
        detail:
          e.ApiResponse?.error_messages?.join(", ") ||
          e.message ||
          "Unknown error",
      });
    }
  }
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
