import {Component, HostBinding, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DynamicBaseClass, dynamicControlProvider} from '../dynamic-base.class';
import {AsyncPipe, KeyValuePipe, NgComponentOutlet} from '@angular/common';
import {DynamicControlResolver} from '../../services/dynamic-control.resolver';

@Component({
  selector: 'app-dynamic-group',
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    NgComponentOutlet,
    AsyncPipe,
  ],
  viewProviders: [dynamicControlProvider],
  template: `
    <fieldset [formGroupName]="controlKey()" class="p-4 border border-gray-400 rounded bg-gray-50">
      <legend>{{ config().label }}</legend>
      @if (config().controls) {
        @for (control of config().controls | keyvalue; track control.key) {
          <ng-container [ngComponentOutlet]="controlResolver.resolve(control.value.controlType) | async"
                        [ngComponentOutletInputs]="{ controlKey: control.key, config: control.value }"></ng-container>
        }
      }
    </fieldset>
  `,
})
export class DynamicGroup extends DynamicBaseClass {
  @HostBinding('class') override hostClass = 'form-field-group'
  public controlResolver = inject(DynamicControlResolver)
  protected override createControl(): FormGroup {
    return new FormGroup({})
  }

}
