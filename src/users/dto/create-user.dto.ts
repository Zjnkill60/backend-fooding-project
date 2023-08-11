import { IsNotEmpty, IsString, Matches, isNotEmpty } from "class-validator"

export class CreateUserDto {
    name: string

    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại không hợp lê' })
    phoneNumber: string

    password: string

    role: string

    address: string

    email: string

    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

export class RegisterUserDto {
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại không hợp lê' })
    phoneNumber: string

    @IsNotEmpty()
    password: string

}

export class GoogleUserDto {
    @IsNotEmpty()
    name: string

    email: string

    phoneNumber: string

    imageUrl: string

}