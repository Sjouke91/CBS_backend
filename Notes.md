**generate models**
npx sequelize-cli model:generate --name space --attributes title:string,description:text,backgroundColor:string,color:string,userId:integer

npx sequelize-cli model:generate --name story --attributes name:string,content:text,imageUrl:string,spaceId:integer

**generate seeds**
npx sequelize-cli seed:generate --name some-spaces
npx sequelize-cli seed:generate --name some-stories

**Token for test**

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwNDkyNjQ5OSwiZXhwIjoxNjA0OTMzNjk5fQ.c780x6tJZpBpUw21szXAroTtQP_o56EE67uevy54wcs
