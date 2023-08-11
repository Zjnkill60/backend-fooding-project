import { IsNotEmpty } from "class-validator"

export class CreateDiscountDto {
    @IsNotEmpty()
    codeSeller: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    discount: number

    @IsNotEmpty()
    priceApplicable: number

    @IsNotEmpty()
    category: string

}
