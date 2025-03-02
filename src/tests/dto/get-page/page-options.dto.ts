import { IsEnum } from "class-validator";

export class PageOptionsDtoParams {
    @IsEnum()
    order?: Order = this.order.ASC;
}