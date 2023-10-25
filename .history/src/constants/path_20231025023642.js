export const PUBLIC_PATH = {
    LOGIN: "/login",
    CHANGE_PASSWORD: 'change-password',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    CHAT: '/chat',
    CREATE_REQUEST: '/create-request',
    CREATE_REQUEST_EXISTED: '/create-request-existed/:ticketId',
    BOOK_ROOM: '/book-room',
    NOT_FOUND: '*',
    REQUEST_DETAIL: '/request-detail/:requestId',
}

export const ADMIN_PATH = {
    LAYOUT: "/",   
    REQUEST_LIST_ADMIN:'/request-list-admin',
    BOOK_ROOM_DETAIL: '/room-detail/:ticketId',
    MANAGE_LIST_TICKET_ADMIN: '/manage-list-admin'
}

export const MANAGER_PATH = {
    LAYOUT: "/",   
    MANAGE_LIST_TICKET_MANAGER:'/request-list-manager',
    REQUEST_LIST_MANAGER: '/request-list'
}

export const EMPLOYEE_PATH = {
    LAYOUT: "/",
    CHECK_ATTENDACE: '/check-attendance',
    REQUEST_LIST_EMPLOYEE: '/request-list-employee'
}

export const HR_PATH = {
    LAYOUT: "/",
    MANAGE_USER: "/manage-user",
    MANAGE_PROFILE: '/manage-profile',
    REQUEST_LIST: '/request-list',
    REQUEST_LIST_HR: '/request-list-hr',
}