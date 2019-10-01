import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {
  constructor() {}

  @ViewChild('progressInput', null) progressInput: ElementRef;

  @Input() title: string = 'Legend';
  @Input() progress: number = 50;

  @Output() updateValue: EventEmitter<number> = new EventEmitter();

  ngOnInit() {}

  onChange(newValue: number) {
    if (newValue < 0) {
      this.progress = 0;
    } else if (newValue > 100) {
      this.progress = 100;
    } else {
      this.progress = newValue;
    }
    this.progressInput.nativeElement.value = this.progress;
    this.updateValue.emit(this.progress);
  }

  changeValue(value: number) {
    if (this.progress + value < 0) {
      this.progress = 0;
    } else if (this.progress + value > 100) {
      this.progress = 100;
    } else {
      this.progress += value;
      this.updateValue.emit(this.progress);
      this.progressInput.nativeElement.focus();
    }
  }
}
