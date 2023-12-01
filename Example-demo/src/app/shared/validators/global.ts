import { AbstractControl, ValidationErrors } from '@angular/forms';

// export function NoWhitespaceValidator() {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const { value: controlVal } = control;
//     const isWhiteSpaceOnly = (controlVal || '').trim().length === 0;
//     return isWhiteSpaceOnly ? { whitespace: 'value is only whitespace' } : null;
//   };
// }

export function NoWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const isWhiteSpaceOnly = (control.value || '').trim().length === 0;
  return isWhiteSpaceOnly ? { whitespace: 'value is only whitespace' } : null;
}
