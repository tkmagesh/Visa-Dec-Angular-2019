import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Bug } from '../models/Bug';

@Component({
    selector : 'app-bug-stats',
    template : `
        <div>{{getCurrentTime()}}</div>
        <div class="stats">
            <span class="closed">{{bugs | closedCount}}</span>
            <span> / </span>
            <span>{{bugs.length}}</span>
        </div>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class BugStatsComponent{

    @Input('data')
    bugs : Bug[] = [];  
    
    getCurrentTime(){
        return new Date();
    }
}