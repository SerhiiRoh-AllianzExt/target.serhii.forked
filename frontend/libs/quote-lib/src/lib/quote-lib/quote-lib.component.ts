import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { QuoteResponseDto } from '@target/interfaces';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { QuoteService } from './store/services/quote.service';

@Component({
  selector: 'lib-quote-lib',
  imports: [CommonModule, NxLayoutComponent, NxRowComponent, NxColComponent],
  standalone: true,
  templateUrl: './quote-lib.component.html',
})
export class QuoteLibComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly quoteService = inject(QuoteService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly quoteData = signal<QuoteResponseDto | undefined>(
    undefined
  );

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((query) => query['quoteId']),
        filter(Boolean),
        distinctUntilChanged(),
        switchMap((quoteId) => {
          return this.quoteService.getQuote(quoteId);
        })
      )
      .subscribe((data) => {
        this.quoteData.set(data);
      });
  }
}
