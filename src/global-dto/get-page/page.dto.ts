import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";


export class PageDto<T> {

    readonly meta: PageMetaDto;
    
    @IsArray()
    readonly data: T[];

    constructor(data: T[], meta: PageMetaDto){
        this.data = data;
        this.meta = meta;
    }
}