import {
    DifferentLinkFilter,
    DisplayFilters,
    DisplayToggleFilter,
    EqualLinkFilter,
    ExludeLinkFilter,
} from 'src/app/models/filters/filter-model';
import { ICollectionLink } from 'src/app/models/linked-data-models';

export class FilterPreset {
    static getDataType(title: string): DisplayFilters<ICollectionLink> {
        return new DisplayFilters<ICollectionLink>({
            label: title,
            filters: [
                new DisplayToggleFilter<ICollectionLink>({
                    label: 'Des fillières',
                    enabled: true,
                    filter: new EqualLinkFilter({
                        values: [undefined],
                        propertyGetter: (link) => {
                            return link.filiere;
                        },
                    }),
                }),
                new DisplayToggleFilter<ICollectionLink>({
                    label: 'Des significations',
                    enabled: true,
                    filter: new EqualLinkFilter({
                        values: [undefined],
                        propertyGetter: (link) => {
                            return link.signification;
                        },
                    }),
                }),
            ],
        });
    }
    static getCirculaireType(title: string): DisplayFilters<ICollectionLink> {
        return new DisplayFilters<ICollectionLink>({
            label: title,
            filters: [
                new DisplayToggleFilter<ICollectionLink>({
                    label: 'velours',
                    enabled: true,
                    filter: new ExludeLinkFilter({
                        values: ['VELOURS', undefined],
                        propertyGetter: (link) => {
                            return link.circulaire?.matiere;
                        },
                    }),
                }),
                new DisplayToggleFilter<ICollectionLink>({
                    label: 'satin',
                    enabled: true,
                    filter: new ExludeLinkFilter({
                        values: ['SATIN', undefined],
                        propertyGetter: (link) => {
                            return link.circulaire?.matiere;
                        },
                    }),
                }),
            ],
        });
    }
    static getSpecificity(title: string): DisplayFilters<any> {
        return new DisplayFilters({
            label: title,
            filters: [
                new DisplayToggleFilter<ICollectionLink>({
                    label: 'commun',
                    enabled: true,
                    filter: new EqualLinkFilter({
                        values: [true],
                        propertyGetter: (link) => {
                            return link.spe;
                        },
                    }),
                }),
                new DisplayToggleFilter<ICollectionLink>({
                    label: 'specifique',
                    enabled: true,
                    filter: new DifferentLinkFilter({
                        values: [true],
                        propertyGetter: (link) => {
                            return link.spe;
                        },
                    }),
                }),
            ],
        });
    }
}
