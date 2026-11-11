import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';

@Component({
  selector: 'gp-nao-encontrado',
  imports: [RouterLink, PageHeroComponent],
  templateUrl: './nao-encontrado.component.html',
})
export class NaoEncontradoComponent {}
