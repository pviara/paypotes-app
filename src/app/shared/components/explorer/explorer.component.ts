import { BehaviorSubject, concat, map, of } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { Filters } from '@core/model/filters/filters';
import { ListElements } from '@core/model/list-element/list-element';

const SKELETONS = Array.from({ length: 20 }).map(() => null);

@Component({
    selector: 'explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    standalone: false,
})
export class ExplorerComponent implements OnInit {
    private nextPageIndex = 0;
    private savedFilters?: Filters;
    private lastFetchedElementsCount = 0;

    $elements = input.required<BehaviorSubject<ListElements>>();
    $displayedElements = new BehaviorSubject<ListElements>([]);
    $noElement = concat(
        of(false),
        this.$displayedElements.pipe(map(this.areNoElement())),
    );

    filtering = false;

    @Output() elementsRequested = new EventEmitter<{
        pageIndex?: number;
        filters?: Filters;
    }>();

    ngOnInit(): void {
        this.handleElementsChange();
        this.prepareList();
        this.requestElements();
    }

    onElementHovered(elementId: string): void {
        if (
            this.isElementNearListEnd(elementId) &&
            this.lastFetchedElementsCount === 20
        ) {
            this.addSkeletonsToList();
            this.requestNextElements();
        }
    }

    onUpdatedFilters(filters: Filters): void {
        this.filtering = true;
        this.resetNextPageIndex();
        this.saveFilters(filters);
        this.prepareList();
        this.requestElements();
    }

    private areNoElement(): (elements: ListElements) => boolean {
        return (elements) => elements.length === 0;
    }

    private resetNextPageIndex(): void {
        this.nextPageIndex = 0;
    }

    private saveFilters(filters: Filters): void {
        this.savedFilters = filters;
    }

    private handleElementsChange(): void {
        this.$elements().subscribe((newElements) => {
            this.filtering = false;
            this.lastFetchedElementsCount = newElements.length;

            this.appendToDisplayedElements(newElements);
        });
    }

    private appendToDisplayedElements(newElements: ListElements): void {
        const displayedElements = this.$displayedElements.getValue();
        const elementsWithoutSkeleton =
            this.removeSkeletonsFrom(displayedElements);

        const elements = elementsWithoutSkeleton.concat(newElements);
        this.$displayedElements.next(elements);
    }

    private prepareList(): void {
        this.emptyList();
        this.addSkeletonsToList();
    }

    private emptyList(): void {
        this.$displayedElements.next([]);
    }

    private addSkeletonsToList(): void {
        const newElements = this.$displayedElements
            .getValue()
            .concat(SKELETONS);

        this.$displayedElements.next(newElements);
    }

    private requestElements(): void {
        this.elementsRequested.emit({
            pageIndex: this.nextPageIndex,
            filters: this.savedFilters,
        });
    }

    private requestNextElements(): void {
        this.nextPageIndex++;
        this.requestElements();
    }

    private isElementNearListEnd(elementId: string): boolean {
        const index = this.findElementIndexWith(elementId);
        const isNearArrayEnd =
            index > this.$displayedElements.getValue().length - 10;
        return isNearArrayEnd;
    }

    private findElementIndexWith(elementId: string): number {
        return this.$displayedElements
            .getValue()
            .findIndex((element) => element?.getId() === elementId);
    }

    private removeSkeletonsFrom(elements: ListElements): ListElements {
        return elements.filter((element) => !!element);
    }
}
