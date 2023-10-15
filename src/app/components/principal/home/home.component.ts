import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rawarby: string = ' '
  rawknyr: string = ' '
  rawh3vx: string = ' '
  rawxjzb: string = ' '
  rawous7: string = ' '
  rawr86o: string = ' '
  rawtvza: string = ' '
  rawgjxq: string = ' '
  constructor(private title: Title, private meta: Meta, 
    private router: Router) 
    {
      this.title.setTitle('Character NFT template')
      this.meta.addTags([
        {
          property: 'og:title',
          content: 'Character NFT template',
        },
      ]);
    }
   
  goToLogin(){
    this.router.navigate(['/login']);
  }
}

