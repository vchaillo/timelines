import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { TimelineEvent } from '../../models/timeline-event';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, AfterViewInit {
  @Input() startDate!: string;
  @Input() endDate!: string;
  @Input() events!: TimelineEvent[];

  @ViewChild('timeline') timeline!: ElementRef;

  ngOnInit(): void {
    this.startDate = '0';
    this.endDate = '2025';
  }

  ngAfterViewInit() {
    // 1. Compute timeline width
    // 2. Compute events positions
    // 3. Manage multiple events on same point
    this.computeTimelineWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.computeTimelineWidth();
  }

  computeTimelineWidth() {
    const width = this.timeline.nativeElement.offsetWidth;
    console.log('Timeline width : ', width, 'px');
  }
}
