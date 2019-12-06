import { Component, EventEmitter, OnChanges, Output } from "@angular/core";


interface SortCriteria { attrName: string, isDescending: boolean };
@Component({
    selector : 'app-bug-sort',
    template : `
         <div class="sort">
            <label for="">Order By :</label>
            <select (change)="onSortAttrChange($event.target.value)" >
                <option value="name">Name</option>
                <option value="isClosed">Status</option>
            </select>
            <label for="">Descending ?: </label>
            <input type="checkbox" (change)="onSortOrderChange($event.target.checked)" >
        </div>
    `
})
export class BugSortComponent{
   
    
    sortCriteria : SortCriteria = { attrName : '', isDescending : false};

    @Output()
    criteriaChange: EventEmitter<SortCriteria> = new EventEmitter<SortCriteria>();
    
    onSortAttrChange(attrName : string){
        this.sortCriteria.attrName = attrName;
        this.criteriaChange.emit(this.sortCriteria);
    }

    onSortOrderChange(isDescending : boolean){
        this.sortCriteria.isDescending = isDescending;
        this.criteriaChange.emit(this.sortCriteria);
    }

   

   
}