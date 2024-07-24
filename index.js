const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1839197",
  key: "059cadb91ce869a467cf",
  secret: "eb4b411c43233ae9d6f4",
  cluster: "eu",
  useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
    await pusher.trigger("my-channel", "my-event", {
        username: req.body.username,
        message: req.body.message
      });

      res.json([]);
})

console.log('listening to port 8000');
app.listen(8000);