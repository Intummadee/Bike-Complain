export const INC_COUNTER = "INC_COUNTER";
export const increaseCounter = (name) => {
    return { type: INC_COUNTER, myname: name };
};




export const USER = "USER";
export const putUserData = (arrayUser) => {
    // ข้อมูลที่รับมา = {name: 'โมริ รัน', email: '64070258@kmtil.ac.th', password: '2222', history: Array(1)}
    return { type: USER, user: arrayUser };
};


export const DOC_NAME = "DOC_NAME";
export const putDocumentName = (name) => {
    console.log("♥️ : " ,name);
    return { type: DOC_NAME, name: name };
};

 