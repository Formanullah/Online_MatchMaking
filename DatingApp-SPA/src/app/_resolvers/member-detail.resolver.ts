import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private aleritify: AlertifyService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // tslint:disable-next-line:no-string-literal
        return this.userService.getUser(route.params['id']).pipe(
            catchError( error => {
                this.aleritify.error('problem retriving Data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
