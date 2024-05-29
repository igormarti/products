import { Type } from "@angular/core";
import { NgElementConfig, NgElementConstructor, createCustomElement } from "@angular/elements";

export const CreateElementWrapper = {
    createCustomElement<P = any>(component: Type<any>, config: NgElementConfig): NgElementConstructor<P>
    {
        return createCustomElement<P>(component, config);
    }
}