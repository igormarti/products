import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSuggestedComponent } from './products-suggested.component';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadRemoteModuleWrapper } from '../../../wrappers/load-module/loadremote-module.wrapper';

import { NgElement, WithProperties } from '@angular/elements';
import { CreateElementWrapper } from '../../../wrappers/create-element/create-element.wrapper';

describe('ProductsSuggestedComponent', () => {
  let component: ProductsSuggestedComponent;
  let fixture: ComponentFixture<ProductsSuggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with isLoading true', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should start with isFailedLoadingComponent false', () => {
    expect(component.isFailedLoadingComponent).toBeFalse();
  });

  it('should have retryLoad as a function', () => {
    expect(typeof component.retryLoad).toEqual('function');
  });

  it('should call loadMicroFrontend on ngOnInit', () => {
    spyOn(component, 'loadMicroFrontend');
    component.ngOnInit();
    expect(component.loadMicroFrontend).toHaveBeenCalled();
  });

  it('should set isLoading to true when loadMicroFrontend is called', () => {
    component.loadMicroFrontend();
    expect(component.isLoading).toBeTrue();
  });

  it('should set isFailedLoadingComponent to false when loadMicroFrontend is called', () => {
    component.loadMicroFrontend();
    expect(component.isFailedLoadingComponent).toBeFalse();
  });

  it('should define a new custom element when loadRemoteModule is successful', () => {
    const mockModule = { ProductsSuggestedComponent: class {} };
    const ce = class  extends NgElement implements WithProperties<unknown> {
      ngElementStrategy: any;
      override ngElementEventsSubscription: any;
      static get observedAttributes() {
        return ['name']; // substitua 'myAttribute' pelo atributo que você deseja observar
      }
      attributeChangedCallback(name:any, oldValue:any, newValue:any) {}
      connectedCallback() {}
      disconnectedCallback() {}
    }


    const loadRemoteModuleSpy = spyOn(LoadRemoteModuleWrapper, 'loadRemoteModule').withArgs(
      {
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js?r='+Date.now(),
        exposedModule: './ProductsSuggestedComponent',
      }
    ).and.returnValue(new Promise((resolve, reject) => resolve(mockModule)));
    
    spyOn(CreateElementWrapper, 'createCustomElement').and.returnValue(ce);
    spyOn(customElements, 'get').withArgs('mfe-products-suggested').and.returnValue(undefined);
    spyOn(customElements, 'define').withArgs('mfe-products-suggested', ce)
    fixture.detectChanges();

    component.loadMicroFrontend();
    expect(loadRemoteModuleSpy).toHaveBeenCalled();
    expect(component.isFailedLoadingComponent).toBeFalse();
  });


});
