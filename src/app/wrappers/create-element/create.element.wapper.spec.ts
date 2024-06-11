import { Injector, Type } from "@angular/core";
import { NgElement, NgElementConfig, NgElementConstructor, WithProperties } from "@angular/elements";
import { TestBed } from '@angular/core/testing';
import { CreateElementWrapper } from "./create-element.wrapper";

describe('CreateElementWrapper', () => {
  let mockComponent: Type<any>;
  let mockConfig: NgElementConfig;
  let mockNgElementConstructor: NgElementConstructor<any>;

  beforeEach(() => {
    mockComponent = class {};
    mockConfig = { injector: TestBed.inject(Injector) };
    mockNgElementConstructor = class extends NgElement implements WithProperties<unknown> {
        ngElementStrategy: any;
        override ngElementEventsSubscription: any;
        static get observedAttributes() {
          return ['name']; // substitua 'myAttribute' pelo atributo que você deseja observar
        }
        attributeChangedCallback(name:any, oldValue:any, newValue:any) {}
        connectedCallback() {}
        disconnectedCallback() {}
      }

  });

  it('should call createCustomElement with correct parameters', () => {
    const CreateElementWrapperSpy = spyOn(CreateElementWrapper, 'createCustomElement').and.returnValue(mockNgElementConstructor);
    const result = CreateElementWrapper.createCustomElement(mockComponent, mockConfig);

    expect(CreateElementWrapperSpy).toHaveBeenCalledWith(mockComponent, mockConfig);
    expect(result).toBe(mockNgElementConstructor);
  });
});
