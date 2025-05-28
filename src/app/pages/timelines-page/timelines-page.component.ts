import { Component, OnInit } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { Label } from '../../models/label';
import { TimelineEvent } from '../../models/timeline-event';

@Component({
  selector: 'app-timelines-page',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './timelines-page.component.html',
  styleUrl: './timelines-page.component.scss'
})
export class TimelinesPageComponent implements OnInit {
  today!: string;
  activeLabels: Label[] = [];
  activeEvents: TimelineEvent[] = [];

  ngOnInit(): void {
    // 1. Get today
    this.today = '2025-05-27';
  }

  labels: Label[] = [
    {
      name: 'personal',
      color: 'cornflowerblue',
    },
    {
      name: 'work',
      color: 'crimson',
    },
    {
      name: 'france',
      color: 'darkcyan',
    },
    {
      name: 'history',
      color: 'gold',
    },
    {
      name: 'science',
      color: 'coral',
    },
  ];

  events: TimelineEvent[] = [
    {
      name: 'Birth',
      color: 'coral',
      labels: [this.labels[2]],
      startDate: '1989-10-20',
    },
    {
      name: 'La Poste',
      color: 'gold',
      labels: [this.labels[2]],
      startDate: '2008-09-01',
      endDate: '2013-06-01',
    },
    {
      name: 'Stephane Plaza Immobiler',
      color: 'crimson',
      labels: [this.labels[1], this.labels[2]],
      startDate: '2019-03-01',
      endDate: '2023-02-01',
    },
    {
      name: 'Groupe Bellon',
      color: 'cornflowerblue',
      labels: [this.labels[1]],
      startDate: '2024-04-01',
      endDate: '2025-02-01',
    },
  ];

  addLabel(label: Label) {
    if (!this.activeLabels.includes(label)) {
      this.activeLabels.push(label);
      this.filterEventsByLabels();
    }
  }

  removeLabel(label: Label) {
    this.activeLabels = this.activeLabels.filter(activeLabel => activeLabel !== label);
    this.filterEventsByLabels();
  }

  filterEventsByLabels() {
    if (this.activeLabels.length === 0) {
      this.activeEvents = this.events;
    }

    this.activeEvents = this.events.filter(event =>
      event.labels.some(label => this.activeLabels.includes(label))
    );
  }
}
