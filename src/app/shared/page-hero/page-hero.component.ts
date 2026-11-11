import { Component, input } from '@angular/core';

/** Faixa de título usada no topo das páginas internas. */
@Component({
  selector: 'gp-page-hero',
  templateUrl: './page-hero.component.html',
})
export class PageHeroComponent {
  readonly titulo = input.required<string>();
  readonly subtitulo = input<string>('');
}
