import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
// import { JwtAuthGuard, RolesGuard } from './jwt.guard';
import { RequestWithUser } from './jwt.interface';
import { UserRole } from '../enum/user.enum';
import { JwtAuthGuard, RolesGuard } from './jwt.guard';

export const ROLES_KEY = 'roles';
export const IS_PUBLIC_KEY = 'isPublic';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export function MakePublic() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

export const GetUser = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return key ? user?.[key] : user;
  },
);

export function ValidateAuth(...roles: UserRole[]) {
  const decorators = [UseGuards(JwtAuthGuard, RolesGuard)];
  if (roles.length > 0) {
    decorators.push(Roles(...roles));
  }
  return applyDecorators(...decorators);
}

export function ValidateSuperAdmin() {
  return ValidateAuth(UserRole.SUPER_ADMIN);
}

export function ValidateAdmin() {
  return ValidateAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN);
}

export function ValidateUser() {
  return ValidateAuth(UserRole.USER, UserRole.SUPER_ADMIN);
}
