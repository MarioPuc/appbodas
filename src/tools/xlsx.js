import { read, utils } from "xlsx";
import { db } from '@/firebase';
import { generateRandomId } from "../tools/randomStr";

export default function xlsxFileToJson(file, idEvento) {
    if(file){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = read(data,{type:"binary"});
         let rowObject = [];
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              rowObject = utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              //console.log(rowObject);
         });
         console.log(rowObject);

         rowObject.forEach( async data => {
            await db.collection("invitados").add(data).then( async (snapshot) => {
                data.idFirebase = snapshot.id;
                data.idInvitado = generateRandomId();
                data.idEvento = idEvento;
                
                await db.collection("invitados").doc(data.idFirebase).update(data)
                .then((snapshot) => {
                  //window.location.reload(true);
                });
              });
         });
         
        }
    }
}
