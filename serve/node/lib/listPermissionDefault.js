const TypeResources =[
	{
		name: "ADMISIONES",
		isActive : true,
		keyForm : "Admissions",
		Resources:	[
			{			
				name : "ADMISION",
				isActive : true,
				keyForm : "Admissions",
			},
			{			
				name : "INGRESO PACIENTE",
				isActive : true,
				keyForm : "PatientAdmissionComponent",
			},
			{			
				name : "AGENDA DE ADMISIONES",
				isActive : true,
				keyForm : "AgendaAdmissionsComponent",
			},
			{			
				name : "CAU",
				isActive : true,
				keyForm : "AuthorizationView",
			},
			{			
				name : "ANEXOS",
				isActive : true,
				keyForm : "AnexosComponent",
			},
			{			
				name : "TESORERIA",
				isActive : true,
				keyForm : "",
			},
		],
		
	},
	{
		name: "ENFERMERIA",
		isActive : true,		
		keyForm : "Nursing",
		Resources:	[
			{			
				name : "ENFERMERIA",
				isActive : true,
				keyForm : "Nursing",
			},
			{			
				name : "VISTA DE ENFERMERIA",
				isActive : true,
				keyForm : "DashboardNursing",

			},
			{			
				name : "AGENDA DE ENFERMERIA",
				isActive : true,
				keyForm : "AgendaNursingComponent",

			},
			{			
				name : "CLASIFICACION DE TRIAGE",
				isActive : true,
				keyForm : "TriageClassification",
			},
			{			
				name : "NOTAS DE ENFERMERIA",
				isActive : true,
				keyForm : "NursingNotesComponent",
			},
			{			
				name : "SOLICITUD DE SUMINISTROS",
				isActive : true,
				keyForm : "RequestSuppliesComponent",
			},
			{			
				name : "APLICACION DE SUMINISTROS",
				isActive : true,
				keyForm : "supplies",
			},
			
		],
		
	},
	{
		name: "MEDICO",
		isActive : true,
		keyForm : "Medico",
		Resources:	[
			{			
				name : "MEDICO",
				isActive : true,
				keyForm : "Medico",
			},
			{			
				name : "AGENDA",
				isActive : true,
				keyForm : "AgendaMedicaComponent",
			},
			{			
				name : "VISTA MEDICA",
				isActive : true,
				keyForm : "DashboardMedico",
			},
			{			
				name : "HISTORIA CLINICA DE EMERGENCIA",
				isActive : true,
				keyForm : "EmergencyMedicalHistory",
			},
			{			
				name : "ORDENES DE LABORATORIO",
				isActive : true,
				keyForm : "LaboratoryOrder",
			},
			{			
				name : "AYUDAS DIAGNOSTICAS",
				isActive : true,
				keyForm : "DiagnosticHelp",
			},
			{			
				name : "FORMULAS MEDICAS",
				isActive : true,
				keyForm : "MedicalFormulas",
			},
			{			
				name : "INTERCONSULTA",
				isActive : true,
				keyForm : "OutpatientOrders",
			},
			{			
				name : "PRCEDIMIENTOS NO QUIRURGICOS",
				isActive : true,
				keyForm : "NonSurgicalProcedures",
			},
			{			
				name : "ORDENES DE CIRUGIA",
				isActive : true,
				keyForm : "OrderSurgery",
			},
			{			
				name : "NOTAS MEDICAS",
				isActive : true,
				keyForm : "MedicalNotes",
			},
			{			
				name : "RECOMENDACIONES",
				isActive : true,
				keyForm : "Recommendations",
			},
			{			
				name : "EPICRISIS",
				isActive : true,
				keyForm : "Epicrisis",
			},
			{			
				name : "INCAPACIDAD",
				isActive : true,
				keyForm : "Inability",
			},
			{			
				name : "HOSPITALIZAR",
				isActive : true,
				keyForm : "HospitalizationFunction",
			},
			{			
				name : "REMISION",
				isActive : true,
				keyForm : "RemissionFunction",
			},
		],
		
	},
	{
		name: "FARMACIA",
		isActive : true,
		keyForm : "Pharmacy",
		Resources:	[
			{			
				name : "FARMACIA",
				isActive : true,
				keyForm : "Pharmacy",
			},
			{			
				name : "AGENDA DE FARMACIA",
				isActive : true,
				keyForm : "AgendaPharmacyComponent",
			},
			{			
				name : "INVENTARIO",
				isActive : true,
				keyForm : "InventoryComponent",
			},
			{			
				name : "PRODUCTOS",
				isActive : true,
				keyForm : "ProdutcsComponent",
			},
			{			
				name : "DESPACHO",
				isActive : true,
				keyForm : "DispatchComponent",
			},
		],
		
	},
	{
		name: "LABORATORIO",
		isActive : true,
		keyForm : "Laboratory",
		Resources:	[
			{			
				name : "LABORATORIO",
				isActive : true,
				keyForm : "Laboratory",
			},
			{			
				name : "AGENDA DE LABORATORIO",
				isActive : true,
				keyForm : "AgendaLaboratoryComponent",
			},
			{			
				name : "RESULTADOS DE LABORATORIO",
				isActive : true,
				keyForm : "Laboratory",
			},
			{			
				name : "FORMATOS DE LABORATORIO",
				isActive : true,
				keyForm : "LaboratoryFormatsComponent",
			},
			{			
				name : "REGISTRO DE FORMATOS DE ANALISIS",
				isActive : true,
				keyForm : "LaboratoryFormats",
			},

		],
		
	},
	{
		name: "AYUDA DIAGNOSTICA",
		isActive : true,
		keyForm : "DiagnosticAid",
		Resources:	[
			{			
				name : "AYUDA DIAGNOSTICA",
				isActive : true,
				keyForm : "DiagnosticAid",
			},
			{			
				name : "AGENDA DE AYUDAS DIAGNOSTICAS",
				isActive : true,
				keyForm : "AgendaDiagnosticAidComponent",
			},
			{			
				name : "RESULTADOS DE AYUDAS DE DIAGNOSTICAS",
				isActive : true,
				keyForm : "DashboardDiagnosticAid",
			},
		],
		
	},
	{
		name: "HOSPITALIZACION",
		isActive : true,
		keyForm : "Hospitalization",
		Resources:	[
			{			
				name : "HOSPITALIZACION",
				isActive : true,
				keyForm : "Hospitalization",
			},			
			{			
				name : "AGENDA HOSPITALIZACION",
				isActive : true,
				keyForm : "AgendaHospitalizacionComponent",
			},
			{			
				name : "VISTA HOSPITALIZACION",
				isActive : true,
				keyForm : "DashboardHospitalization",
			},
			{			
				name : "HISTORIA CLINICA DE EMERGENCIA",
				isActive : true,
				keyForm : "EmergencyMedicalHistoryHospitalization",
			},
			{			
				name : "ORDENES DE LABORATORIO",
				isActive : true,
				keyForm : "LaboratoryOrderHospitalization",				
			},
			{			
				name : "AYUDAS DIAGNOSTICAS",
				isActive : true,
				keyForm : "DiagnosticHelpHospitalization",				
			},
			{			
				name : "FORMULAS MEDICAS",
				isActive : true,
				keyForm : "MedicalFormulasHospitalization",				
			},
			{			
				name : "INTERCONSULTA",
				isActive : true,
				keyForm : "OutpatientOrdersHospitalization",				
			},
			{			
				name : "PRCEDIMIENTOS NO QUIRURGICOS",
				isActive : true,
				keyForm : "NonSurgicalProceduresHospitalization",				
			},
			{			
				name : "ORDENES DE CIRUGIA",
				isActive : true,
				keyForm : "OrderSurgeryHospitalization",				
			},
			{			
				name : "NOTAS MEDICAS",
				isActive : true,
				keyForm : "MedicalNotesHospitalization",				
			},
			{			
				name : "RECOMENDACIONES",
				isActive : true,
				keyForm : "RecommendationsHospitalization",				
			},
			{			
				name : "EPICRISIS",
				isActive : true,
				keyForm : "EpicrisisHospitalization",				
			},
			{			
				name : "INCAPACIDAD",
				isActive : true,
				keyForm : "InabilityHospitalization",				
			},			
			{			
				name : "FORMULARIO DE ESTANCIA",
				isActive : true,
				keyForm : "StayFormHospitalization",				
			},
			{			
				name : "EGRESO",
				isActive : true,
				keyForm : "DischargeHospitalization",				
			},
			{			
				name : "REMISION",
				isActive : true,
				keyForm : "RemissionFunction",				
			},
		],
		
	},
	{
		name: "CIRUGIA",
		isActive : true,
		keyForm : "Surgery",				
		Resources:	[
			{			
				name : "CIRUGIA",
				isActive : true,
				keyForm : "Surgery",
			},
			{			
				name : "AGENDA DE CIRUGIA",
				isActive : true,
				keyForm : "AgendaSurgeryComponent",				
			},
			{			
				name : "VISTA DE CIRUGIA",
				isActive : true,
				keyForm : "DashboardSurgery",				
			},
			{			
				name : "HISTORIA CLINICA DE EMERGENCIA",
				isActive : true,
				keyForm : "EmergencyMedicalHistorySurgery",				
			},
			{			
				name : "ORDENES DE LABORATORIO",
				isActive : true,
				keyForm : "LaboratoryOrderSurgery",				
			},
			{			
				name : "AYUDAS DIAGNOSTICAS",
				isActive : true,
				keyForm : "DiagnosticHelpSurgery",				
			},
			{			
				name : "FORMULAS MEDICAS",
				isActive : true,
				keyForm : "MedicalFormulasSurgery",				
			},
			{			
				name : "INTERCONSULTA",
				isActive : true,
				keyForm : "OutpatientOrdersSurgery",				
			},
			{			
				name : "PRCEDIMIENTOS NO QUIRURGICOS",
				isActive : true,
				keyForm : "NonSurgicalProceduresSurgery",				
			},
			
			{			
				name : "NOTAS MEDICAS",
				isActive : true,
				keyForm : "MedicalNotesSurgery",				
			},
			{			
				name : "RECOMENDACIONES",
				isActive : true,
				keyForm : "RecommendationsSurgery",				
			},
			{			
				name : "EPICRISIS",
				isActive : true,
				keyForm : "EpicrisisSurgery",				
			},
			{			
				name : "INCAPACIDAD",
				isActive : true,
				keyForm : "InabilitySurgery",				
			},						
			{			
				name : "PROGRAMACION DE CIRUGIA",
				isActive : true,
				keyForm : "SurgeryProgramming",				
			},
			{			
				name : "DESCRIPCION DE CIRUGIA",
				isActive : true,
				keyForm : "SurgeryDescription",				
			},
			{			
				name : "RECUPERACION",
				isActive : true,
				keyForm : "RecoverySurgery",				
			},
			{			
				name : "MATERIALES OSTEOSINTESIS",
				isActive : true,
				keyForm : "OsteosynthesisMaterialsSurgery",				
			},
		],
		
	},
	{
		name: "GERENCIA",
		isActive : true,		
		keyForm : "Management",				
		Resources:	[
			{			
				name : "GERENCIA",
				isActive : true,
				keyForm : "Management",
			},
			{			
				name : "PERFILES",
				isActive : true,
				keyForm : "RolesComponent",				
			},
			{			
				name : "USUARIOS",
				isActive : true,
				keyForm : "UsersComponent",				
			},
			{			
				name : "ADMINISTRADORAS VIGENTES",
				isActive : true,
				keyForm : "CurrentAdministratorsComponent",				
			},
			{			
				name : "CENTRO",
				isActive : true,
				keyForm : "CentersComponent",				
			},
			{			
				name : "CONVENIOS",
				isActive : true,
				keyForm : "AgreementsComponent",				
			},
			{			
				name : "LISTADOS",
				isActive : true,
				keyForm : "ListsComponent",				
			},
		],
		
	},
	{
		name: "FACTURACION",
		isActive : true,
		keyForm : "Billing",				
		Resources:	[
			{			
				name : "FACTURACION",
				isActive : true,
				keyForm : "Billing",
			},
			{			
				name : "AGENDA DE FACTURACION",
				isActive : true,
				keyForm : "AgendaBillingComponent",				
			},
			{			
				name : "FACTURACION",
				isActive : true,
				keyForm : "Invoice",				
			},

		],
		
	},
	{
		name: "AUDITORIA",
		isActive : true,
		keyForm : "Audits",				
		Resources:	[
			{			
				name : "AUDITORIA",
				isActive : true,
				keyForm : "Audits",
			},
			{			
				name : "AGENDA DE AUDITORIA",
				isActive : true,
				keyForm : "AgendaAuditsComponent",				
			},
			{			
				name : "AUDITORIA",
				isActive : true,
				keyForm : "AuditsView",				
			},
		],
		
	}










]
module.exports = { TypeResources };
