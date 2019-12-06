import { Component } from '@angular/core';
import { Bug } from './models/Bug';

@Component({
    selector : 'app-bug-tracker',
    template : `
        <section >
            <div class="stats">
                <span class="closed">{{getClosedCount()}}</span>
                <span> / </span>
                <span>{{bugs.length}}</span>
            </div>
            <div class="sort">
                <label for="">Order By :</label>
                <select >
                    <option value="name">Name</option>
                    <option value="isClosed">Status</option>
                </select>
                <label for="">Descending ?: </label>
                <input type="checkbox" >
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
                <input type="text" #txtNewBugName >
                <input type="button" value="Add New" (click)="onAddNewClick(txtNewBugName.value)" >
            </div>
            <div class="list">
                <ol>
                    <li *ngFor="let bug of bugs" >
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

    onAddNewClick(bugName : string){
        const newBug = {
            name : bugName,
            isClosed : false
        };
        this.bugs.push(newBug);
    }

    onBugNameClick(bug){
        bug.isClosed = !bug.isClosed;
    }

    onRemoveClosedClick(){
        this.bugs = this.bugs.filter(bug => !bug.isClosed);
    }

    getClosedCount(){
        return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
    }
}