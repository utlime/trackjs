"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CircularLiFoQueue {
    constructor(size) {
        this.storage = [];
        this.size = size;
    }
    push(value) {
        this.storage.unshift(value);
        this.storage.splice(this.size, Infinity);
    }
    pop() {
        return this.storage.shift();
    }
}
class TrackJS {
    static install({ capture = true, size = 10 }) {
        TrackJS.capture = capture;
        if (capture) {
            TrackJS.sendUsage();
        }
        else {
            TrackJS.queue = new CircularLiFoQueue(size);
        }
    }
    static sendError(error) {
        console.error(error);
    }
    static sendUsage() {
        console.log('usage call');
    }
    static onError(error) {
        if (TrackJS.capture) {
            TrackJS.sendError(error);
        }
        else if (TrackJS.queue != null) {
            TrackJS.queue.push(error);
        }
    }
    static enable() {
        if (TrackJS.capture) {
            return;
        }
        TrackJS.capture = true;
        TrackJS.sendUsage();
        if (TrackJS.queue == null) {
            return;
        }
        let error;
        while ((error = TrackJS.queue.pop()) != null) {
            TrackJS.sendError(error);
        }
    }
}
exports.TrackJS = TrackJS;
TrackJS.capture = true;
//# sourceMappingURL=index.js.map