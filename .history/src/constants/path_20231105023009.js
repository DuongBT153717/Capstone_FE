export const PUBLIC_PATH = {
    LOGIN: "/login",
    CHANGE_PASSWORD: 'change-password',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    CHAT: '/chat',
    CREATE_REQUEST: '/create-request',
    CREATE_REQUEST_EXISTED: '/create-request-existed/:ticketId',
    NOT_FOUND: '*',
    REQUEST_DETAIL: '/request-detail/:requestId',
    CREATE_NOTIFICATION: '/create-notification',
    NOTIFICATION_DETAIL: '/notification-detail/:notificationId/:creatorId',
    NOTIFICATION_LIST: '/notification-list'
}

export const ADMIN_PATH = {
    LAYOUT: "/",   
    REQUEST_LIST_ADMIN:'/request-list-admin',
    BOOK_ROOM_DETAIL: '/room-detail/:ticketId',
    MANAGE_LIST_TICKET_ADMIN: '/manage-list-admin',
    CHECK_BOOK_ROOM: '/check-book-room',
    NOTIFICATION_LIST_ADMIN: '/notification-list-admin'
}

export const MANAGER_PATH = {
    LAYOUT: "/",   
    MANAGE_LIST_TICKET_MANAGER:'/request-list-manager',
    REQUEST_LIST_MANAGER: '/request-manager-list',
    BOOK_ROOM_MANAGER: '/book-room-manager',
    BOOK_ROOM_DETAIL_MANAGER: '/book-room-detail-manager/:ticketId',
    NOTIFICATION_LIST_MANAGER: '/notification-list-manager'
}

export const EMPLOYEE_PATH = {
    LAYOUT: "/",
    CHECK_ATTENDACE: '/check-attendance',
    REQUEST_LIST_EMPLOYEE: '/request-list-employee',
    NOTIFICATION_LIST_MANAGER: '/notification-list-employee'
}

export const HR_PATH = {
    LAYOUT: "/",
    MANAGE_USER: "/manage-user",
    MANAGE_PROFILE: '/manage-profile',
    REQUEST_HR_LIST: '/request-hr-list',
    REQUEST_LIST_HR: '/request-list-hr',
    BOOK_ROOM_HR: '/book-room-hr',
    NOTIFICATION_LIST_HR: '/notification-list-hr'
}