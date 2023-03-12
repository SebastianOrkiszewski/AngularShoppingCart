import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { DarkModeService } from 'src/app/shared/dark-mode.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit{

public articlesList: any;
currentDarkModeState: boolean = false

constructor(private api : ApiService, private DarkModeService : DarkModeService) {}

ngOnInit(): void {
  this.api.getDetails()
  .subscribe(res=>{
    this.articlesList = res;
  })
  this.DarkModeService.status.subscribe((data) => {
    this.currentDarkModeState = data;
  })
}

}
