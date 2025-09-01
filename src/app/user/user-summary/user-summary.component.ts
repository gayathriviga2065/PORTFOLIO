import { Component } from '@angular/core';

@Component({
  selector: 'app-user-summary',
  standalone: false,
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.scss']
})
export class UserSummaryComponent { 
  ngAfterViewInit(): void {
    const skillItems = document.querySelectorAll(".list-group-item");

    skillItems.forEach(item => {
      item.addEventListener("click", () => {
        alert(`You clicked on skill: ${item.textContent}`);
      });
    });
  }

}
