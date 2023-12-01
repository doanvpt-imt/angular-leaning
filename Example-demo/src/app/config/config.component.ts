import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  config: Config | undefined;
  headers: string[] = [];
  contents = '';

  ngOnInit(): void {
    this.showConfig();
    this.showConfigResponse();
    this.download();
  }

  download() {
    this.configService
      .getTextFile('assets/textfile.txt')
      .subscribe((results) => (this.contents = results));
  }

  showConfig() {
    this.configService
      .getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data) => (this.config = { ...data }));
  }

  showConfigResponse() {
    this.configService
      .getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe((resp) => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map((key) => `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }
}
