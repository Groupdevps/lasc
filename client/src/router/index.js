import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { modules }   from '../components/parameters/modules.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing', //'home',
    component: () => import("../views/landing.vue"), //Login //HomeView,
    meta : { requireAuth : false },
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  /*{ 
    path: '/admisiones', 
    name: 'admissions', 
    component: () => import('../views/dashboards.vue')

  },*/
  { 
    path: '/login',// atencion_enfermeria 
    name: 'login',// atencion_enfermeria 
    component: () => import('../views/login.vue'),
    meta : { requireAuth : false },
  },
  { 
    path: '/register',// atencion_enfermeria 
    name: 'register',// atencion_enfermeria 
    component: () => import('../views/register.vue'),
    meta : { requireAuth : false },
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/profile.vue'),
    meta : { requireAuth : true },
  },
  { 
    path: '/dashboard',// 
    name: 'dashboard',  
    component: () => import('../views/DashboardMenu.vue'),
    meta : { requireAuth : true },
  },
  {
    path: "/admissions/:option",
    name :"Admissions",
    component : ()=>import('../views/DashboardAdmissionsView.vue'),
    meta : { requireAuth : true },
  },
  {
    path: "/nursing/:option",
    name :"Nursing",
    component : ()=>import('../views/DashboardNursingView.vue'),//dashboards.vue
    meta : { requireAuth : true },
  },
   // { 
  //   path: '/nursing/:id',// atencion_enfermeria 
  //   name: 'nursing',// atencion_enfermeria 
  //   component: () => import('../views/nursing.vue'),
  //   meta : { requireAuth : true },
  // },
  { 
    path: '/dashboard-nursing/:option/:id/:numberId', 
    name: 'DashboardNursing', 
    component: () => import('../views/NursingView.vue'),//dashboards_sub
    meta : { requireAuth : true },
    children:[
      {

        path: "notes-nursing",
        name : "NursingNotes",
        component: ()=> import('../components/nursing/NursingNotesComponent.vue'),
        meta : { requireAuth: true},
      },
      {

        path: "request-supplies",
        name : "RequestSupplies",
        component: ()=> import('../components/nursing/RequestSuppliesComponent.vue'),
        meta : { requireAuth: true},
      },
      {

        path: "application-supplies",
        name : "ApplicationSupplies",
        component: ()=> import('../components/nursing/supplies.vue'),
        meta : { requireAuth: true},
      },
      {

        path: "expense-sheet-nursing",
        name : "ExpenseSheetNursing",
        component: ()=> import('../components/nursing/ExpenseSheetComponent.vue'),
        meta : { requireAuth: true},
      },
      
    ]
  },
  {
    path: "/medico/:option",
    name :"Medico",
    component : ()=>import('../views/DashboardMedicoView.vue'),
    meta : { requireAuth : true },
  },
  { 
    path: '/dashboard-medico/:option/:id/:numberId/:routeBack',// 
    name: 'DashboardMedico', 
    component: () => import('../views/MedicoView.vue'),// dashboards_sub
    meta : {
      requireAuth : true,
    },
    children:[
      {
        path : "emergency-medical-history",
        name : "EmergencyMedicalHistory",
        component: ()=> import("../components/medico/emergency_medical_history.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "services",
        name : "Services",
        component: ()=> import("../components/info/ServicesComponent.vue"),
        meta : { requireAuth : true },
      },      
      {
        path : "medical-formulas",
        name : "MedicalFormulas",
        component: ()=> import("../components/medico/MedicalFormulasComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "laboratory-order",
        name : "LaboratoryOrder",
        component: ()=> import("../components/medico/LaboratoryOrderComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "outpatient-orders",
        name : "OutpatientOrders",
        component: ()=> import("../components/medico/OutpatientOrdersComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "diagnostic-help",
        name : "DiagnosticHelp",
        component: ()=> import("../components/medico/DiagnosticHelpComponent.vue"),
        meta : { requireAuth : true },
      },      
      {        
        path : "medical-notes",
        name : "MedicalNotes",
        component: ()=> import("../components/medico/MedicalNotesComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "medical-evolution",
        name : "MedicalEvolution",
        component: ()=> import("../components/medico/EvolutionNotesComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "recommendations",
        name : "Recommendations",
        component: ()=> import("../components/medico/RecommendationsComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "epicrisis",
        name : "Epicrisis",
        component: ()=> import("../components/medico/EpicrisisComponent.vue"),
        meta : { requireAuth : true },
      },
      // {        
      //   path : "Discharge",
      //   name : "Discharge",
      //   component: ()=> import("../components/medico/DischargeComponent.vue"),
      //   meta : { requireAuth : true },
      // },
      {        
        path : "remission",
        name : "Remission",
        component: ()=> import("../components/medico/RemissionComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "inability",
        name : "Inability",
        component: ()=> import("../components/medico/InabilityComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "non-surgical-procedures",
        name : "NonSurgicalProcedures",
        component: ()=> import("../components/medico/NonSurgicalProceduresComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "order-surgery",
        name : "OrderSurgery", // medico
        component: ()=> import("../components/surgery/OrderSurgeryComponent.vue"),
        meta : { requireAuth : true },
      },
    ]
  },
  {
    path: "/pharmacy/:option",
    name :"Pharmacy",
    component : ()=>import('../views/DashboardPharmacyView.vue'), // dashboards.vue
    meta : { requireAuth : true },
  },
  // laboratory
  {
    path: "/laboratory/:option",
    name :"Laboratory",
    component : ()=>import('../views/DashboardLaboratoryView.vue'),
    meta : { requireAuth : true },
  },
  {
    path: '/dashboard-laboratory/:option/:id/:attention',// 
    name: 'DashboardLaboratory', 
    component: () => import('../views/LaboratoryView.vue'),
    meta : { requireAuth : true },
  },
  
  {
    path: '/dashboard-settings-analisis/:option/:id',// 
    name: 'DashboardSettingsAnalisis', 
    component: () => import('../views/TypesAnalisisView.vue'),
    meta : { requireAuth : true },
  },
  // diagnostic aid
  {
    path: "/diagnostic-aid/:option",
    name :"DiagnosticAid",//DiagnosticAid
    component : ()=>import('../views/DashboardDiagnosticAidView.vue'),
    meta : { requireAuth : true },
  },
  {
    path: '/dashboard-diagnostic-aid/:option/:id/:AttentionId',// 
    name: 'DashboardDiagnosticAid', 
    component: () => import('../views/DiagnosticAidView.vue'),
    meta : { requireAuth : true },
  },
  // {
  //   path: '/dashboard-settings-diagnostic-aid/:option/:id',// 
  //   name: 'DashboardSettingsDiagnosticAid', 
  //   component: () => import('../views/SettingDiagnosticAidView.vue'),
  //   meta : { requireAuth : true },
  // },
  {
    path: "/hospitalization/:option",
    name :"Hospitalization",
    component : ()=>import('../views/DashboardHospitalizationView.vue'),
    meta : { requireAuth : true },
  },
  {
    path: "/settings-beds-hospitalization",
    name :"SettingsBedsHospitalization",
    component : ()=>import('../views/SettingsBedsHospitalizationView.vue'),
    meta : { requireAuth : true },
  },
  {
    path: '/dashboard-hospitalization/:option/:id/:numberId',// 
    name: 'DashboardHospitalization', 
    component: () => import('../views/HospitalizationView.vue'),
    meta : { requireAuth : true },
    children :[
      {
        path : "medical-history",
        name : "EmergencyMedicalHistoryHospitalization",
        component: ()=> import("../components/medico/emergency_medical_history.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "services",
        name : "ServicesHospitalization",
        component: ()=> import("../components/info/ServicesComponent.vue"),
        meta : { requireAuth : true },
      },      
      {
        path : "medical-formulas",
        name : "MedicalFormulasHospitalization",
        component: ()=> import("../components/medico/MedicalFormulasComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "laboratory-order",
        name : "LaboratoryOrderHospitalization",
        component: ()=> import("../components/medico/LaboratoryOrderComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "outpatient-orders",
        name : "OutpatientOrdersHospitalization",
        component: ()=> import("../components/medico/OutpatientOrdersComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "diagnostic-help",
        name : "DiagnosticHelpHospitalization",
        component: ()=> import("../components/medico/DiagnosticHelpComponent.vue"),
        meta : { requireAuth : true },
      },      
      {        
        path : "recommendations",
        name : "RecommendationsHospitalization",
        component: ()=> import("../components/medico/RecommendationsComponent.vue"),
        meta : { requireAuth : true },
      },      
      {        
        path : "Discharge",
        name : "DischargeHospitalization",
        component: ()=> import("../components/medico/DischargeComponent.vue"),//
        meta : { requireAuth : true },
      },
     
      {        
        path : "inability",
        name : "InabilityHospitalization",
        component: ()=> import("../components/medico/InabilityComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "medical-notes",
        name : "MedicalNotesHospitalization",
        component: ()=> import("../components/hospitalization/MedicalNotesHospitalizationComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "stay-form",
        name : "StayFormHospitalization",
        component: ()=> import("../components/hospitalization/StayOrderComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "non-surgical-procedures",
        name : "NonSurgicalProceduresHospitalization",
        component: ()=> import("../components/medico/NonSurgicalProceduresComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "order-surgery",
        name : "OrderSurgeryHospitalization",
        component: ()=> import("../components/surgery/OrderSurgeryComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "epicrisis",
        name : "EpicrisisHospitalization",
        component: ()=> import("../components/medico/EpicrisisComponent.vue"),
        meta : { requireAuth : true },
      },
    ]
  },
  {
    path: "/surgery/:option",
    name :"Surgery",
    component : ()=>import('../views/DashboardSurgeryView.vue'),
    meta : { requireAuth : true },
  },
  {
     path: '/dashboard-surgery/:option/:id/:order',// 
    name: 'DashboardSurgery', 
    component: () => import('../views/SurgeryView.vue'),
    meta : { requireAuth : true },
    children :[
      {
        path : "medical-history",
        name : "EmergencyMedicalHistorySurgery",
        component: ()=> import("../components/medico/emergency_medical_history.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "services",
        name : "ServicesSurgery",
        component: ()=> import("../components/info/ServicesComponent.vue"),
        meta : { requireAuth : true },
      },      
      {
        path : "medical-formulas",
        name : "MedicalFormulasSurgery",
        component: ()=> import("../components/medico/MedicalFormulasComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "laboratory-order",
        name : "LaboratoryOrderSurgery",
        component: ()=> import("../components/medico/LaboratoryOrderComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "outpatient-orders",
        name : "OutpatientOrdersSurgery",
        component: ()=> import("../components/medico/OutpatientOrdersComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "diagnostic-help",
        name : "DiagnosticHelpSurgery",
        component: ()=> import("../components/medico/DiagnosticHelpComponent.vue"),
        meta : { requireAuth : true },
      },      
      {        
        path : "recommendations",
        name : "RecommendationsSurgery",
        component: ()=> import("../components/medico/RecommendationsComponent.vue"),
        meta : { requireAuth : true },
      },           
      {        
        path : "order-surgery",
        name : "OrderSurgerySurgery",
        component: ()=> import("../components/surgery/OrderSurgeryComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "inability",
        name : "InabilitySurgery",
        component: ()=> import("../components/medico/InabilityComponent.vue"),
        meta : { requireAuth : true },
      },
      
      {        
        path : "evolution-notes",
        name : "MedicalNotesSurgery",
        component: ()=> import("../components/surgery/EvolutionSurgeryComponent.vue"),
        meta : { requireAuth : true },
      },
      {
        path : "surgery-programming",
        name : "SurgeryProgramming",
        component: ()=> import("../components/surgery/SurgeryProgrammingComponent.vue"),
        meta : { requireAuth : true },

      },
      {        
        path : "surgery-description",
        name : "SurgeryDescription",
        component: ()=> import("../components/surgery/SurgeryDescriptionComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "recovery",
        name : "RecoverySurgery",
        component: ()=> import("../components/surgery/RecoverySurgeryComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "osteosynthesis-materials",
        name : "OsteosynthesisMaterialsSurgery",
        component: ()=> import("../components/surgery/OsteosynthesisMaterialsSurgeryComponent.vue"),
        meta : { requireAuth : true },
      }, 
      {        
        path : "non-surgical-procedures",
        name : "NonSurgicalProceduresSurgery",
        component: ()=> import("../components/medico/NonSurgicalProceduresComponent.vue"),
        meta : { requireAuth : true },
      },
      {        
        path : "epicrisis",
        name : "EpicrisisSurgery",
        component: ()=> import("../components/medico/EpicrisisComponent.vue"),
        meta : { requireAuth : true },
      },      
      {        
        path : "anesthetic-records",
        name : "AnestheticRecordsSurgery",
        component: ()=> import("../components/surgery/AnestheticRecordsSurgeryComponent.vue"),
        meta : { requireAuth : true },
      }, 
      {        
        path : "evolution-anesthesia",
        name : "EvolutionAnesthesia",
        component: ()=> import("../components/medico/MedicalNotesComponent.vue"),
        meta : { requireAuth : true },
      }, 
    ]
  },

  {
    path: "/management/:option",
    name :"Management",
    component : ()=>import('../views/DashboardManagementView.vue'), // dashboards
    meta : { requireAuth : true },
  },
  {
    path: "/billing/:option",
    name :"Billing",
    component : ()=>import('../views/DashboardBillingView.vue'),// dashboards
    meta : { requireAuth : true },
  },
  {
    path: "/audits/:option",
    name :"Audits",
    component : ()=>import('../views/DashboardAuditsView.vue'),//
    meta : { requireAuth : true },
  },
  {
    path: "/system/:option",
    name :"System",
    component : ()=>import('../views/dashboards.vue'),
    meta : { requireAuth : true },
  },
  
  { 
    path: '/authorization_service/:option/:attention/', 
    name: 'AuthorizationService', 
    component: () => import('../views/AuthorizationView.vue'),
    meta : { requireAuth : true },
  },
 
  { 
    path: '/triage-classification/:id/:numberId', 
    name: 'TriageClassification', 
    component: () => import('../views/triage_classification.vue'),
    meta : { requireAuth : true },
  },
  // {
  //   path: '/processes', 
  //   name: 'processes', 
  //   component: () => import('../components/parameters/processes.vue'),
  //   meta : { requireAuth : true },
  // },
  {
    path: '/invoice/:option/:id/:numberId', 
    name: 'Invoice', 
    component: () => import('../views/InvoiceView.vue'),//components/biller/invoice.vue,
    meta : { requireAuth : true },  
  },
  {
    path : "/expense-sheet-invoice/:attention/:option2",
    name : "ExpenseSheetInvoice",
    component: ()=> import("../views/ExpenseSheetView.vue"),
    meta : { requireAuth : true },
  },
  /*{
    path: '/invoice', 
    name: 'invoice', 
    component: () => import('../components/biller/invoice.vue'),
        meta : { requireAuth : true },
  },*/
  // {
  //   path: '/provider', 
  //   name: 'provider', 
  //   component: () => import('../components/providers/provider.vue'),
  //   meta : { requireAuth : true },
  // },
  // {
  //   path: '/shopping_cart', 
  //   name: 'shopping_cart', 
  //   component: () => import('../components/providers/shopping_cart.vue'),
  //   meta : { requireAuth : true },
  // },
  {
    path: '/dispatch/:option/:id/:AttentionId', 
    name: 'Dispatch', 
    component: () => import('../components/pharmacy/dispatch.vue'),
    meta : { requireAuth : true },
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//Handle Unauthorirized Acces

router.beforeEach((to, from, next) => {
  const publicPages   = ['/', '/security_psw', '/recover_psw', '/login', '/register', /*'/admisiones','/urgencia','/triage_classification', '/enfermeria', '/medico','/dashboard_medico', '/dashboard_nursing', 
  '/escritorio_medico',  '/processes', '/invoice', '/provider', '/shopping_cart', '/dispatch',...temp_routes*/];
  const authRequired  = to.meta.requireAuth; // !publicPages.includes(to.path);
  const loggedIn      = localStorage.getItem('user');    
  // trying to access a restricted page + not logged in
  // redirect to login page
  
  if (authRequired && !loggedIn) {
    next('/');
  }else{
    next();
  }
});

export default router
