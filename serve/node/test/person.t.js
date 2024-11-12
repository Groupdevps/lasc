const request = require('supertest');
const { app, server } = require('../app'); // Ajusta el camino según la estructura de tu proyecto
const { sequelize, Person } = require('../models'); // Ajusta el camino según la estructura de tu proyecto

describe('Person Controller', () => {
  beforeAll(async () => {
    // Sincroniza la base de datos antes de todas las pruebas
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Cierra la conexión de la base de datos y el servidor después de todas las pruebas
    await sequelize.close();
    server.close();
  });

  afterEach(async () => {
    // Limpia los registros creados durante las pruebas
    await Person.destroy({ where: {}, truncate: true });
  });

  // Pruebas para el controlador create
  describe('Create Person', () => {
    test('should create a person', async () => {
      const response = await request(app)
        .post('/create-person')
        .send({
          "age": "9 Años",
          "numberId": 22345678,
          "name": "TEST",
          "lastName": "SERVICE",
          "secondSurname": "PROVIDES",
          "TypeIDId": 2,
          "GenderId": 1,
          "birthDate": "2014-02-05",
          "MaritalStatusId": 2,
          "cellphone": 2234567890,
          "Address": {},
          "Relationships": [],
          "ServiceProvider": {
            "assignedAdministratorId": 4,
            "nit": "ALIANSALUD EPS",
            "assignedAdministrator": "ALIANSALUD EPS",
            "regime": 2,
            "socioeconomiclevel": 3
          }
        });

      expect(response.statusCode).toBe(201); // Suponiendo que el estado correcto sea 201
      expect(response.body).toHaveProperty('id');

      // Puedes realizar más expectativas según tu lógica de negocio
    });
  });

  // Pruebas para el método findItem
  describe('Find Person', () => {
    test('should find a person by numberId', async () => {
      // Supongamos que tienes un registro en la base de datos para probar
      const testPerson = await Person.create({
        age: "9 Años",
        numberId: 22345678,
        name: "TEST",
        lastName: "SERVICE",
        secondSurname: "PROVIDES",
        TypeIDId: 2,
        GenderId: 1,
        birthDate: "2014-02-05",
        MaritalStatusId: 2,
        cellphone: 2234567890
      });

      const response = await request(app).get(`/find-person/${testPerson.numberId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
      // Puedes realizar más expectativas según tu lógica de negocio
    });

    test('should handle not finding a person', async () => {
      const response = await request(app).get('/find-person/12345678');

      expect(response.statusCode).toBe(404); // Suponiendo que el estado correcto sea 404 para no encontrado
      expect(response.body).toHaveProperty('error', 'Person not found'); // Asegúrate de que este sea el mensaje de error correcto
      // Puedes realizar más expectativas según tu lógica de negocio
    });
  });
});
