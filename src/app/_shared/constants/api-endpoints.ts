const AUTH_BASE = '/auth';
const TOUR_BASE = '/tours';
const USER_BASE = '/user';
const TUTE_BASE = '/tutorial';
const MODULE_BASE = '/modules';
const MOOD_BASE = '/moods';
const QANDA_BASE = '/QandA';
const NOTIFICATIONS_BASE = '/notifications';
const BREATHING_BASE = '/breathing';
const JOURNAL_BASE = '/journal';
const MINDMAPS_BASE = '/mindMap';

export const API_ENDPOINTS = {
  AUTH: {
    BASE: AUTH_BASE,
    AUTHENTICATE: `${AUTH_BASE}/authenticate`,
    REGISTER: `${AUTH_BASE}/register`,
  },
  TOURS: {
    BASE: TOUR_BASE,
    GET_ALL: `${TOUR_BASE}/all`,
    CREATE: `${TOUR_BASE}/create`,
    GET_ONE: (id: string) => `${TOUR_BASE}${id}`, // Path variable example
  },  
  TUTORIALS: {
    BASE: TUTE_BASE,
    GET_BY_STUDENT_ID: `${TUTE_BASE}/findByStudent/`,
    CREATE: `${TOUR_BASE}/create`,
    GET_ONE: (id: string) => `${TOUR_BASE}${id}`, // Path variable example
  },
  USERS: {
    BASE: USER_BASE,
    SIGNUP: `${USER_BASE}/signup`,
    SIGNUP_INSTRUCTOR: `${USER_BASE}/signup-instructor`, 
    SEARCH: (params: { [key: string]: any }) => {
      const queryParams = new URLSearchParams(params).toString();
      return `${USER_BASE}/search?${queryParams}`; // Param map example
    },
    GET_INSTRUCTORS: `${USER_BASE}/find-By-role/ADMIN`,
    GET_STUDENTS: `${USER_BASE}/find-By-role/STUDENT`,
    DELETE_USER: `${USER_BASE}/delete-user`,
    TIME_TRACKING: `${USER_BASE}/update-time-tracking`,
    UPDATE_STUDENT: `${USER_BASE}/update-student`,
    UPDATE_PASSWORD: `${USER_BASE}/update-password`
  },
  MODULES: {
    BASE: MODULE_BASE,
    GET_BY_STUDENT_ID: `${MODULE_BASE}/findPointsByStudent/`,
    SHARE_BADGE: `${MODULE_BASE}/shareBadge`
  },
  MOODS: {
    BASE: MOOD_BASE,
    GET_ALL: `${MOOD_BASE}/all`,
  },
  QANDA: {
    BASE: QANDA_BASE,
    SHARED_QNA: `${QANDA_BASE}/sharedQandA`,
    SHARE: `${QANDA_BASE}/share`,
    RATE:`${QANDA_BASE}/rate`,
    SHARED_FOR_ADMIN: `${QANDA_BASE}/sharedQandAForAdmin`,
  },
  MINDMAPS: {
    BASE: MINDMAPS_BASE,
    SHARED_MINDMAPS: `${MINDMAPS_BASE}/sharedMindMaps`,
    SHARE: `${MINDMAPS_BASE}/share`,
    RATE:`${MINDMAPS_BASE}/rate`,
    SHARED_FOR_ADMIN:`${MINDMAPS_BASE}/sharedMindMapsForAdmin`,
  },

  NOTIFICATIONS: {
    BASE: NOTIFICATIONS_BASE,
    MESSAGES: `${NOTIFICATIONS_BASE}/messages`,
  },
  BREATHING: {
    BASE: BREATHING_BASE,
    GET_BY_STUDENT_ID: `${BREATHING_BASE}/findByStudent/`,
    DELETE: `${BREATHING_BASE}/delete/`,
  },
  JOURNAL: {
    BASE: JOURNAL_BASE,
    GET_BY_STUDENT_ID: `${JOURNAL_BASE}/findByStudent/`,
  }
  

  /* 
  usage 

    getTourById(id: string) {
        return this.http.get(API_ENDPOINTS.TOURS.GET_ONE(id));
    }

    searchUsers(params: { [key: string]: any }) {
        return this.http.get(API_ENDPOINTS.USERS.SEARCH(params));
    }


  */
};