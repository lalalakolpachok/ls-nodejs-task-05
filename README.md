## Homework №5: Node.js - Corporate System _"LoftSystem"_ course.

Deployed:  
https://ls-nodejs-task-05.herokuapp.com/
Admin: login 'admin', password 'admin'

### Start

Install sequelize-cli and nodemon
```
yarn global add sequelize-cli
yarn global add nodemon
```

Copy & install dependencies
```
git clone https://github.com/lalalakolpachok/ls-nodejs-task-05.git
cd ls-nodejs-task-05
yarn
```

PostgreSQL: create tables in DB named 'test' with password ''
```
sequelize db:migrate
```

Create user 'admin' with password 'admin'
```
sequelize db:seed:all
```

Start
```
yarn
```
