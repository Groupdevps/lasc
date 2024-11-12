const {
    sequelize,
    TypeOrder,
    CAU,
    HistoryPerson, 
    LevelTriage,
    Profile,
    Triage,
    TypeService,
    Status,
    Role, 
    User,
    Permission,
    Resource,
    TypeResource,
    CupsList,
    TariffManual,
    OrderCupsList,
    iss,
    TypeID,
    CurrentAdministrator,
    Address,
    City,
    DetailType,
    Detail,
    Center,
    ElectronicBillingAuthorization,
    SubSupply,
    Concept,
    Product,
    RecoveryObservation,
    Person,
    Qx,
    Order,
    Gender,
    NoteType,
    Attention,
    OrderManualTariff,
    OrderProduct,
    OrderSubDiagnose,
    SubDiagnose,
    Medicine,
    MedicationList,
    Recommendation,
    Inability

    
}  = require('../models'); 





//include
const includeDetail = [{ model: DetailType }]
const includeBill = [
    { model: Detail, include: includeDetail },
    { model: Center, include: [ Address] },
    { model: ElectronicBillingAuthorization},

]
const includeRecovery = [
    {
      model: RecoveryObservation,
      as: 'RecoveryObservations',
      include: [User]
    }, Person, Qx, Order, User
  ]
const includeApply = [
    {
        model: SubSupply,
        include: [Concept,Product, User]
    },
    User
];
const includeAgreement = [{model:CurrentAdministrator, as: "currentAdministrator"}]
const includeUser = [
    { model: Role, as: 'Role' }
]
const includeTriage = [
    { model: LevelTriage, as: 'LevelTriage'  }
]
const includeAddress = [
    {model: City}
]
const includeCurrentAdministrator = [{ model: Address, include: includeAddress  },]
const includeHistoryPerson=   [
    { model: TypeID, as: "TypeID" },
    { model: Gender},
    { model: CurrentAdministrator, as: "administrator",  include:includeCurrentAdministrator },


]
const includeAttention = [
    { model: CAU  },
    { model: HistoryPerson },
    { model: TypeService, as: 'TypeService'  },
    { model: Status, as: 'Status'  },
    { model: Triage, as: 'Triage' , include: includeTriage }
    
]

const includeAttentionById = [
    { model: CAU },
    { model: HistoryPerson , include: includeHistoryPerson },
    { model: TypeService, as: 'TypeService'  },
    { model: Status, as: 'Status'  },
    { model: Triage, as: 'Triage'  , include: includeTriage }
    
]
const  includeRole = [{
	model: Permission,
	as: 'permissions',
 	include: [{
		model: Resource,  
		include: [{
            model: TypeResource 
        }]
	}]
  }]

const includeConcept = [
      {
          model: CupsList,
           as: 'CupsList'
      },
      {
          model: TariffManual,
           as: 'TariffManual'
      },
      {
          model: iss,
           as: 'Iss'
      }
  ]

  
 
const includeOrder = [
    {
        model: Attention,
        as: 'Attention', // Asegúrate de que este alias sea el correcto
        include: [
          {
            model: HistoryPerson,
            as: 'HistoryPerson',
            required: true, // Asegúrate de que este alias sea el correcto
            include: [Gender]
          },
          {
            model: Triage,
            as: 'Triage',
            include: [{
                model: LevelTriage,
                as: 'LevelTriage'
            }],
            required: true // Asegúrate de que este alias sea el correcto
          },
          {
            model: TypeService
          },
          
        ],
        required: true
    },
    {
      model: Person,
    },
    {
        model: Status,
      },
    {
      model: Center,
    },
    {
      model: User,
      as: 'Doctor',
      include: [{model: Role, as: 'Role'}]
    },
    {
      model: TypeOrder,
      as: "TypeOrder"
    },
    {
      model: OrderCupsList,
      include: [CupsList],
    },
   
    {
      model: OrderSubDiagnose,
      include: [SubDiagnose],
    },
    
  ]
  const includeNote = [
    { model: NoteType },
    { model: Attention, include: includeAttentionById},
    { model: Order , include: includeOrder},
    { model: User, include: includeUser}
]
module.exports = {
    
    //includes
    includeNote,
    includeRecovery,
    includeUser,
    includeAttention,
    includeRole,
    includeConcept,
    includeAttentionById,
    includeAgreement,
    includeDetail,
    includeBill,
    includeApply,
    OrderManualTariff,
}