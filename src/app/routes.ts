import { CityComponent } from './city/city.component';
import { ValueComponent } from './value/value.component';
import {Routes} from '@angular/router';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helper/auth.guard';
import { LoginComponent } from './login/login.component';

export const appRoutes : Routes = [
    { path: "city", component: CityComponent ,canActivate:[AuthGuard]},
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "cityadd", component: CityAddComponent,canActivate:[AuthGuard] },
    { path: "value", component: ValueComponent ,canActivate:[AuthGuard]},
    { path: "cityDetail/:cityId", component: CityDetailComponent ,canActivate:[AuthGuard]},
    { path: "**", redirectTo: "city", pathMatch: "full" }
];

