import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Inject ToastrService into the validator function
export function customValidation(toastr: ToastrService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errors: ValidationErrors = {};

    const assignedTo = control.get('assignedTo')?.value;
    const deviceComment = control.get('deviceComment')?.value;
    const cygid = control.get('cygid')?.value;
    const softwareComment = control.get('softwareComment')?.value;
    const softwareId = control.get('softwareId')?.value;
    const selectedAccessory = control.get('selectedAccessory')?.value;
    const accessoryComment = control.get('accessoryComment')?.value;

    if (!assignedTo) {
      errors['assignedTo'] = 'CGI ID is required.';
      // Only show Toastr error when the save function is called
      if (control.touched && control.dirty) {
        toastr.error(errors['assignedTo']);
      }
    }
    if (deviceComment && !cygid) {
      errors['cygidRequired'] = 'Cygid is required when Device Comment has a value.';
      // Directly show Toastr error
      if (control.touched && control.dirty) 
      toastr.error(errors['cygidRequired']);
    }

    if (softwareComment && !softwareId) {
      errors['softwareIdAndAssignedToRequired'] =
        'Software ID and Assigned To are required when Software Comment has a value.';
      // Directly show Toastr error
      if (control.touched && control.dirty) 
      toastr.error(errors['softwareIdAndAssignedToRequired']);
    }

    if (accessoryComment && !selectedAccessory) {
      errors['selectedAccessoryRequired'] =
        'Selected Accessory is required when Accessory Comment has a value.';
      // Directly show Toastr error
      if (control.touched && control.dirty) 
      toastr.error(errors['selectedAccessoryRequired']);
    }

    //console.log('Custom Validation Errors:', errors); // Log the errors

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
