import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";


export class PageDto {
    
    meta: PageMetaDto;
    
    @IsArray()
    data: [];

    constructor(data: [], meta: PageMetaDto){
        this.data = data;
        this.meta = meta;
    }
}