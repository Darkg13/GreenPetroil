import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, ProjetoSocial } from '../models';

/**
 * Acesso à API de back-end (server/server.js).
 * Em desenvolvimento, o proxy.conf.json encaminha /api para http://localhost:3000.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  listarPosts(limite?: number): Observable<Post[]> {
    let params = new HttpParams();
    if (limite) {
      params = params.set('limite', limite);
    }
    return this.http.get<Post[]>(`${this.base}/posts`, { params });
  }

  obterPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.base}/posts/${encodeURIComponent(id)}`);
  }

  listarProjetosSociais(): Observable<ProjetoSocial[]> {
    return this.http.get<ProjetoSocial[]>(`${this.base}/projetos-sociais`);
  }
}
