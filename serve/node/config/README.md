//creating database
npx sequelize-cli db:create

sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

npx sequelize-cli model:generate --name modelName --attributes attributeName:dataType,attributeName:dataType
npx sequelize-cli db:migrate