import EventEmitter from 'eventemitter3';

export const EVENTS = {
    SHOW_TERMS: 'SHOW_TERMS',
    SHOW_COOKIES: 'SHOW_COOKIES',
} as const;

const eventEmitter = new EventEmitter();

export default eventEmitter; 