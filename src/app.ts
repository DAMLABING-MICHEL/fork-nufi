import express from 'express';
import cookieSession from 'cookie-session';
import 'dotenv/config';
import path from 'path';
import indexRoute from './middleware';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  secret: process.env.NF_COOKIE_SECRET,
  // Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true
}))

app.use(indexRoute);

// Start the express server on the relevant port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});