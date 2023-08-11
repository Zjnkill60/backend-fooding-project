import { IsNotEmpty } from "class-validator"

export class CreateFlashsaleDto {
    @IsNotEmpty()
    timer: string

    @IsNotEmpty()
    idItem: string

    @IsNotEmpty()
    priceSale: number

    @IsNotEmpty()
    quantity: number

}
