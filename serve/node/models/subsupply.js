'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubSupply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one to many EvolutionNote
      SubSupply.belongsTo(models.Apply);

      //one to many User
      models.User.hasMany(SubSupply);
      SubSupply.belongsTo(models.User);

      models.Concept.hasMany(SubSupply);
      SubSupply.belongsTo(models.Concept)

      models.Product.hasMany(SubSupply);
      SubSupply.belongsTo(models.Product)

    }
  }
  SubSupply.init({ //suministro en si mismo
    
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME,
    input: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    //datos que se estan usando actualmente
    typeSupply: DataTypes.STRING,
    ConceptId: DataTypes.INTEGER, //servicio que se brindo
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Si no deseas que sea obligatorio desde el inicio, luego puedes cambiar esto
      references: {
        model: 'Products', // Nombre de la tabla Products (asegúrate que esté en plural si tu tabla está en plural)
        key: 'id' // Llave primaria de la tabla Products
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // Ajusta según tu preferencia
    }, //producto que se brindo

    cant: DataTypes.INTEGER, //cantidad
    ApplyId: DataTypes.INTEGER, //id de la aplicacion donde se uso ese producto o servicio
    //campos nuevos agregados 23/10/2024
    orderNumber: DataTypes.STRING,
    measuringUnit : DataTypes.STRING,
    administration: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'SubSupply',
  });
  return SubSupply;
};