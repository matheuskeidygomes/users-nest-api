import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities/user.entity';
import { UsersService } from '../../services/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.getOneByEmail(email);
    if (!user) throw new UnauthorizedException('Acesso não autorizado.');
    else { delete user.password; return user }
  }

  async generateToken(payload: User) {
    const { id, email } = payload;
    const token = this.jwtService.sign({ userId: id, email }, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION })
    return token;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getOneByEmail(email);
    if (!user || user.password !== password) throw new UnauthorizedException('Usuário ou Senha Inválidos');
    const token = await this.generateToken(user);
    const json = { id: user.id, email: user.email, token };
    return json;
  }

  async register(email: string, password: string) {
    const hasUser = await this.usersService.getOneByEmail(email);
    if (hasUser) throw new NotAcceptableException('Usuário já cadastrado, por favor tente novamente.');
    const newUser = await this.usersService.register(email, password);
    const token = await this.generateToken(newUser);
    const json = { id: newUser.id, email: newUser.email, token };
    return json;
  }

}
