const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// Отобращаем реквесты в консили
app.use(logger('dev'));

// Парсим входящие данные
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());

// Обеспечиваем доступ к хранимым в браузере cookies
app.use(cookieParser());

// Настройки сессии
app.use(session({
  store: new FileStore(),
  secret: 'secret of loftschool',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null,
    expires: 600000
  },
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public'))); // статические файлы
app.use('/api', require('./routes/api_router')); // api запросы
app.use('*', require('./routes/basic_router')); // любой get-запрос вернет index.html

// Подключаем чат
const initializeChat = require('./config/initializeChat');
initializeChat(io);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    if (!fs.existsSync('./public/upload')) {
      fs.mkdirSync('./public/upload');
    }
    console.log(`Server start ${PORT}`);
  });
} else {
  module.exports = app;
}
