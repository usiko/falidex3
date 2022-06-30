//PictureService

import { Pipe, PipeTransform } from '@angular/core';
import { PictureService } from 'src/app/services/picture/picture.service';

@Pipe({ name: 'resourcePicture' })
export class ResourcePicurePipe implements PipeTransform {
    constructor(private pictureService: PictureService) {}
    transform(src: string) {
        return this.pictureService.getFullResourceUrl(src);
    }
}
