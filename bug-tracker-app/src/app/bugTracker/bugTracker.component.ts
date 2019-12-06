import { Component } from '@angular/core';
import { Bug } from './models/Bug';

@Component({
    selector : 'app-bug-tracker',
    template : `
        <section >
            <app-bug-stats [data]="bugs"></app-bug-stats>
            <div class="sort">
                <label for="">Order By :</label>
                <select (change)="sortBugBy = $event.target.value" >
                    <option value="name">Name</option>
                    <option value="isClosed">Status</option>
                </select>
                <label for="">Descending ?: </label>
                <input type="checkbox" (change)="sortBugDescending = $event.target.checked" >
            </div>
            <div class="search">
                <label for="">Search :</label>
                <input type="text" >
                <label for="">Closed ? :</label>
                <input type="checkbox" >
                <input type="button" value="Clear" >
            </div>
            <div class="edit">
                <label for="">Bug Name :</label>
                <input type="text" (keyup) = "newBugName = $event.target.value"  >
                <span> [ {{newBugName.length}} ] </span>
                <input type="button" value="Add New" (click)="onAddNewClick()" >
            </div>
            <div class="list">
                <ol>
                    <li *ngFor="let bug of ( bugs | sort:sortBugBy:sortBugDescending )" >
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
    sortBugBy : string = 'name';
    sortBugDescending : boolean = false;

    newBugName = '';

    constructor(){
        this.bugs.push({ name: 'Server communication failure', isClosed: false});
        this.bugs.push({ name: 'Data integrity checks failed', isClosed: false });
        this.bugs.push({ name: 'User actions not recognized', isClosed: false });
        this.bugs.push({ name: 'Application not responding', isClosed: false });
    }

    onAddNewClick(){
        const newBug = {
            name : this.newBugName,
            isClosed : false
        };
        //this.bugs.push(newBug);
        this.bugs = [...this.bugs, newBug];
    }

    onBugNameClick(bugToToggle){
        let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed };
        this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
    }

    onRemoveClosedClick(){
        this.bugs = this.bugs.filter(bug => !bug.isClosed);
    }

    
}