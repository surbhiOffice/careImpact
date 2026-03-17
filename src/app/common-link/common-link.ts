import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { TruncatePipe } from '../../../pipes/truncate-pipe';
@Component({
  selector: 'app-common-link',
  imports: [],
  templateUrl: './common-link.html',
  styleUrl: './common-link.scss',
})
export class CommonLink {
  params: any;
  api: any;
  cellParams: any;
  cellInit(_params: any, _api: any) {
    this.params = _params;
    this.api = _api;
    this.cellParams = this.params.cellParams;
  }

  onClick() {
    this.api.parentRef.onLineClicked(this.params.data);
  }
}
