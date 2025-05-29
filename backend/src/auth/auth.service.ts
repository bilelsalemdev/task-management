import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; access_token: string }> {
    const { email, firstName, lastName, password } = registerDto;

    // Check if user exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Create new user
    const user = this.usersRepository.create({
      email,
      firstName,
      lastName,
      password,
    });

    await this.usersRepository.save(user);

    // Generate JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>; access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      access_token,
    };
  }

  async validateUser(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id, isActive: true } });
  }
} 