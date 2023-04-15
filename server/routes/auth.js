import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config';



const router = express.Router();

// Custom middleware to set the headers
const setHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Private-Key', process.env.PRIVATE_KEY);
  next();
};

router.use(setHeaders); // Apply the middleware to the router

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
