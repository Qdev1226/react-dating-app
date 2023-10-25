import { combineReducers } from "@reduxjs/toolkit";

import mailReducer from "./reducers/mailReducer";
import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";
import usersReducer from "./reducers/usersReducer";
import twoMessagesReducer from "./reducers/twoMessagesReducer";
import allChatReducer from "./reducers/allChatReducer";

const rootReducer = combineReducers({
    mail: mailReducer,
    user: userReducer,
    message: messageReducer,
    users: usersReducer,
    messages: twoMessagesReducer,
    allChat: allChatReducer
})

export default rootReducer