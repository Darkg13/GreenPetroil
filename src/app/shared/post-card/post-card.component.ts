import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models';

/** Resumo de um post do feed, com link para a página do post completo. */
@Component({
  selector: 'gp-post-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  readonly post = input.required<Post>();
}
