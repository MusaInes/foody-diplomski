import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CaloryCounterService } from '../../shared/services/calory-counter.service';
import { UserService } from '../../shared/services/user.service';
import * as quotes from "randomquote-api"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  public userCalories: number = 0;
  public profile: any = {};
  public quote: any = {};

  public graphData: any[] = [32, 12, 5 ];
  public graphLabels: any[] = ['below', 'middle', 'above'];

  public graphBarData: any[] = [2, 0, 3, 3, 1, 3, 0];
  public graphBarLabels: any[] = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak', 'Subota', 'Nedjelja'];

  constructor(public userService: UserService, private calory: CaloryCounterService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    this.profile = await this.userService.getUsersProfile();
    this.setCalories();
    this.getQuotes();
  }

  setCalories() {
    this.userCalories = this.calory.getUserCalories(this.profile);
  }

  getQuotes() {
    this.quote = quotes.randomQuote()
  }

}
