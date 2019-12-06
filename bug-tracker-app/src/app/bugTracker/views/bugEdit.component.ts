import { Component, EventEmitter, Output } from '@angular/core';
import { BugOperationsService } from '../services/bugOperations.service';
import { Bug } from '../models/Bug';

@Component({
    selector : 'app-bug-edit',
    template :  `
        <div class="edit">
            <label for="">Bug Name :</label>
            <input type="text" (keyup) = "newBugName = $event.target.value"  >
            <span> [ {{newBugName.length}} ] </span>
            <input type="button" value="Add New" (click)="onAddNewClick()" >
        </div>
    `
})
export class BugEditComponent{
    newBugName = '';

    @Output()
    bugAdded : EventEmitter<Bug> = new EventEmitter<Bug>();

    constructor(private bugOperations : BugOperationsService){

    }

    onAddNewClick() {
        const newBug = this.bugOperations.createNew(this.newBugName);
        //this.bugs.push(newBug);
        //this.bugs = [...this.bugs, newBug];
        this.bugAdded.emit(newBug);
    }
}