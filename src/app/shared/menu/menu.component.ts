import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'gp-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  /** Controla a visibilidade do menu em telas pequenas. */
  readonly aberto = input(false);
  /** Emitido quando o usuário escolhe um link (para o cabeçalho fechar o menu). */
  readonly navegou = output<void>();
}
