import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-practice-child-component',
  standalone: false,
  templateUrl: './practice-child-component.html',
  styleUrl: './practice-child-component.css',
})
export class PracticeChildComponent {
  @Input() name: string = '';
}
