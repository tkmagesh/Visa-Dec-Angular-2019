import { Pipe, PipeTransform } from '@angular/core';

interface Comparer{
    (p1, p2) : number
}

@Pipe({
    name : 'sort'
})
export class SortPipe implements PipeTransform{
    private getComparerFor(attrName) : Comparer {
        return (p1, p2) => {
            if (p1[attrName] < p2[attrName]) return -1;
            if (p1[attrName] > p2[attrName]) return 1;
            return 0;
        };
    }

    private getDescendingComparerFor(comparer) : Comparer {
        return (p1, p2) => {
            return comparer(p1, p2) * -1;
        };
    }
    transform(data : any[], attrName : string, isDescending : boolean = false) : any[] {
        if (!data || !data.length || !attrName) return data;
        let comparer = this.getComparerFor(attrName);
        if (isDescending)
            comparer = this.getDescendingComparerFor(comparer);
        data.sort(comparer);
        return data;
    }
}