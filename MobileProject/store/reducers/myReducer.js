import { INC_COUNTER } from "../actions/myAction";

import { USER } from "../actions/myAction";

import { DOC_NAME } from "../actions/myAction";

const initialState = {
    counter: 0, // จำนวนที่ร้องเรียนของฝั่ง admin
    finish: 0, // รายการร้องเรียนที่ดำเนินการเสร็จแล้ว
    unfinish: 0, // รายการร้องเรียนที่ดำเนินการเสร็จแล้ว
    name: "KMITL", 
    user: [],
    doc_name: "",
};
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case INC_COUNTER :
            return { counter: state.counter + 1, name: action.myname };
        case USER :
            // จะส่ง object ข้อมูลของ user มาเก็บไว้ใน Redux 
            let test = [];
            test.push(action.user)
            return { user : test }; // user = {password: '2222', history: Array(1), email: '64070258@kmtil.ac.th', name: 'โมริ รัน'}
        case DOC_NAME:
            return { doc_name : action.name }    
        default:
            return state;
    } 
};
export default myReducer;