import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-error-field',
    templateUrl: './error-field.component.html',
    styleUrls: ['./error-field.component.scss']
})
export class ErrorFieldComponent {
    @Input() errorCode: ValidationErrors;

    constructor() { }

    validationMessage: any = {
        required: 'Mandatory information',
        minlength: 'You must provide at least 2 characters for this field',
        pattern: 'Only number is allowed',
        regPhaseMismatch: 'regPhaseMismatch'
    };

    getErrorMessage(): string {
        let errorMessages = [];

        errorMessages = Object.keys(this.errorCode).map(key => this.validationMessage[key]);

        return errorMessages[0];
    }

    isEmptyError(): boolean {
        if (this.errorCode) {
            return Object.keys(this.errorCode).length === 0;
        }

        return true;
    }
}
