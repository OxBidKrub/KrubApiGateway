import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { IsNotEmpty, IsString, IsNumber, IsEmail , Length, IsPhoneNumber, IsNumberString} from 'class-validator';
import { Base } from "./base/Base.entity";

@Entity('user')
export class User extends Base{


    @Column({unique: true})
    @IsString()
    @IsNotEmpty()
    @Length(6,20)
    username: string

    @Column({unique: true})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string

    @Column()
    @IsString()
    @IsNotEmpty()
    firstName: string

    @Column()
    @IsString()
    @IsNotEmpty()
    lastName: string

    @Column()
    @IsNumber()
    @IsNotEmpty()
    money: number

    @Column()
    @Length(10,10)
    @IsNotEmpty()
    @IsNumberString()
    phoneNumber: string

    @Column()
    @IsNotEmpty()
    address: string
 

}


