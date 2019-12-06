import { Component } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';


@Component({
    selector : 'app-bug-tracker',
    template : `
        <section >
            <app-bug-stats [data]="bugs"></app-bug-stats>
           
            <div class="search">
                <label for="">Search :</label>
                <input type="text" >
                <label for="">Closed ? :</label>
                <input type="checkbox" >
                <input type="button" value="Clear" >
            </div>
            <app-bug-sort (criteriaChange)="sortCriteria = $event"></app-bug-sort>
            <app-bug-edit (bugAdded)="onNewBugAdded($event)"></app-bug-edit>
            <div class="list">
                <ol>
                    <li *ngFor="let bug of ( bugs | sort:sortCriteria.attrName:sortCriteria.isDescending )" >
                        <span 
                            class="bugname"
                            (click)="onBugNameClick(bug)"
                            [ngClass]="{closed : bug.isClosed}"
                        >
                            {{bug.name | trimText:40}}
                        </span>
                        <div class="datetime">[crearted at]</div>
                    </li>
                </ol>
                <input type="button" value="Remove Closed" (click)="onRemoveClosedClick()">
            </div>
        </section>
    `
})
export class BugTrackerComponent{
    bugs : Bug[] = [];
    sortCriteria = { attrName : 'name', isDescending : false };



    constructor(private bugOperations : BugOperationsService){
        /* this.bugs.push({ name: 'Server communication failure', isClosed: false});
        this.bugs.push({ name: 'Data integrity checks failed', isClosed: false });
        this.bugs.push({ name: 'User actions not recognized', isClosed: false });
        this.bugs.push({ name: 'Application not responding', isClosed: false }); */

    }

    onNewBugAdded(newBug : Bug){
        this.bugs = [...this.bugs, newBug];
    }

    onBugNameClick(bugToToggle){
        let toggledBug = this.bugOperations.toggle(bugToToggle);
        this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
    }

    onRemoveClosedClick(){
        this.bugs = this.bugs.filter(bug => !bug.isClosed);
    }

    
}