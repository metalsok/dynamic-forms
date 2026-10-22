import {Directive, HostBinding, inject, input, OnInit, StaticProvider} from '@angular/core';
import {AbstractControl, ControlContainer, FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicControl} from '../models/dynamic-forms.model';

export const dynamicControlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => {
    return inject(ControlContainer, {skipSelf: true})
  }
}

@Directive()
export class DynamicBaseClass implements OnInit {
  @HostBinding('class') hostClass = 'form-field'

  public readonly controlKey = input.required<string>()
  public readonly config = input.required<DynamicControl>()


  protected formControl!: AbstractControl
  private parentContainer = inject(ControlContainer)

  ngOnInit(): void {
    this.formControl = this.createControl();
    (this.parentContainer.control as FormGroup).addControl(this.controlKey(), this.formControl);
  }

  protected createControl(): AbstractControl {
    const config = this.config()
    return new FormControl(config.value, this.resolveValidators(config))
  }

  private resolveValidators({validators = {}}: DynamicControl) {
    return (Object.keys(validators) as Array<keyof typeof validators>).map(validatorKey => {

      const validatorValue = validators[validatorKey]

      if (validatorKey === 'required') {
        return Validators.required
      }
      if (validatorKey === 'email') {
        return Validators.email
      }
      if (validatorKey === 'requiredTrue') {
        return Validators.requiredTrue
      }
      if (validatorKey === 'minLength' && typeof validatorValue === "number") {
        return Validators.minLength(validatorValue)
      }
      if (validatorKey === 'maxLength' && typeof validatorValue === "number") {
        return Validators.maxLength(validatorValue)
      }
      if (validatorKey === 'min' && typeof validatorValue === "number") {
        return Validators.min(validatorValue)
      }
      if (validatorKey === 'max' && typeof validatorValue === "number") {
        return Validators.max(validatorValue)
      }
      return Validators.nullValidator
    })
  }


}
