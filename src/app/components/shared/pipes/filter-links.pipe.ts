import { Pipe, PipeTransform } from '@angular/core';
import { ICollectionLink } from 'src/app/models/linked-data-models';

type keyType =
    | 'signification'
    | 'placement'
    | 'position'
    | 'circulaire'
    | 'filiere'
    | 'symbols'
    | 'symbolsens'
    | 'symboleAccessory'
    | 'note'
    | 'spe';

@Pipe({ name: 'filterLink' })
export class FilterLinkPipe implements PipeTransform {
    transform(links: ICollectionLink[], keys: keyType[], optional = false) {
        return links.filter((item) => {
            if (!optional) {
                for (const key of keys) {
                    if (!item[key]) {
                        return false;
                    }
                }
                return true;
            } else {
                for (const key of keys) {
                    if (item[key]) {
                        return true;
                    }
                }
                return false;
            }
        });
    }
    /*transform(allPositions: PositionItem[]) {
        return allPositions.map(pos => pos.name).join(',');
    }*/
}
