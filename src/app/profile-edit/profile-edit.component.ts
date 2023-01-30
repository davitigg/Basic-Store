import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticatedResponse } from '../_interfaces/authenticated-response';
import { TokenService } from '../_services/token.service';
import { UserModel } from '../_interfaces/user-model';
import { CustomValidatorService } from '../_services/custom-validator.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
  form: FormGroup;
  isSubmitted = false;
  user: UserModel;
  decodedToken = this.tokenService.getDecodedToken();
  invalidUpdate: boolean | undefined;
  invalidUpdateMessage: string | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private customValidator: CustomValidatorService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {
    // gets user info
    this.user = {
      email: this.decodedToken.email,
      password: '',
      fname: this.decodedToken.firstname,
      lname: this.decodedToken.lastname,
    };

    this.form = this.fb.group({
      email: [
        this.user?.email,
        [
          Validators.required,
          Validators.email,
          customValidator.validatorNoWhiteSpaces,
        ],
      ],
      password: [
        this.user?.password,
        [
          Validators.minLength(6),
          Validators.maxLength(50),
          customValidator.validatorNoWhiteSpaces,
        ],
      ],
      fname: [
        this.user?.fname,
        [Validators.required, customValidator.validatorNoWhiteSpaces],
      ],
      lname: [
        this.user?.lname,
        [Validators.required, customValidator.validatorNoWhiteSpaces],
      ],
    });
  }

  update(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid && form.dirty) {
      var updatedUser: UserModel = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        fname: this.form.get('fname')?.value,
        lname: this.form.get('lname')?.value,
      };
      this.http
        .put<AuthenticatedResponse>(
          'https://localhost:5001/api/auth/UpdateUser',
          updatedUser,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            this.user = updatedUser;
            const token = response.token;
            localStorage.setItem('jwt', token);
            this.isSubmitted = false;
            alert('მონაცემები წარმატებით შეინახა!');
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.invalidUpdate = true;
            this.invalidUpdateMessage = err.error;
            if (err.status == 409) {
              this.form.get('username')?.setErrors({ notUnique: true });
              alert(this.invalidUpdateMessage);
            }
          },
        });
    }
  }

  resetForm() {
    this.form.get('email')!.setValue(this.user.email);
    this.form.get('password')!.setValue('');
    this.form.get('fname')!.setValue(this.user.fname);
    this.form.get('lname')!.setValue(this.user.lname);

    this.form.markAsPristine();
  }

  getInputStyle(s: string) {
    var dict: any = {};

    if (this.form.get(s)?.dirty) {
      dict['color'] = 'black';
      dict['border-color'] = 'blue';
    }

    if (this.form.get(s)?.errors && this.isSubmitted) {
      dict['border-color'] = 'red';
    }
    return dict;
  }
}
