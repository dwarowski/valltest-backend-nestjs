import { IsArray } from "class-validator";
import { PageMetaEntity } from "./page-meta.entity";

export class PageEntity {
    
    meta: PageMetaEntity;
    
    @IsArray()
    data: [];

    constructor(data: [], meta: PageMetaEntity){
        this.data = data;
        this.meta = meta;
    }
}