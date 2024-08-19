import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log('req', req.doctor);
    // console.log('req.doctor ', req.doctor);
    // console.log('req.params.id  ', req.params.id);
    if (String(req.doctor.id) != req.params.id) {
      throw new ForbiddenException({
        message: `Ruxsat etilmagan doctor ozini Id siga urinsin borib (yani) ${req.doctor.id} ga`,
      });
    }
    if (req.doctor.is_active === false) {
      throw new ForbiddenException({
        message:
          'Ruxsat etilmagan doctor is_active false borib emelini tasdiqlasin`',
      });
    }
    return true;
  }
}
