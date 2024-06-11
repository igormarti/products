import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Injector, OnInit } from '@angular/core';
import { LoadRemoteModuleWrapper } from '../../../wrappers/load-module/loadremote-module.wrapper';
import { CreateElementWrapper } from '../../../wrappers/create-element/create-element.wrapper';


@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  selector: 'app-products-suggested',
  templateUrl: './products-suggested.component.html',
  styleUrl: './products-suggested.component.scss'
})
export class ProductsSuggestedComponent implements OnInit {

  isLoading!:boolean;
  isFailedLoadingComponent!:boolean;
  retryLoad: () => void = () => {};

  constructor(private injector: Injector) {}
  ngOnInit(): void {
    this.loadMicroFrontend();
  }

  loadMicroFrontend() {

    const loadComponent = () => {
      this.isLoading = true;
      this.isFailedLoadingComponent = false;
      LoadRemoteModuleWrapper.loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js?r='+Date.now(),
        exposedModule: './ProductsSuggestedComponent',
      }).then((MicroModule: any) => {
        const ce = CreateElementWrapper.createCustomElement(
          MicroModule.ProductsSuggestedComponent, {
            injector: this.injector
          }
        );
        if (!customElements.get('mfe-products-suggested')) {
          customElements.define('mfe-products-suggested', ce);
        }
      }).catch((err: any) => {
        console.log("ERRO: "+err);
        this.isFailedLoadingComponent = true;
      }).finally(() => {
        this.isLoading = false;
      });
    };

    loadComponent();

    this.retryLoad = loadComponent;
  }
}
