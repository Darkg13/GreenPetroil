import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Faixa de chamada para ação, reutilizada no fim das páginas. */
@Component({
  selector: 'gp-cta-banner',
  imports: [RouterLink],
  templateUrl: './cta-banner.component.html',
})
export class CtaBannerComponent {
  readonly titulo = input.required<string>();
  readonly texto = input.required<string>();
  readonly rotulo = input.required<string>();
  readonly rota = input.required<string>();
}
