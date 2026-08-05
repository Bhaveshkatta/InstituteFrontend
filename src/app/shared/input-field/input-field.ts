import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  signal,
  computed,
  Host,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ControlContainer,
  FormGroupDirective,
  NgControl
} from '@angular/forms';
import { SHARED_IMPORTS } from '../shared.imports';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() set value(v: any) {
    this.val.set(v ?? '');
  }
  get value(): any {
    return this.val();
  }
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea' | 'date' | 'select' = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() hint: string = '';
  @Input() helperText: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() min: number | string | null = null;
  @Input() max: number | string | null = null;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() pattern: string | null = null;
  @Input() rows: number = 4;
  @Input() options: SelectOption[] = [];
  @Input() customValidationMessages: Record<string, string> = {};
  @Input() formControlName: string = '';

  val = signal<any>('');
  isTouched = signal<boolean>(false);
  hidePassword = signal<boolean>(true);

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  get control() {
    if (this.controlContainer && this.formControlName) {
      return this.controlContainer.control?.get(this.formControlName);
    }
    return null;
  }

  get showErrors(): boolean {
    const c = this.control;
    return !!(c && c.invalid && (c.touched || this.isTouched()));
  }

  get errorMessage(): string {
    const c = this.control;
    if (!c || !c.errors) return '';

    const errorKey = Object.keys(c.errors)[0];
    if (this.customValidationMessages && this.customValidationMessages[errorKey]) {
      return this.customValidationMessages[errorKey];
    }

    const err = c.errors[errorKey];
    const fieldName = this.label || 'This field';

    switch (errorKey) {
      case 'required':
        return `${fieldName} is required.`;
      case 'email':
        return `Please enter a valid email address.`;
      case 'minlength':
        return `${fieldName} must be at least ${err.requiredLength} characters.`;
      case 'maxlength':
        return `${fieldName} cannot exceed ${err.requiredLength} characters.`;
      case 'min':
        return `${fieldName} must be at least ${err.min}.`;
      case 'max':
        return `${fieldName} cannot exceed ${err.max}.`;
      case 'pattern':
        return `Invalid format for ${fieldName}.`;
      case 'passwordMismatch':
        return `Passwords do not match.`;
      default:
        return `${fieldName} is invalid.`;
    }
  }

  writeValue(value: any): void {
    this.val.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const value = target.value;
    this.val.set(value);
    this.onChange(value);
  }

  handleSelectChange(value: any): void {
    this.val.set(value);
    this.onChange(value);
  }

  handleBlur(): void {
    this.isTouched.set(true);
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update(v => !v);
  }
}
