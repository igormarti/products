import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  public get(store:string):Array<T>{
    return this.getStore(store);
  }

  public set(store:string, item:T):void{
    const data:Array<T> = this.getStore(store);
    data.push(item);
    this.setStore(store, data);
  }

  public put(store:string, foreachFunc: (item:T, index?:number, obj?: T[]) => void):void{
    const data:Array<T> = this.getStore(store);
    data.forEach(foreachFunc);
    this.setStore(store, data); 
  }

  public delete(store:string, filterFunc: (item:T, index?:number, obj?: T[]) => boolean):void{
    let data:Array<T> = this.getStore(store);
    data = data.filter(filterFunc);
    this.setStore(store, data); 
  }

  public destroy(store:string):void{
    localStorage.removeItem(store);
  }

  public clear():void{
    localStorage.clear();
  }

  private getStore(store:string):Array<T>{
    let data:Array<T> = [];
    const hasData = localStorage.getItem(store);
    if(hasData){
      data = JSON.parse(hasData);
    }
    return data;
  }

  private setStore(store:string, data:Array<T>):void{
     localStorage.setItem(store, JSON.stringify(data));
  }
}
