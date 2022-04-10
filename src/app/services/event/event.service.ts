import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private subjects = new Map<string, BehaviorSubject<any>>();
    constructor() {}
    private getTopic(topic: string) {
        if (!this.subjects.has(topic)) {
            this.subjects.set(topic, new BehaviorSubject(undefined));
        }
        return this.subjects.get(topic);
    }

    /**
     * public data on canal
     * @param  {string} topic totpic reference of canal
     * @param  {any} data? data to publish
     */
    publish(topic: string, data?: any) {
        const subject = this.getTopic(topic);
        console.log('fire subscription', 'topic', subject);
        subject.next(data);
    }
    /**
     * get observable to subscribe from a ref topic
     * @param  {string} topic topic refence
     */
    getObs(topic: string) {
        const subject = this.getTopic(topic);
        console.log('get subscription', 'topic', subject);
        return subject.asObservable();
    }
}
