import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
})
export class Navigation {
  @Input()
  button1: string = 'register'
  @Input()
  image_src: string = 'c4d63c23-a6d3-4ac6-8f68-41d88fb9619e'
  @Input()
  button: string = 'register'
  @Input()
  image_alt1: string = 'image'
  @Input()
  image_src1: string = '/assets/logo-white-1500h.png'
  @Input()
  image_alt: string = 'logo'
  constructor() {}
}
