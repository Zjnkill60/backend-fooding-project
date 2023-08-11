import { IsEmail, IsNotEmpty, IsString, Matches, ValidateNested } from "class-validator"


class Item {
    @IsNotEmpty()
    name: string


    @IsNotEmpty()
    thumbnail: string

    @IsNotEmpty()
    quantity: number

}

export class CreateOrderDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    orderCode: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string


    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại không hợp lê' })
    phoneNumber: string

    @IsNotEmpty()
    totalPrice: number

    @IsNotEmpty()
    address: string

    @ValidateNested()
    @IsNotEmpty()
    item: Item

    @IsNotEmpty()
    status: string

    payments: string
    shipper: string

}