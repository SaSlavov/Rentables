import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UserLoginDTO } from 'src/models/dtos/userDTOs/user-login-dto';
import { JWTPayload } from 'src/common/jwt-payload';
import { UserRole } from 'src/models/enums/user-role';
import { Token } from 'src/models/entities/token.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

  ) { }

  async findUserByName(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
        isDeleted: false,
      }
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.findUserByName(username);
    if (!user) {
      return null;
    }
    const isUserValidated = await bcrypt.compare(password, user.password);
    return isUserValidated
      ? user
      : null;
  }

  async login(loginUser: UserLoginDTO): Promise<{ token: string }> {
    const user = await this.validateUser(loginUser.username, loginUser.password);

    if (!user) {
      throw new BadRequestException('Wrong credentials!');
    }

    const payload: JWTPayload = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: UserRole[user.role],
      avatarUrl: user.avatarUrl,
      banEndDate: user.banEndDate,
      
    }
    this.toggleOnline(payload.id)
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  async addToBlacklist(IncomingToken: string) {
    const foundToken = await this.tokenRepository.findOne({
      where: {
        token: IncomingToken,
      }
    })
    if (foundToken) {
      throw new BadRequestException('User is already logged out')
    }

    const tokenEntity = this.tokenRepository.create()
    tokenEntity.token = IncomingToken;
    await this.tokenRepository.save(tokenEntity)

  }

  async isBlacklisted(token: string): Promise<boolean> {
    return Boolean(await this.tokenRepository.findOne({
      where: {
        token,
      }
    }));
  }

  async toggleOnline(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });
    return await this.userRepository.save(user);
  }
}
