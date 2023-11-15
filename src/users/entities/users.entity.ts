import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: RolesEnum.USER;
}
