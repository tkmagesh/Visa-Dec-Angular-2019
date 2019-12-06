import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';

import { HttpClient } from '@angular/common/http';
import { BugApiService } from './services/bugApi.service';
import { forkJoin } from 'rxjs';

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
export class BugTrackerComponent implements OnInit{
    bugs : Bug[] = [];
    sortCriteria = { attrName : 'name', isDescending : false };

    constructor(private bugOperations : BugOperationsService, private bugApi : BugApiService){
        /* this.bugs.push({ name: 'Server communication failure', isClosed: false});
        this.bugs.push({ name: 'Data integrity checks failed', isClosed: false });
        this.bugs.push({ name: 'User actions not recognized', isClosed: false });
        this.bugs.push({ name: 'Application not responding', isClosed: false }); */

    }

    ngOnInit(){
        this.loadBugs();
    }

    onNewBugAdded(newBug : Bug){
        this.bugs = [...this.bugs, newBug];
    }

    onBugNameClick(bugToToggle){
        let toggledBugData = this.bugOperations.toggle(bugToToggle);
        this.bugApi
            .save(toggledBugData)
            .subscribe(toggledBug => this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug));
    }

    onRemoveClosedClick(){
        const closedBugs = this.bugs.filter(bug => bug.isClosed);
        const removeClosedBugObservables  = closedBugs.map(closedBug => this.bugApi.delete(closedBug));
        forkJoin(removeClosedBugObservables)
            .subscribe(() => this.loadBugs());
    }
    loadBugs(): void {
        this.bugApi
            .getAll()
            .subscribe(response => this.bugs = response);
    }

    
}