import { IsNotEmpty } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    author: string

    @IsNotEmpty()
    mainText: string

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    percentSale: number

    @IsNotEmpty()
    sold: number

    @IsNotEmpty()
    thumbnail: string

    @IsNotEmpty()
    slider: string[]

}
