import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { authTokenInterceptor } from '../interceptors/auth-token.interceptor';
import { correlationIdInterceptor } from '../interceptors/correlation-id.interceptor';
import { errorHandlingInterceptor } from '../interceptors/error-handling.interceptor';

export function provideErpHttpClient(): (Provider | EnvironmentProviders)[] {
  return [
    provideHttpClient(
      withInterceptors([
        correlationIdInterceptor,
        authTokenInterceptor,
        errorHandlingInterceptor,
      ]),
      withInterceptorsFromDi(),
    ),
  ];
}
