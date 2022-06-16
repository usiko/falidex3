import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayGroupePipe' })
export class ArrayGroupPipe implements PipeTransform {
    transform(arr: any[], groupLength: number) {
        let index = 0;
        const acc = arr.reduce((acc, item) => {
            const element = this.getArray(acc, index, groupLength);
            element.push(item);
            return acc;
        }, []);
        console.log(acc);
        return acc;
    }

    private getArray(acc, index, maxLength) {
        if (!acc[index]) {
            acc[index] = [];
            return acc[index];
        } else if (acc[index].length > maxLength - 1) {
            index++;
            return this.getArray(acc, index, maxLength);
        } else {
            return acc[index];
        }
    }
    /*transform(allPositions: PositionItem[]) {
        return allPositions.map(pos => pos.name).join(',');
    }*/
}
