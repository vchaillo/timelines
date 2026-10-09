import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, Category, ERAS, EVENTS, HistoricalEvent } from './events';
@Component({ selector: 'app-root', standalone: true, imports: [FormsModule], templateUrl: './app.component.html' })
export class AppComponent {
  categories = CATEGORIES;
  eras = ERAS;
  activeCategories = signal<Category[]>(['war','politics','nature']);
  era = signal('all');
  query = signal('');
  reverse = signal(false);
  favoritesOnly = signal(false);
  selected = signal<HistoricalEvent | null>(null);
  favorites = signal<string[]>(this.readFavorites());
  filtered = computed(() => {
    const era = ERAS.find(item => item.id === this.era())!;
    const query = this.normalize(this.query());
    const events = EVENTS.filter(event => this.activeCategories().includes(event.category)
      && event.start <= era.max && (event.end ?? (event.id === 'event-23' ? Infinity : event.start)) >= era.min
      && (!this.favoritesOnly() || this.favorites().includes(event.id))
      && this.normalize(`${event.title} ${event.start} ${event.end ?? ""} ${event.location} ${event.summary}`).includes(query));
    return events.sort((a,b) => this.reverse() ? b.start-a.start : a.start-b.start);
  });
  normalize(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
  readFavorites(): string[] { try { const value = JSON.parse(localStorage.getItem('timelines-favorites') ?? '[]'); return Array.isArray(value) ? value.filter(id => EVENTS.some(event => event.id === id)) : []; } catch { return []; } }
  category(id: Category) { return CATEGORIES.find(category => category.id === id)!; }
  year(year: number) { return year < 0 ? `${Math.abs(year)} av. J.-C.` : `${year}`; }
  dates(event: HistoricalEvent) { return event.end ? `${this.year(event.start)} — ${this.year(event.end)}` : `${this.year(event.start)}${event.id === 'event-23' ? ' — aujourd’hui' : ''}`; }
  toggleCategory(id: Category) { this.activeCategories.update(values => values.includes(id) ? values.filter(value => value !== id) : [...values,id]); }
  toggleFavorite(event: HistoricalEvent) { this.favorites.update(values => values.includes(event.id) ? values.filter(id => id !== event.id) : [...values,event.id]); try { localStorage.setItem('timelines-favorites',JSON.stringify(this.favorites())); } catch {} }
  reset() { this.activeCategories.set(['war','politics','nature']); this.era.set('all'); this.query.set(''); this.favoritesOnly.set(false); }
  surprise() { const events=this.filtered(); if(events.length) this.open(events[Math.floor(Math.random()*events.length)]); }
  open(event: HistoricalEvent) { this.selected.set(event); const dialog=document.querySelector<HTMLDialogElement>('#event-dialog'); dialog?.showModal(); }
  close() { document.querySelector<HTMLDialogElement>('#event-dialog')?.close(); this.selected.set(null); }
  navigate(direction: number) { const events=this.filtered(); const index=events.findIndex(event => event.id === this.selected()?.id); const next=events[index+direction]; if(next) this.selected.set(next); }
  selectedIndex() { return this.filtered().findIndex(event => event.id === this.selected()?.id); }
  jump(year: number) { const event=this.filtered().find(event => this.reverse() ? event.start <= year : event.start >= year); if(event) document.getElementById(event.id)?.scrollIntoView({behavior:'smooth',block:'center'}); }
  group(event: HistoricalEvent) { return event.start < 476 ? 'Antiquité' : event.start < 1492 ? 'Moyen Âge' : event.start < 1789 ? 'Époque moderne' : 'Époque contemporaine'; }
}
