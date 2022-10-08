import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PostsService,
    UsersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
