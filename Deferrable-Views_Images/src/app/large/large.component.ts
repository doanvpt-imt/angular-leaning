import { Component } from '@angular/core';
import {
  IMAGE_CONFIG,
  IMAGE_LOADER,
  ImageLoaderConfig,
  NgOptimizedImage,
  PRECONNECT_CHECK_BLOCKLIST,
  provideImgixLoader,
} from '@angular/common';

const myCustomLoader = (config: ImageLoaderConfig) => {
  let url = `https://example.com/images/${config.src}?`;
  let queryParams = [];
  if (config.width) {
    queryParams.push(`w=${config.width}`);
  }
  if (config.loaderParams?.['roundedCorners']) {
    queryParams.push('mask=corners&corner-radius=5');
  }
  return url + queryParams.join('&');
};

@Component({
  selector: 'large-component',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './large.component.html',
  styleUrl: './large.component.scss',
  providers: [
    provideImgixLoader('https://my.base.url/'),
    {
      provide: PRECONNECT_CHECK_BLOCKLIST,
      useValue: 'https://your-domain.com',
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://example.com/images?src=${config.src}&width=${config.width}`;
      },
    },
  ],
})
export class LargeComponent {}
