import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfPatientGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (String(req.patient.id) != req.params.id) {
      throw new ForbiddenException({
        message: `Ruxsat etilmagan patient ozini Id siga urinsin borib (yani) ${req.patient.id} ga`,
      });
    }
    if (req.patient.is_active === false) {
      throw new ForbiddenException({
        message:
          'Ruxsat etilmagan patient is_active false borib emelini tasdiqlasin`',
      });
    }
    return true;
  }
}
