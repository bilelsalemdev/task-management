import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [],
})
export class CoreModule {}
