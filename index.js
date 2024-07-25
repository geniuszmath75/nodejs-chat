if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.API_KEY,
  secret: process.env.SECRET_KEY,
  cluster: "eu",
  useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
    await pusher.trigger(process.env.CHANNEL, process.env.EVENT, {
        username: req.body.username,
        message: req.body.message
      });

      res.json([]);
})

console.log('listening to port 8080');
app.listen(8000);