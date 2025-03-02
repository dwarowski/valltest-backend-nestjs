import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";


export class PageDto {

    readonly meta: PageMetaDto;
    
    @IsArray()
    readonly data: [];

    constructor(data: [], meta: PageMetaDto){
        this.data = data;
        this.meta = meta;
    }
}