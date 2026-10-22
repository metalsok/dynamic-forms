import {Injectable, Injector, inject, Type} from '@angular/core';
import {DynamicControl} from '../models/dynamic-forms.model';
import {defer, Observable, shareReplay} from 'rxjs';
import {pendingUntilEvent} from '@angular/core/rxjs-interop';

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

  private readonly injector = inject(Injector);
  private readonly loadedControlComponents = new Map<string, Observable<Type<any>>>();

  public resolve(controlType: keyof DynamicControlsMap): Observable<Type<any>> {
    let component = this.loadedControlComponents.get(controlType);
    if (!component) {
      component = defer(this.lazyControlComponents[controlType]).pipe(
        // Include lazy imports in Angular's zoneless stability tracking.
        pendingUntilEvent(this.injector),
        shareReplay({bufferSize: 1, refCount: false}),
      );
      this.loadedControlComponents.set(controlType, component);
    }
    return component;
  }
}
