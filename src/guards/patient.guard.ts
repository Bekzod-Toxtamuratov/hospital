import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class PatientGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(`Unuathorized  patient`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(`Invalid authorization`);
    }

    async function verify(token: string, jwtService: JwtService) {
      let patient: any;
      try {
        const patient = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEYPatient,
        });
        // const dataDecoded = await jwtService.decode(token, {
        //   // secret: process.env.ACCESS_TOKEN_KEY,
        // });
        // console.log('decoded: ', dataDecoded);

        if (!patient) {
          throw new UnauthorizedException(`Unuathorized  patient`);
        }
        if (!patient.is_active) {
          throw new UnauthorizedException(`patientr is not active`);
        }
        console.log('patient  ', patient);
        req.patient = patient;

        // console.log('req.patient', req.patient);

        return true;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return verify(token, this.jwtService);
  }
}
