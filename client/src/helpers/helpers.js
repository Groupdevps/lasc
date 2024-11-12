import EventBus from '../event-bus'
import moment       from 'moment'
import pdfClass  from '@/plugins/pdf'; 
import api from "@/plugins/api.js"
// import momentz      from 'moment-timezone'
class helpers {  
  searcher(list, search, key){
    /*
      list = array to search
      search = keyword to find 
      key  =  if content object the key in string ''
    */
    if (list && list.length) {
      let obj = null,
          idx = null;
          // console.log("searcher: ", search, key)
      const finded = list.some( function(arr_find, idx_find){
        if ( arr_find == search || (key && arr_find[key] == search) ) {
          // console.log("fINDED ************ ", arr_find, idx_find);
          obj = arr_find;
          idx = idx_find;
          return true;
        }
      })
      if (finded) {
        return { obj, idx }
      }
    }
    return null;
  } // find item

  searcherAll(list, search, key){
    /*
      list = array to search
      search = keyword to find 
      key  =  if content object the key in string ''
    */
    if (list && list.length) {
      let obj = [],
          idx = null;
      const finded = list.forEach( function(arr_find, idx_find){
        if ( arr_find == search || (key && arr_find[key] == search) ) {
          // console.log("fINDED ************ ", arr_find, idx_find);
          obj.push(arr_find);
          // idx = idx_find;
          
        }
      })
      if (obj && obj.length > 0) {
        return { obj }
      }
    }
    return null;
  } //

  get_local(key){
    let info_local = null;
    if (localStorage.getItem(key)) {
        info_local = JSON.parse(localStorage.getItem(key));
    }
    return info_local;
  }

  set_local(key, item){
   
      if (localStorage.getItem(key)) {
        console.log("Exist this " + key + " in local");
      }
      if (Array.isArray(item)) {
        item = [ ...item ];
      }else if (typeof item == "object") {
        item = { ...item };

      }
    localStorage.setItem(key, JSON.stringify(item));    
    return true

  } // set local

  current_auth_user(currentUser,item){
    if (currentUser && currentUser.user && item && (item.roles && item.roles.length > 0 && item.roles.includes(currentUser.user.roleId))){
      return true;
    }
    return false
  } // currrent_auth_user

  keyboard_is_active(keys, id_notification, type, obj, value, func){
    let key_board = false;
    if (localStorage.getItem('virtual_Key_board')) {
      key_board = JSON.parse(localStorage.getItem('virtual_Key_board'));
    }       
    // console.log(key_board , "KEYbOARD ACTIVE ")
    if (key_board) {              
      /*if (this[keys]) {
          this[keys] = '';
      }*/
      // keys         
      EventBus.$emit('active_keyboard_key',{
        ID   : id_notification,
        key  : keys,
        type,
        obj,
        func,
        value
      });
    }       
  } // keyboard_is_active

  set_property_obj(items){
    if (items && items.length > 0) {
      
      let field_new   = {};
      items.forEach((field) =>{
        // if (field.enable) {
          field_new[field.key] = '';
        // }
      })
     return field_new;
    }
    return null;
  }

  format_req(item, list){
    let formated = null;
    if (list && list.length > 0) {
      formated = {};
      list.forEach((item_format)=>{
        if (item_format) {
          formated[item_format] = item[item_format];
        }
      });
    }
    return formated;
  }

  check_img(item, url){
    let image = '/img/no_img_found.png';
    if (item) {
      if (item.includes('http')){
        image =  item;            
      }else{
        image = url + '/' + item
      }
      if (item.includes('no_img_found') && item.includes('http')) {
        image = '/img/no_img_found.png';
      }
       
    }
              
    
    return image;
  }

  clear_bus(eventbus, items, opt){
    if (items) {
      for (let iter in items){
        if (items[iter]) {
          eventbus.$off(iter, items[iter]);
        }
      }
      console.log("clear bus : ", opt);
    }


  }

  downloadFileBlob(infoBlob, name, extFile = "txt"){
      const blob = new Blob([infoBlob]);                
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}_${new Date().getTime().toString()}.${extFile}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);                
  }
  downloadFilePdf(data, nameFile){
    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nameFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  }
  openLink(link){ // $API.url+link
    window.open(api.url + link, '_blank');
  }

  timeElapsed(item){ 
    let diff 		= 0;
		let a 			= moment(moment.now());//fecha  mayo
    let b 			= moment(item);//fecha menor
    let edadmoment 	= diff = a.diff(b, 'years')
    let edad 		= edadmoment;
    let result 		= `${edad} Años`;			      
    if (parseInt(edad) === 0) {
      edad 	= a.diff(b, 'months')
      result = `${edad} Meses`;
      if(parseInt(edad) === 0){
        edad 	= a.diff(b, 'days')
        result = `${edad} Dias`;
        if(parseInt(edad) === 0){
          edad 	= a.diff(b, 'hours')
          result = `${edad} Horas`;
          if(parseInt(edad) === 0){
            edad 	= a.diff(b, 'minutes')
            result = `${edad} Minutos`;
            
          }

        }
      }
    }
    
    return result
  }

  checkIsAdult(item){
    if (item) {      
      let a       = moment(moment.now());//fecha  mayo
      let b       = moment(item);//fecha menor
      let diff = a.diff(b, 'years')
      return diff > 18
    }
    return false
  }
  timeElapsedInType(date, type = "minutes"){// years, months, days, minutes
    let a 			= moment(moment.now());
    let b 			= moment(date);
    let time 	  = a.diff(b, type)
    return time;
  }

  addTimeWithMoment(date, val, type = 'days' ){
    const originDate = moment(date);
    const newDate = originDate.clone().add(val, type);
    return newDate
  }
  getMomentDate(date){
    return moment(date)
  }
  currentDateMoment(){
    return moment(moment.now());
  }
  formatDate(date, format){
    return moment(date).format(format);
  }
  getCurrentDate(item){
    return (item) ? moment(item).format("YYYY-MM-DD")  : moment().format("YYYY-MM-DD");
  }
  getCurrentDateHour(item){
    return (item) ? moment(item).format("YYYY-MM-DD HH:mm")  : moment().format("YYYY-MM-DD HH:mm");
  }
  getCurrentTime(item){
    return (item) ? moment(item).format("HH:mm:ss") : moment().format("HH:mm:ss");
  }
  getCurrentTimeHS(item){
    return (item) ? moment(item).format("HH:mm") : moment().format("HH:mm");
  }
  formatFullName(item){
    if(item){
      const {HistoryPerson} = item;
      let fullName = HistoryPerson.name;
      if (HistoryPerson.secondName ) fullName += " " + HistoryPerson.secondName;                 
      if(HistoryPerson.lastName) fullName += " " + HistoryPerson.lastName;
      if (HistoryPerson.secondSurname ) fullName += " " + HistoryPerson.secondSurname;
      return fullName;
    }
    return "";
  }

  async generatePdf(item, typeFormat){
    const pdf = new pdfClass();
    const PDFForm = await pdf.PdfUrlBlob(item, typeFormat);
    return PDFForm;
  }
  async fileToB64(file){
    // console.log("FILE ", file)
    return new Promise((resolve, reject) => {
       const reader = new FileReader();
        reader.readAsDataURL(file && file.length > 0 ? file[0] : file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
  } // file to b64

  normalizeText(text){
    return  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  normalizeString(str) {
    // Normaliza la cadena y elimina caracteres diacríticos (acentos, etc.)
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  removeAccents(text) {
    return text.replace(/[áäàâã]/gi, "a")
                .replace(/[éëèê]/gi, "e")
                .replace(/[íïìî]/gi, "i")
                .replace(/[óöòôõ]/gi, "o")
                .replace(/[úüùû]/gi, "u")
                .replace(/ñ/gi, "n");
  }

  isPermission(item, opt){
    if (opt == "canAdd") {
      if (!item.canAdd)EventBus.$emit("notifications", {type : "warning" , msg : "Usuario no tiene permiso para: agregar/crear"});
      return item.canAdd; 
    }else if (opt == "canView"){
      if (!item.canView)EventBus.$emit("notifications", {type : "warning" , msg : "Usuario no tiene permiso para: VER/VISUALIZAR"});
      return item.canView; 
    }else if(opt == 'canEdit'){
      if (!item.canEdit)EventBus.$emit("notifications", {type : "warning" , msg : "Usuario no tiene permiso para: ACTUALIZAR/EDITAR"});
      return item.canEdit; 
    }else if(opt == "canDelete"){
      if (!item.canDelete)EventBus.$emit("notifications", {type : "warning" , msg : "Usuario no tiene permiso para: ELIMINAR"});
      return item.canDelete;
    }

  }
  isValidPermission(item, Permission, defaultPermission){
    const {canView, id} = Permission(item.key);
      // console.log(item.key, id, canView)
    if (canView && id){ 
      return true;
    }
    else if (!id){ 
      if (defaultPermission.canView) {
        return true;
      }
    }
    return false;
  }
  renderPermissionToShow(items, Permission, defaultPermission){
    return items.map(x=> {                 
      if (x.subMenus && x.subMenus.length > 0) {
        x.subMenus = x.subMenus.map(z=> {
          if(this.isValidPermission(z, Permission, defaultPermission)){
            return z;
          }
        })
      }
      if (this.isValidPermission(x, Permission, defaultPermission)) {
        return x;
      }    
    });
  } // renderPermissionToShow
  renderErrorMessage(error, text){
    if (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          return error.response.data.message;
        }
        return error.response.data
      }
    }
    return text;
  }
  
  renderTypeNote(item){
    if(item=='MedicalEvolution'){ 
      return "EVOLUCION MEDICA"
    }else if(item=="MedicalNotes"){
      return "NOTA MEDICA"
    }else if(item=="NursingNotes"){
      return "NOTA DE ENFERMERIA"
    }else if(item=="MedicalNotesSurgery"){
      return "EVOLUCION DE CIRUGIA"
    }else if(item=="MedicalNotes"){
      return "EVOLUCION DE ANESTESIA"
    }else if(item=="RecoverySurgery"){
      return "EVOLUCION DE RECUPERACION"
    }
    return "NOTAS MEDICAS"
  }
  numberToLetters(num) {
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas2 = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (num < 10) return unidades[num];
    if (num >= 10 && num < 20) return decenas[num - 10];
    if (num >= 20 && num < 100) {
        if (num % 10 === 0) return decenas2[Math.floor(num / 10)];
        return decenas2[Math.floor(num / 10)] + ' y ' + unidades[num % 10];
    }
    if (num >= 100 && num < 1000) {
        if (num % 100 === 0) return (num === 100 ? 'cien' : centenas[Math.floor(num / 100)]);
        return centenas[Math.floor(num / 100)] + ' ' + this.numberToLetters(num % 100);
    }
    if (num >= 1000 && num < 1000000) {
        if (num === 1000) return 'mil';
        if (num < 2000) return 'mil ' + this.numberToLetters(num % 1000);
        return this.numberToLetters(Math.floor(num / 1000)) + ' mil ' + (num % 1000 !== 0 ? this.numberToLetters(num % 1000) : '');
    }
    if (num >= 1000000 && num < 1000000000) {
        if (num === 1000000) return 'un millón';
        if (num < 2000000) return 'un millón ' + this.numberToLetters(num % 1000000);
        return this.numberToLetters(Math.floor(num / 1000000)) + ' millones ' + (num % 1000000 !== 0 ? this.numberToLetters(num % 1000000) : '');
    }

    return 'Número fuera de rango';
}

formatNumberToCop(number) {
    return number.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
createUrlWithQuery(baseUrl, params) {  
  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.toString();
}


}


export default new helpers;
