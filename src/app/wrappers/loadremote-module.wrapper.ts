import { LoadRemoteModuleOptions, loadRemoteModule } from '@angular-architects/module-federation';

export const LoadRemoteModuleWrapper = {
  loadRemoteModule<T = any>(options: LoadRemoteModuleOptions): Promise<T>
  {
    return loadRemoteModule<T>(options);
  }
}