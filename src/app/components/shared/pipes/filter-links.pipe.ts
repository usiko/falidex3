import { Pipe, PipeTransform } from '@angular/core';
import { ICollectionLink } from 'src/app/models/linked-data-models';

type keyType = 'signification' | 'placement' | 'position' | 'circulaire' | 'filiere' | 'symbols' | 'symbolsens' | 'symboleAccessory' | 'note' | 'spe';

@Pipe({ name: 'filterLink' })
export class FilterLinkPipe implements PipeTransform {
    transform(links: ICollectionLink[], keys: keyType[]) {
        return links.filter(item => {
            for (const key of keys) {
                if (!item[key]) {
                    return false;
                }
            }
            return true;
        })
    }
    /*transform(allPositions: PositionItem[]) {
        return allPositions.map(pos => pos.name).join(',');
    }*/
}
