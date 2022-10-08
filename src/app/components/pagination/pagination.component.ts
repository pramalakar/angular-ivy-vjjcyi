import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

// Service

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Input() perPage: number = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];
  public itemsToDisplay: number[] = [];

  constructor() {}

  ngOnInit() {
    this.itemsToDisplay = this.getPages(this.current, this.perPage);
  }

  public onGoTo(page: number): void {
    this.current = page;
    this.itemsToDisplay = this.getPages(this.current, this.perPage);
    this.goTo.emit(page);
  }
  public onNext(): void {
    console.log('onNext Pagination: ' + this.current);
    this.pages = this.getPages(this.current, this.perPage);
    this.next.emit(this.current);
  }
  public onPrevious(): void {
    console.log('onPrev Pagination: ' + this.current);
    this.pages = this.getPages(this.current, this.perPage);
    this.previous.next(this.current);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = [...Array(this.total).keys()].map((x) => ++x);
    console.log('pages: ' + this.pages);
    if (
      (changes.current && changes.current.currentValue) ||
      (changes.total && changes.total.currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
      console.log(this.itemsToDisplay);
    }
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
