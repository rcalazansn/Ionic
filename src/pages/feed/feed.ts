import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [MovieProvider]
})
export class FeedPage {

  public ListaFilmes = new Array<any>();
  private loader;

  private refresher;
  private isRefreshing = false;

  private page: number = 1;

  private infiniteScroll;

  constructor(
    private movieProvider: MovieProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false) {
    this.abrirCarregando();

    this.movieProvider.getLastedMovies(this.page)
      .subscribe(data => {
        console.log(data);

        const response = (data as any);
        if (newPage) {
          this.ListaFilmes = this.ListaFilmes.concat(response.results);
          this.infiniteScroll.complete();
        } else {
          this.ListaFilmes = response.results;
        }

        console.log(this.ListaFilmes);

        this.fecharCarregando();

        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fecharCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      });
  }

  abrirCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }

  fecharCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.page = 1;
    this.carregarFilmes();
  }

  detalhesFilme(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.page++;

    this.carregarFilmes(true);
  }
}
