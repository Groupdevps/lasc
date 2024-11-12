const request = require('supertest');
const { app, server } = require('../app'); // Ajusta el camino según la estructura de tu proyecto
const { sequelize, Attention, TypeService } = require('../models'); // Ajusta el camino según la estructura de tu proyecto

describe('Hospitalization Controller', () => {
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
    await Attention.destroy({ where: {}, truncate: true });
    await TypeService.destroy({ where: {}, truncate: true });
  });

  // Pruebas para la creación de una nueva atención de hospitalización
  describe('Create Attention', () => {
    test('should create a new attention with the service type "hospitalization"', async () => {
      // Crea un tipo de servicio de prueba
      const typeService = await TypeService.create({ name: 'hospitalization' });

      const newAttention = {
        authorizationCode: 'AUTH12345',
        assignedDate: '2024-07-23',
        hour: '10:30:00',
        egressDate: '2024-07-24',
        patient: 1234567890,
        companion: 9876543210,
        Active: true,
        HistoryPersonId: 1,
        PersonId: 1,
        CenterId: 1,
        StatusId: 1,
        UserId: 1,
        DoctorId: 1,
        TriageId: 1,
        currentAttentionId: null // Supongamos que no hay atención actual
      };

      const response = await request(app)
        .post('/api/v1/hospitalization') // Ruta ajustada
        .send(newAttention);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('authorizationCode', 'AUTH12345');
      expect(response.body).toHaveProperty('TypeServiceId', typeService.id);
      expect(response.body).toHaveProperty('ReEntry', null);
    });

    test('should return an error if the service type "hospitalization" does not exist', async () => {
      const newAttention = {
        authorizationCode: 'AUTH12345',
        assignedDate: '2024-07-23',
        hour: '10:30:00',
        egressDate: '2024-07-24',
        patient: 1234567890,
        companion: 9876543210,
        Active: true,
        HistoryPersonId: 1,
        PersonId: 1,
        CenterId: 1,
        StatusId: 1,
        UserId: 1,
        DoctorId: 1,
        TriageId: 1,
        currentAttentionId: null // Supongamos que no hay atención actual
      };

      const response = await request(app)
        .post('/api/v1/hospitalization') // Ruta ajustada
        .send(newAttention);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'TypeService "hospitalization" not found');
    });
  });
});
