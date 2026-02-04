import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ What roles does this route need?
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true; // no role restriction

    // 2️⃣ Get logged-in user
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 3️⃣ Compare
    return requiredRoles.includes(user.role);
  }
}
