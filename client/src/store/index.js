import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module';
import { infoPatient } from './infoPatient.module'
import { infoCenter } from './infoCenter.module'
import { listCups } from './listCups.module'
import { listTypeDocument } from './listTypeDocument.module'
import { listDiagnostic } from './listDiagnostic.module'
import { listTreatment  } from './listTreatment.module'
import { listMedication  } from './listMedication.module'
import { listTariffManual  } from './listTariffManual.module'
import { listISS } from './listISS.module'
import { listTypesOrder } from './listTypesOrder.module'
import { listStatus } from './listStatus.module'
import { listCurrentAdministrator } from './listCurrentAdministrator.module'
import { listGender } from './listGender.module'
import { listZone } from './listZone.module'
import { listRegime } from './listRegime.module'
import { listSocioeconomicLevel } from './listSocioeconomicLevel.module'
import { listModeratorFee } from './listModeratorFee.module'
import { listMaritalStatus } from './listMaritalStatus.module'
import { listLevelTriage } from './listLevelTriage.module'
import { listUVT } from './listUVT.module'
import { listConcept } from './listConcept.module'
import { listTypeCenter } from './listTypeCenter.module'
import { listUser } from './listUser.module'
import { listTypeService } from './listTypeService.module'
import { listNoteType } from './listNoteType.module'
import { listOsteosynthesisMaterial } from './listOsteosynthesisMaterial.module'








// import { listTypeRelationships } from './listTypeRelationships.module'
// import { listTariffCategory } from './listTariffCategory.module'
// import { listStates } from './listStates.module'
// import { listCities } from './listCities.module'
// import { listDoctors } from './listDoctors.module'
// import { listRoles  } from './listRoles.module'
import { listCenters } from './listCenters.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    infoPatient,
    infoCenter,
    listCups,
    listTypeDocument,
    listDiagnostic,
    listTreatment,
    listTariffManual,
    listMedication,
    listTypesOrder,
    listStatus,
    listCurrentAdministrator,
    listCenters,
    listGender,
    listZone,
    listRegime,
    listSocioeconomicLevel,
    listModeratorFee,
    listMaritalStatus,
    listLevelTriage,
    listISS,
    listUVT,
    listConcept,
    listTypeCenter,
    listUser,
    listTypeService,
    listNoteType,
    listOsteosynthesisMaterial,
  }
})
