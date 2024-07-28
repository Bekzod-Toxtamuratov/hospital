import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreatorAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.admin.is_creater === false) {
      throw new ForbiddenException({
        message:
          'Ruxsat etilmagan admin oxirgi req.admin.isctivate borib activlashtirib kelsin tezda`',
      });
    }
     return true;
  }
}
