// import { INC_COUNTER } from "../actions/myAction";

// import { USER } from "../actions/myAction";

// import { DOC_NAME } from "../actions/myAction";

// import { TEST } from "../actions/myAction";


// const initialState = {
//     counter: 0, // จำนวนที่ร้องเรียนของฝั่ง admin
//     finish: 0, // รายการร้องเรียนที่ดำเนินการเสร็จแล้ว
//     unfinish: 0, // รายการร้องเรียนที่ดำเนินการเสร็จแล้ว
//     name: "KMITL", 
//     myUser: {},
//     doc_name: "",
//     test: 0,
// };
// const myReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case INC_COUNTER :
//             return { counter: state.counter + 1, name: action.myname };
//         case USER :
//             // จะส่ง object ข้อมูลของ user มาเก็บไว้ใน Redux 
//             let test = {};
//             console.log("action.user", action.user);
//             test = {...action.user}
//             console.log("test ",test);
//             return { myUser : test }; // user = {password: '2222', history: Array(1), email: '64070258@kmtil.ac.th', name: 'โมริ รัน'}
//         case DOC_NAME:
//             return { doc_name : action.name }   
//         case TEST:
//             return {test : action.test+1 } 
//         default:
//             return state;
//     } 
// };
// export default myReducer;



// import data type มา
import { INC_COUNTER } from "../actions/myAction";
import { DOC_NAME } from "../actions/myAction";
import { USER_DATA } from "../actions/myAction";

 const initialState = {
    counter: 0,
    name: "KMITL",
    doc_name: "", // judas 
    user_data: {}, // {name: 'judas', history: Array(0), password: '1111', email: '64070257@kmitl.ac.th'}
 };

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case INC_COUNTER :
            return { counter: state.counter + 1, name: action.myname };
        case DOC_NAME :
            return { doc_name: action.name1 }
        case USER_DATA :
            let test = {...action.user}
            return { user_data: test, doc_name: test.name}
        default:
            return state;
}};
export default myReducer;