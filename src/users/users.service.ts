import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: UserDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    // save new user in the db
    try {
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          hash,
          name: dto.name,
          address: dto.address,
        },
        // select only user info to avoid showing hash for meantime

        select: {
          userId: true,
          email: true,
          name: true,
          address: true,
        },
      });
      const cart = await this.prisma.cart.create({
        data: {
          user: {
            connect: {
              userId: user.userId,
            },
          },
        },
      });

      // return saved user
      return { user, cart };
      //catch error
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
    }
  }

  async singIn(dto: UserDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new ForbiddenException('Credentials Incorrect or Not Found');
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');
    return user.name;
  }
}
