import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService }         from '@app/core/services/user.service';
import { roleConfig }          from '@config/string.config';
@Injectable()
export class EaGuard implements CanActivate {
    constructor (private _router: Router,
        private _userService: UserService) { }

    canActivate(): boolean {
        /* TODO: check if user's role is election admin or not */
        if (this._userService.getRole() !== roleConfig.EA) {
            this._router.navigate(['/ea-admin/unauthorized']);
            /* navigate to unauthorized page */
            return false;
        }
        return true;
    }
}
