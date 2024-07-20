import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { debounceTime, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy {
  outbreakList: any = [];
  outbreakListMaster: any = [];
  resultList: Array<any> = [];
  counter: number = 0;
  searchText: string = '';
  constructor(public apiService: ApiService) { }

  async ngOnInit() {
    let response: any = await this.apiService.doGet('./assets/JSON/clusterinfo.json', true);
    console.log(response);
    this.outbreakListMaster = response;
    for(let i = 0; i <= 15; i++){
      this.outbreakList.push(this.outbreakListMaster[i]);
    }
    this.setSearchSubject();
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 500; // Set the debounce time (in milliseconds)

  setSearchSubject() {
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((text) => {
      // this.performSearch(searchValue);
      this.beginSearch(text);
    });
  }

  beginSearch(text: string){
    if((this.searchText).trim() != ''){
      this.resultList = this.outbreakListMaster.filter((item: any) => { return (item.LOKALITI.toLowerCase().indexOf(text.toLowerCase()) > -1)});
      // console.log(this.resultList);
    }
  }

  onSearch() {
    this.searchSubject.next(this.searchText);
  }

  onIonInfinite(event: any){
    console.log(event);
    setTimeout(() => {
      this.counter += 1;
      // todo check if 
      for(let i = (this.counter); i<=(this.counter + 15); i++){

        this.outbreakList.push(this.outbreakListMaster[i]);
      }
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

}

