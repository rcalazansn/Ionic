import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MovieProvider]
})
export class FilmeDetalhesPage {

  private loader;
  public filme;
  public filmeId;

  public lista_imagens = new Array<any>();

  constructor(
    private movieProvider: MovieProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.abrirCarregando();

    this.filmeId = this.navParams.get("id");
    console.log(this.filmeId);

    this.movieProvider.getMovie(this.filmeId)
      .subscribe(data => {
        console.log(data);
        const response = (data as any);
        this.filme = response;
        console.log(this.filme);

        this.obterImagens();

      }, error => {
        console.log(error);
        this.fecharCarregando();
      });
  }

  obterImagens() {
    this.movieProvider.getImages(this.filmeId)
      .subscribe(data => {
        console.log(data);

        const response = (data as any);
        const objeto_retorno = response.backdrops;
        console.log('obj => ' + objeto_retorno);
        this.lista_imagens = objeto_retorno;

        this.fecharCarregando();
      }, error => {
        console.log(error);
        this.fecharCarregando();
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
}
