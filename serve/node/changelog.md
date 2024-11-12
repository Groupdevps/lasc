# Changelog

## [Unreleased]

### Added
- **Médico**: 
  - Ruta del botón de alta médica.
- **Facturación**: 
  - Agregadas características para la relación de manuales tarifarios.
  - Manual tarifario ISS incorporado.
  - Funcionalidad para crear códigos de atención.
  - Visualización de relaciones del manual tarifario (concepto).
  - Búsqueda de manuales tarifarios (concepto).
  - Visualización de lista de convenios por EPS.
  - Desactivación automática de convenios.
  - **Generación de facturas**: 
    - Posibilidad de crear facturas manualmente, incluyendo detalles específicos.
    - Opción para generar un PDF de la factura.

- **Gerencia**: 
  - Nuevos campos: resolución, número de factura inicial, y número de factura final.

### Fixed
- **Farmacia**: 
  - Al agregar al inventario, el total no se mostraba en el PDF.
- **Enfermería**: 
  - Productos de solicitud de suministros no se mostraban en el PDF.
  - Se agregó ISC en triage.
- **General**: 
  - Consultas con usuarios mostrando contraseñas. Se validó que la información de usuario se limite a mostrar solo lo necesario.
- **Médico**: 
  - No se permitía crear recomendaciones.
- **Histórico**: 
  - Rutas de historia clínica de un paciente ordenadas por atención.
- **Admisiones**: 
  - Búsqueda de municipios por código de departamento.
  - Búsqueda de barrios por código de municipio.
  - Error al guardar persona, incluyendo dirección.
  - No se permitía generar atención.
- **Facturación**: 
  - Lista lenta en convenio en la facturación.
  - No se mostraban los datos de la factura una vez creada.

### Changed
- **Facturación**: 
  - Actualización de convenio, incluyendo: código de convenio, nombre, EPS, tipo de manual, tipo de convenio, porcentaje, fecha de inicio, fecha final, estado activo y userId.
- **Médico**: 
  - Agregados usuarios y cargos en PDF de órdenes.

## [1.0.0] - 2024-09-09

### Added
- **Admisiones**:
  - Creación de pacientes.
  - Generación de servicio de urgencia.
  - Dashboard de atenciones en tiempo real.
  - Formulario CAU.
- **Enfermería**:
  - Creación de triage.
  - Solicitud de suministros.
  - Notas de enfermería.
- **Médico General**:
  - Creación de historia clínica.
  - Creación de órdenes de fórmulas médicas, laboratorio, interconsulta y ayuda diagnóstica.
  - Creación de notas médicas.
- **Farmacia**:
  - Creación de despacho.
  - Gestión de inventarios.
  - Manejo de productos.

### Fixed
- Corrección de errores menores en la versión inicial.
