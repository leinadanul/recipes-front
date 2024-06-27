import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";



@Injectable({
  providedIn: 'root',
})

export class HeaderContainerFacade{
private subscription: Subscription;

constructor(){}

  initSubcristion(): void{
    this.subscription = new Subscription();
  }
  destroySubscription(): void{
    this.subscription.unsubscribe();
  }

  }
