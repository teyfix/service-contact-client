import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit {
  @HostBinding('class.text-muted')
  textMutedClass = true;

  constructor() {
  }

  ngOnInit() {
  }

}
