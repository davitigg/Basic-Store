import { Injectable } from '@angular/core';
import {
  FormControl
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  constructor() {}

  validatorNoWhiteSpaces(fc: FormControl): any {
    const value = fc.value as string;
    const isWhitespace = value.indexOf(' ') >= 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  validatorOnlyWhiteSpaces(fc: FormControl) {
    const value = fc.value as string;
    const isWhitespace = value.trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
