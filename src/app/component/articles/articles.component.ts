import { Component, Input, OnInit} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit{

public articlesList: any;
@Input() currentDarkModeState: any;

constructor(private api : ApiService) {}

ngOnInit(): void {
  this.api.getDetails()
  .subscribe(res=>{
    this.articlesList = res;
  })
}

}
