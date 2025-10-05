import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from './jwt.decorator';
import { UserRole } from '../enum/user.enum';
import { RequestWithUser } from './jwt.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user?.roles) {
      throw new ForbiddenException('User roles not found');
    }

    const hasRole = requiredRoles.some((role) => user.roles!.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Insufficient role');
    }

    // * check if user exists in database
    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    // if (!userExists || userExists.isDeleted) {
    //   throw new ForbiddenException('User not found');
    // }

    // if (!userExists.isActive) {
    //   throw new ForbiddenException('User is not active');
    // }

    return true;
  }
}
