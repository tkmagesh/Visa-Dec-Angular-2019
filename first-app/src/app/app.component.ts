import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';

  constructor(){
    /* setTimeout(() => {
      this.title = 'My New App'
    }, 10000); */
  }

  onTitleChange(newTitle){
    this.title = newTitle;
  }
}
