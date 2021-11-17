import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  UNIQUE_USER_EMAIL_CONSTRAINT,
  UNIQUE_USER_LOGIN_CONSTRAINT,
} from './constraints';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const { login, name, email, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      login,
      name,
      email,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err?.constraint === UNIQUE_USER_EMAIL_CONSTRAINT) {
        throw new ConflictException('User with this email already exists');
      }
      if (err?.constraint === UNIQUE_USER_LOGIN_CONSTRAINT) {
        throw new ConflictException('User with this login already exists');
      }
      throw new InternalServerErrorException();
    }
    return user;
  }

  async login(
    user: Omit<User, 'password'>,
  ): Promise<Omit<User, 'password'> & { token: string }> {
    const payload = { login: user.login };
    const token = await this.jwtService.signAsync(payload);
    return { ...user, token };
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
