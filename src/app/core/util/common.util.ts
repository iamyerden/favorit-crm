import {FormControl} from '@angular/forms';

export default class CommonUtil {
    title;
    message;

    constructor() {
    }

    static isEmpty(value: any): boolean {
        return value !== null && value !== undefined && value !== '';
    }
}

export function EmailValidator(confirmEmailInput: string) {
    let confirmEmailControl: FormControl;
    let emailControl: FormControl;

    return (control: FormControl) => {
        if (!control.parent || confirmEmailInput !== null) {
            return null;
        }

        if (!confirmEmailControl) {
            confirmEmailControl = control;
            emailControl = control.parent.get(confirmEmailInput) as FormControl;
            emailControl.valueChanges.subscribe(() => {
                confirmEmailControl.updateValueAndValidity();
            });
        }

        if (
            emailControl.value.toLocaleLowerCase() !==
            confirmEmailControl.value.toLocaleLowerCase()
        ) {
            return {
                notMatch: true
            };
        }
        return null;
    };
}

export function PasswordValidator(confirmPasswordInput: string) {
    let confirmPasswordControl: FormControl;
    let passwordControl: FormControl;

    return (control: FormControl) => {
        if (!control.parent) {
            return null;
        }

        if (!confirmPasswordControl) {
            confirmPasswordControl = control;
            passwordControl = control.parent.get(confirmPasswordInput) as FormControl;
            passwordControl.valueChanges.subscribe(() => {
                confirmPasswordControl.updateValueAndValidity();
            });
        }

        if (
            passwordControl.value !==
            confirmPasswordControl.value
        ) {
            return {
                notMatch: true
            };
        }
        return null;
    };
}
