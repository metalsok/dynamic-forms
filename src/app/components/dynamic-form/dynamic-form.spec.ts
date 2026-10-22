import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroupDirective } from '@angular/forms';
import { DynamicForm, FormTypes } from './dynamic-form';
import registration from '../../../assets/registration-form.json';
import survey from '../../../assets/survey-form.json';

describe('Dynamic form input bindings', () => {
  it('renders both JSON forms, registers nested controls, validates, and switches back', async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicForm],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DynamicForm);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('assets/survey-form.json').flush(survey);
    await fixture.whenStable();
    fixture.detectChanges();

    const getForm = () => fixture.debugElement.query(By.directive(FormGroupDirective))
      .injector.get(FormGroupDirective).form;
    expect(Object.keys(getForm().controls)).toEqual(['satisfaction', 'comments', 'recommend', 'visits']);
    expect(fixture.nativeElement.querySelector('select')).toBeTruthy();
    const surveyForm = getForm();
    const comments = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    expect(comments.rows).toBe(4);
    comments.value = 'Great service';
    comments.dispatchEvent(new Event('input'));
    expect(surveyForm.get('comments')?.value).toBe('Great service');
    surveyForm.get('comments')?.setValue('x'.repeat(501));
    expect(surveyForm.get('comments')?.hasError('maxlength')).toBeTrue();
    surveyForm.get('comments')?.setValue('Great service');

    const visits = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
    expect(visits.value).toBe('1');
    visits.value = '3';
    visits.dispatchEvent(new Event('input'));
    expect(surveyForm.get('visits')?.value).toBe(3);
    surveyForm.get('visits')?.setValue(0);
    expect(surveyForm.get('visits')?.hasError('min')).toBeTrue();
    surveyForm.get('visits')?.setValue(101);
    expect(surveyForm.get('visits')?.hasError('max')).toBeTrue();
    surveyForm.get('visits')?.setValue(3);

    const recommendation = fixture.nativeElement.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(surveyForm.get('recommend')?.hasError('required')).toBeTrue();
    recommendation.click();
    expect(surveyForm.get('recommend')?.value).toBe('yes');
    expect(surveyForm.valid).toBeTrue();

    fixture.componentInstance.formLoadingTrigger.next(FormTypes.REGISTRATION);
    http.expectOne('assets/registration-form.json').flush(registration);
    await fixture.whenStable();
    fixture.detectChanges();

    const form = getForm();
    expect(form.get('socialMediaAccounts.youtube')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[id="youtube"]')).toBeTruthy();
    expect(form.invalid).toBeTrue();
    form.patchValue({ username: 'ab', email: 'invalid', role: 'admin', terms: false });
    expect(form.get('username')?.hasError('minlength')).toBeTrue();
    expect(form.get('email')?.hasError('email')).toBeTrue();
    expect(form.get('terms')?.hasError('required')).toBeTrue();
    form.patchValue({ username: 'alice', email: 'alice@example.com', terms: true });
    expect(form.valid).toBeTrue();

    const username = fixture.nativeElement.querySelector('input[id="username"]') as HTMLInputElement;
    username.value = 'bob';
    username.dispatchEvent(new Event('input'));
    expect(form.get('username')?.value).toBe('bob');

    fixture.componentInstance.formLoadingTrigger.next(FormTypes.SURVEY);
    http.expectOne('assets/survey-form.json').flush(survey);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(Object.keys(getForm().controls)).toEqual(['satisfaction', 'comments', 'recommend', 'visits']);
    expect(fixture.nativeElement.querySelector('input[id="youtube"]')).toBeNull();
    http.verify();
  });
});
