import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProjetoSocial } from '../../models';

/** Cartão de um projeto social mantido pela empresa. */
@Component({
  selector: 'gp-projeto-card',
  imports: [DecimalPipe],
  templateUrl: './projeto-card.component.html',
})
export class ProjetoCardComponent {
  readonly projeto = input.required<ProjetoSocial>();
}
