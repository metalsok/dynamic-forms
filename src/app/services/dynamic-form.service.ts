import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DynamicFormsConfig} from '../models/dynamic-forms.model';
import {FormTypes} from '../components/dynamic-form/dynamic-form';

@Injectable()
export class DynamicFormService {
  private httpClient = inject(HttpClient)

  getForm(config:FormTypes) {
    return this.httpClient.get<DynamicFormsConfig>(`assets/${config}-form.json`)
  }
}
