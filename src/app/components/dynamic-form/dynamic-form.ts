import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {DynamicFormService} from '../../services/dynamic-form.service';
import {DynamicFormsConfig} from '../../models/dynamic-forms.model';
import {map, Observable, Subject, switchMap} from 'rxjs';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, KeyValuePipe, NgComponentOutlet} from '@angular/common';
import {DynamicControlResolver} from '../../services/dynamic-control.resolver';

export enum FormTypes {
  REGISTRATION = 'registration',
  SURVEY = 'survey'
}

@Component({
  selector: 'app-example-form',
  imports: [
    AsyncPipe,
    KeyValuePipe,
    ReactiveFormsModule,
    NgComponentOutlet,
  ],
  templateUrl: './dynamic-form.html',
  providers: [DynamicFormService]
})
export class DynamicForm implements OnInit, AfterViewInit {
  formLoadingTrigger = new Subject<FormTypes>()
  public controlResolver = inject(DynamicControlResolver)
  protected readonly FormTypes = FormTypes;
  protected formConfig$!: Observable<{ form: FormGroup, config: DynamicFormsConfig }>
  private exampleService = inject(DynamicFormService);

  ngAfterViewInit(): void {
    this.formLoadingTrigger.next(FormTypes.SURVEY)
  }

  ngOnInit(): void {
    this.formConfig$ = this.formLoadingTrigger.pipe(
      switchMap(config => this.exampleService.getForm(config)),
      map((config) => ({form: new FormGroup({}), config})))
  }
}
