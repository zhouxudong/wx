const Z_API = {
    getTasksByUID: '/api/task/',
    addTask:        '/api/task/add',
    editTask:       '/api/task/edit',
    login:          '/api/user/login',
    register:       '/api/user/register',
    getCode:        '/api/user/code',
    getUserInfo:    "/api/user/info",       //通过ID获取用户信息
    getMessageList: "/api/message/list",    //获取首页messageList
    getContactList: "/api/contact/list",     //获取联系人list
    getChatCont:    "/api/contact/chatcont",     //获取聊天信息
    getSubScriberList:"/api/subscriber/list",    //获取用户公众号列表
    getSubScriberInfo: "/api/subscriber/info"   //获取公众号信息
}

export default Z_API;