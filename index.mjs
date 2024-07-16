import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/hello", (req, res) => {
  const { message } = req.body;

  if (!message) {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    return res.end();
  }

  axios
    .post(`https://api.telegram.org/bot${process.env.TELEGRAM_API}/hello`, {
      chat_id: message.chat.id,
      text: "Polo!!",
    })
    .then((res) => {
      // We get here if the message was successfully posted
      console.log("Message posted");
      res.end("ok");
    })
    .catch((err) => {
      // ...and here if it was not
      console.log("Error :", err);
      res.end("Error :" + err);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("listening to port: " + PORT);
});
