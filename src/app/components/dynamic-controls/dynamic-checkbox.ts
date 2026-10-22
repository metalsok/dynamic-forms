import { Component, ChangeDetectionStrategy } from '@angular/core';
import {DynamicBaseClass, dynamicControlProvider} from '../dynamic-base.class';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-dynamic-checkbox-control',
  imports: [ReactiveFormsModule],
  viewProviders: [dynamicControlProvider],
  changeDetection: ChangeDetectionStrategy.Eager,
  template:`
    <div class="flex gap-2 ">
      <input type="checkbox" [formControlName]="controlKey()" [checked]="config().value">
      <label class="block text-gray-700 font-bold"
             [for]="controlKey()">{{ config().label }}</label>
    </div>`
})
export class DynamicCheckbox extends DynamicBaseClass{

}
