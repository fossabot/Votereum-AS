import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { JwtHelperService }  from '@auth0/angular-jwt';

import { UserService } from '@services/user.service';
import { MatSnackBar } from '@angular/material';

import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { publicModuleStrings, roleConfig }     from '@config/string.config';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    pageStrings: any;
    loginFormGroup: FormGroup;
    canDisableSignInButton: boolean;
    isLoggedIn: any;
    isLoading: boolean;
    helper = new JwtHelperService();
    hidePwd: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.pageStrings = publicModuleStrings;
        this.loginFormGroup = this._formBuilder.group({
            citizendID: ['', Validators.required],
            password: ['', Validators.required],
            keepSignIn: [false]
        });
        this.canDisableSignInButton = false;
        this.hidePwd = true;
    }

    onLogin() {
        // get value of keep sign in check box
        /* this._userService.isKeepSignIn(this.keepSignIn.value); */
        this.isLoading = true;
        this._userService.login(this.citizenID.value, this.password.value)
            .subscribe(
                data => {
                    if (data.token) {
                        // Navigate base on role
                        const decodedToken = this.helper.decodeToken(data.token);
                        if (decodedToken.role === roleConfig.CITIZEN) {
                            this._router.navigate(['/home/voting']);
                        } else if (decodedToken.role === roleConfig.EA) {
                            this._router.navigate(['/ea-admin/management']);
                        } else if (decodedToken.role === roleConfig.RA) {
                            this._router.navigate(['/reg-admin/voter']);
                        }
                        this.isLoading = false;
                    }

                },
                error => {
                    this.isLoading = false;
                    let msg;
                    if (error.status === 504) {
                        msg = 'Something wrong with the server (Status: 504)';
                    } else {
                        msg = error.error.message;
                    }
                    this.snackBar.open(msg , 'Got it', {
                        duration: 3000,
                    });
                }
            );
    }

    onSignUp() {
        this._router.navigate(['/register']);
    }

    get citizenID() {
        return this.loginFormGroup.get('citizendID');
    }

    get password() {
        return this.loginFormGroup.get('password');
    }

    get keepSignIn() {
        return this.loginFormGroup.get('keepSignIn');
    }

    getIdErrorMessage() {
        return this.citizenID.hasError('required') ? 'Mandatory information' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'Mandatory information' : '';
    }

}
