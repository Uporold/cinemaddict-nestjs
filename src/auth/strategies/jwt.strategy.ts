import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['JWT_SECRET_KEY'],
    });
  }

  async validate(payload: JwtPayload) {
    const { login } = payload;
    const user = await this.userRepository.findOne({ login });
    return user;
  }
}
