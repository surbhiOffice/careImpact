import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  InputConfig,
  SearchBoxComponent,
  SearchConfig,
  SingleSelectComponent,
  SingleSelectConfig,
} from 'cats-ui-lib';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SearchBoxComponent, SingleSelectComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  options = [
    { id: '1', name: 'SelectAll' },
    { id: '2', name: 'RPM' },
    { id: '3', name: 'CCM' },
  ];

  searchConfig: SearchConfig = {
    serachValue: '',
    placeholder: 'Search by Task ID , Task Type or Patient Name',
  };

  inputConfigText: InputConfig = {
    type: 'text',
    placeholder: 'Enter value',
  };

  onInputSelectiontext(selected: any) {
    const selectedType = selected?.value;
    this.inputConfigText = {
      ...this.inputConfigText,
      type: selectedType,
    };
  }
  singleConfig: SingleSelectConfig = {
    idField: 'id',
    textField: 'name',
    disabledField: 'disable',
    placeholder: 'Select Option',
    prefixLabel: 'Service',
  };
}
