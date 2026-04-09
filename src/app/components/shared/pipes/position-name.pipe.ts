import { Pipe, PipeTransform } from '@angular/core';



@Pipe({ name: 'postitionNameList' })
export class PositionNameListPipe implements PipeTransform {
    transform(allPositions: any[]) {
        return allPositions.map(pos => pos.name).join(',');
    }
    /*transform(allPositions: PositionItem[]) {
        return allPositions.map(pos => pos.name).join(',');
    }*/
}
