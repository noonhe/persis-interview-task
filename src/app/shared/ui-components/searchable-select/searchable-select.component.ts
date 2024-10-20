import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'searchable-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true
    }
  ]
})
export class SearchableSelectComponent implements  OnInit, OnChanges, ControlValueAccessor {
  @Input() label:string;
  @Input() options: any[];
  @ContentChild('triggerTemplate') triggerTemplate!: TemplateRef<any>;
  @ContentChild('optionTemplate') optionTemplate!: TemplateRef<any>;
  searchControl = new FormControl('');
  selectControl = new FormControl();
  filteredOptions: any[];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private value: any;
  disabled = false;

  constructor(){}

  ngOnInit(): void {
    console.log(this.options)
    this.searchControl.valueChanges.pipe(
      map(value => {

       this.filteredOptions = this._filter(value)})
    ).subscribe();

    // Subscribe to select control changes
    this.selectControl.valueChanges.subscribe(value => {
      this.value = value;
      this.onChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.options){
      this.filteredOptions = [...this.options]
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.selectControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.selectControl.disable();
      this.searchControl.disable();
    } else {
      this.selectControl.enable();
      this.searchControl.enable();
    }
  }

  onSelectionChange(event: any): void {
    this.onTouched();
  }

  displaySelectedValue(): string {
    return this.selectControl.value?.name ?? '';
  }

  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase() ?? '';
    return this.options.filter(option => 
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
