import { Bug } from '../models/Bug'
export class BugOperationsService{
    createNew(bugName : string) : Bug {
        const newBug : Bug = {
            id : 0,
            name : bugName,
            isClosed : false,
            createdAt : new Date()
        }
        return newBug;
    }
    toggle(bugToToggle : Bug) : Bug{
        let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
        return toggledBug;
    }
}