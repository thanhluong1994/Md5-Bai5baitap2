import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {
message = '';
remainingTime: number;
@Input()
seconds = 10;
@Output()
finish = new EventEmitter<boolean>();
private intervalId = 0;

ngOnChanges(changes: SimpleChanges) {
  if ('second' in changes) {
    let v = changes.seconds.currentValue;
    v = typeof v === 'undefined' ? 10 : v;
    const vFixed = Number(v);
    this.seconds = Number.isNaN(vFixed) ? 10 : v;
  }
}
clearTime() {
  clearInterval(this.intervalId);
}
 ngOnInit() {
  this.reset();
  }
ngOnDestroy() {
  this.clearTime();
}
start() {
  this.countDown();
  if (this.remainingTime <= 0) {
    this.remainingTime = this.seconds;
  }
}
stop() {
  this.clearTime();
  this.message = `Holding at T-${this.remainingTime} seconds`;
}
reset() {
  this.clearTime();
  this.remainingTime = this.seconds;
  this.message = `Nhan nut start de bat dau`;
}
private countDown() {
  this.clearTime();
  this.intervalId = window.setInterval(() => {
    this.remainingTime -= 1;
    if (this.remainingTime === 0) {
      this.message = 'Da xong !';
      this.clearTime();
      this.finish.emit(true);
    } else {
      this.message = `T-${this.remainingTime} second and counting`;
    }
  }, 1000);
}
}
