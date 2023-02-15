require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')


// a route to fetch about us content and image
app.get('/about', async (req, res) => {
  try {
    res.json({
      textContent: `
      <p>
      Hi there!
      </p>
      <br />
      <p>
        I was born in Montreal and came to New York when I was 20 after taking a gap year.
        I'm a senior. I stand to graduate in September, almost a year early. 
        I am starting work at Amazon in October as a SDE.
      </p>
      <br />
      <p>
        In my free time, I like writing. 
        Usually poetry or creative writing, but really whatever I am thinking about. 
        I recently started learning the guitar, but I am not very good. I also like to run. 
        I ran the NYC Marathon last November, and I did not train properly.
      </p>
      <br />
      <p>
        I am curious about a lot. 
        I am generally ambitious about doing something impactful with my life. 
        But I am also a strong believer in mindfulness and a Stoic attitude towards every day life. 
        I try not to stress too much about anything or put off being happy. 
        I'm paraphrasing Marcus Aurelius' "Meditations" here: don't wait (until tomorrow) to do the right thing. 
        If you are waiting for the right time (to do something), the time will never come. 
      </p>
    `,
      imgUrl: "/static/media/me.035285d79cceb18810cf.png"
    });
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve about us content',
    })
  }
});

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
