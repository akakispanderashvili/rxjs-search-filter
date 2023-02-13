import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { Item } from './observableInt.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  itemsList = [
    { name: 'car1' },
    { name: 'car2' },
    { name: 'car3' },
    { name: 'car4' },
    { name: 'car5' },
    { name: 'car6' },
    { name: 'car7' },
    { name: 'car8' },
    { name: 'car9' },
    { name: 'car10' },
    { name: 'car11' },
    { name: 'car12' },
    { name: 'car13' },
    { name: 'car14' },
    { name: 'car15' },
    { name: 'car16' },
    { name: 'car17' },
    { name: 'car18' },
    { name: 'car19' },
    { name: 'car20' },
    { name: 'car21' },
    { name: 'car22' },
    { name: 'car23' },
    { name: 'car24' },
    { name: 'car25' },
    { name: 'car26' },
    { name: 'car27' },
    { name: 'car28' },
    { name: 'car29' },
    { name: 'car30' },
    { name: 'car31' },
    { name: 'car32' },
  ];
  visibleItems = [];

  filteredItems$: any;
  itemsPerPage = 8;

  ngAfterViewInit() {
    window.addEventListener('scroll', () => {
      fromEvent(window, 'scroll')
        .pipe(
          map(() => window.scrollY + window.innerHeight),

          map((scrollPosition) => scrollPosition >= document.body.offsetHeight),
          tap((isAtBottom) => console.log('isAtBottom555:', isAtBottom))
        )
        .subscribe((isAtBottom) => {
          if (isAtBottom) {
            this.loadMoreItems();
          }
        });
    });
    const searchInput = fromEvent<any>(
      document.querySelector('.input'),
      'input'
    );

    this.filteredItems$ = searchInput.pipe(
      map((event) => event.target.value),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((searchWord) => this.filterItems(searchWord))
    );

    this.filteredItems$.subscribe((items) => {
      console.log('filtered items:', items);
      this.visibleItems = items.slice(0, this.itemsPerPage);
      console.log('visible items:', this.visibleItems);
    });
  }

  filterItems(searchWord: string): Observable<Item[]> {
    return of(
      this.itemsList.filter((item) =>
        item.name.toLowerCase().includes(searchWord.toLowerCase())
      )
    );
  }

  loadMoreItems() {
    console.log('loadMoreItems called');
    let filteredItems: any;

    this.filteredItems$.subscribe((items) => {
      filteredItems = items;
      const startIndex = this.visibleItems.length;
      const endIndex = startIndex + this.itemsPerPage;
      this.visibleItems = [
        ...this.visibleItems,
        ...filteredItems.slice(startIndex, endIndex),
      ];
      console.log(this.visibleItems, 'ar mush');
    });

    console.log(this.visibleItems, '2');
  }
}
