**generate models**
npx sequelize-cli model:generate --name space --attributes title:string,description:text,backgroundColor:string,color:string,userId:integer

npx sequelize-cli model:generate --name story --attributes name:string,content:text,imageUrl:string,spaceId:integer

**generate seeds**
npx sequelize-cli seed:generate --name some-spaces
npx sequelize-cli seed:generate --name some-stories
