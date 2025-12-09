import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './graphql/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './graphql/dto/get-user.dto';
import { EditUserDto } from './graphql/dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(3);
      const hash = await bcrypt.hash(dto.password, salt);

      const user = await this.prisma.tb_user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash: hash,
        },
      });

      return user;
    } catch (error) {
      //Can add more logic here to handle errors
      return error;
    }
  }

  async findAllUsers() {
    try {
      return await this.prisma.tb_user.findMany({
        where: {
          is_deleted: false,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findUser(dto: GetUserDto) {
    try {
      const userToFind = await this.prisma.tb_user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!userToFind) {
        throw new NotFoundException('User does not exist');
      }

      return userToFind;
    } catch (error) {
      return error;
    }
  }

  async editUser(dto: EditUserDto) {
    try {
      const userEdited = await this.prisma.tb_user.update({
        where: {
          email: dto.email,
        },
        data: {
          firstName: dto.newFirstName,
          lastName: dto.newLastName,
        },
      });

      return userEdited;
    } catch (error) {
      //Prisma code for not found
      if (error.code === 'P2025') {
        throw new NotFoundException('User does not exits');
      }
      return error;
    }
  }

  async deleteUser(dto: GetUserDto) {
    try {
      const userDeleted = await this.prisma.tb_user.update({
        where: {
          email: dto.email,
        },
        data: {
          is_deleted: true,
        },
      });

      return {
        message: 'user deleted successfully',
        email: userDeleted.email,
      };
    } catch (error) {
      return error;
    }
  }
}
