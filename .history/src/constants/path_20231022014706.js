export const PUBLIC_PATH = {
    LOGIN: "/login",
    CHANGE_PASSWORD: 'change-password',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    CHAT: '/chat',
    
    CREATE_REQUEST: '/create-request',
    BOOK_ROOM: '/book-room',
    NOT_FOUND: '*'
}

export const ADMIN_PATH = {
    LAYOUT: "/",   
    REQUEST_LIST_ADMIN:'/request-list-admin',
    BOOK_ROOM_DETAIL: '/room-detail/:ticketId'
}

export const MANAGER_PATH = {
    LAYOUT: "/",   
    REQUEST_LIST_MANAGER:'/request-list-manager',
    REQUEST_DETAIL_MANAGER: '/request-detail/:requestId',
}

export const EMPLOYEE_PATH = {
    LAYOUT: "/",
    CHECK_ATTENDACE: '/check-attendance',
}

export const DIRECTOR_PATH = {
    LAYOUT: "/director",
}

export const HR_PATH = {
    LAYOUT: "/",
    MANAGE_USER: "/manage-user",
    MANAGE_PROFILE: '/manage-profile',
    REQUEST_LIST: '/request-list',
}