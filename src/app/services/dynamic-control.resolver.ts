import {Injectable, Type} from '@angular/core';
import {DynamicControl} from '../models/dynamic-forms.model';
import {from, of, tap} from 'rxjs';

type DynamicControlsMap = { [T in DynamicControl['controlType']]: () => Promise<Type<any>> };

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {
  private lazyControlComponents: DynamicControlsMap = {
    input: () => import('../components/dynamic-controls/dynamic-input').then(c => c.DynamicInput),
    select: () => import('../components/dynamic-controls/dynamic-select').then(c => c.DynamicSelect),
    checkbox: () => import('../components/dynamic-controls/dynamic-checkbox').then(c => c.DynamicCheckbox),
    textarea: () => import('../components/dynamic-controls/dynamic-textarea').then(c => c.DynamicTextarea),
    radio: () => import('../components/dynamic-controls/dynamic-radio').then(c => c.DynamicRadio),
    number: () => import('../components/dynamic-controls/dynamic-number').then(c => c.DynamicNumber),
    group: () => import('../components/dynamic-group/dynamic-group').then(c => c.DynamicGroup),
   // array:()=>import('')
  }

  private loadedControlComponents = new Map<string, Type<any>>()

  public resolve(controlType: keyof DynamicControlsMap) {
    const loadedComponent = this.loadedControlComponents.get(controlType)

    if (loadedComponent) return of(loadedComponent)


    return from(this.lazyControlComponents[controlType]()).pipe(tap(component => this.loadedControlComponents.set(controlType, component)))
  }

}
