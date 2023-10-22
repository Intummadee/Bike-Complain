export const INC_COUNTER = "INC_COUNTER";
export const increaseCounter = (name) => {
    return { type: INC_COUNTER, myname: name };
};



 
 
export const USER_DATA = "USER_DATA";
export const putUSER_DATA = (data) => {
    //  console.log("♥️ putUSER_DATA : " , data);
    return { type: USER_DATA, user: data };
 };

export const DOC_NAME = "DOC_NAME";
export const putDocumentName = (name) => {
    // console.log("♥️ putDocumentName : " , name);
    return { type: DOC_NAME, name1: name };
};

export const TEST = "TEST";
export const putTEST = (test) => {
    // console.log("♥️ putTest : " , test);
    return { type: TEST, test: test };
}; 