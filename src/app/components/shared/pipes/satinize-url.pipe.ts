import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'satinizeUrl' })
export class SatinizeUrlPipe implements PipeTransform {
    constructor(private satinizer: DomSanitizer) {}
    transform(data: string) {
        return this.satinizer.bypassSecurityTrustUrl(data);
    }
    /*transform(allPositions: PositionItem[]) {
        return allPositions.map(pos => pos.name).join(',');
    }*/
}
