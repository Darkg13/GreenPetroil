import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gp-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly ano = new Date().getFullYear();
}
