import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    // App modules
    CoreModule,
    SharedModule,
    AppRoutingModule, // Should be imported after feature modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
