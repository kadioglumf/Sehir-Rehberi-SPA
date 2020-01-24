import { CityComponent } from './city/city.component';
import {Routes} from '@angular/router';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helper/auth.guard';
import { LoginComponent } from './login/login.component';

export const appRoutes : Routes = [
    { path: "city", component: CityComponent},
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "city-add", component: CityAddComponent, canActivate:[AuthGuard] },
    { path: "city-detail/:cityId", component: CityDetailComponent },
    { path: "**", redirectTo: "city", pathMatch: "full" }
];

