import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private subjects = new Map<string, BehaviorSubject<any>>()
    constructor() { }
    private getTopic(topic: string) {
        if (!this.subjects.has(topic)) {
            this.subjects.set(topic, new BehaviorSubject(undefined));
        }
        return this.subjects.get(topic)
    }
    publish(topic: string, data?: any) {
        const subject = this.getTopic(topic);
        subject.next(data)
    }

    getObs(topic: string) {
        const subject = this.getTopic(topic);
        return subject.asObservable();
    }
}
