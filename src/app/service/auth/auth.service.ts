import { Injectable } from '@angular/core';
import { map, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginPayload } from './payload/login-payload';
import { fromValidate } from '../../../helper/from-validate';
import { transformAndValidate } from '../../../helper/transform-and-validate';
import { Session } from './entity/session';
import { User } from './entity/user';
import { storage } from '../../../helper/storage';
import { ReplaySubject } from 'rxjs';
import { RegisterPayload } from './payload/register-payload';
import { ResetPasswordPayload } from './payload/reset-password-payload';
import { Verbose } from '../../../helper/verbose';
import { ValidationErrors } from '../../../helper/validation-errors';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new ReplaySubject(1);
  authState = this.user.pipe(map(Boolean), shareReplay(1));

  constructor(private readonly httpClient: HttpClient) {
    this.bootstrap().catch(Verbose.error);
  }

  getAuth() {
    return this.httpClient.get<object>('/session').pipe(
      transformAndValidate(User),
      tap(user => this.user.next(user)),
      share(),
    );
  }

  createSession(payload: LoginPayload) {
    return fromValidate(LoginPayload, payload).pipe(
      switchMap(body => this.httpClient.post<object>('/session', body)),
      transformAndValidate(Session),
      switchMap(() => this.getAuth()),
      share(),
    );
  }

  createUser(payload: RegisterPayload) {
    return fromValidate(RegisterPayload, payload).pipe(
      switchMap(body => this.httpClient.post<object>('/user', body)),
      transformAndValidate(User),
      switchMap(() => this.createSession({email: payload.email, password: payload.password})),
      share(),
    );
  }

  resetPassword(payload: ResetPasswordPayload) {
    return fromValidate(ResetPasswordPayload, payload).pipe(
      switchMap(body => this.httpClient.post<void>('/reset-password', body)),
      share(),
    );
  }

  private async bootstrap() {
    try {
      await fromValidate(Session, storage).toPromise();
      await this.getAuth().toPromise();
    } catch (e) {
      if (
        e instanceof ValidationErrors ||
        e instanceof HttpErrorResponse && e.status === 401
      ) {
        this.user.next(null);
      } else {
        throw e;
      }
    }
  }
}
