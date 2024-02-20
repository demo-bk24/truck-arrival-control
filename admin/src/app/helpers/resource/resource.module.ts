import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { ResourceMap } from './resource';
import { ResourceService } from './resource.service';

export const RESOURCE_TOKEN = new InjectionToken<ResourceMap>('Core Resource');

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ResourceModule {
  static config(config: ResourceMap): ModuleWithProviders<ResourceModule> {
    return {
      ngModule: ResourceModule,
      providers: [
        {
          provide: RESOURCE_TOKEN,
          useValue: config,
        },
        ResourceService,
      ],
    };
  }
}
