import { Component, input, output } from '@angular/core';

/** Mensagem de carregamento ou de erro das chamadas à API (com botão para tentar de novo). */
@Component({
  selector: 'gp-state-message',
  templateUrl: './state-message.component.html',
})
export class StateMessageComponent {
  readonly tipo = input.required<'carregando' | 'erro'>();
  readonly mensagem = input.required<string>();
  readonly tentarNovamente = output<void>();
}
