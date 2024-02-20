import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistryService } from '../../../../services/registry.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent implements OnInit {
  modalRef?: any;

  qr = '';
  truck: any = {};
  driver: any = {};
  registry: any = {};

  date: any = Date.now();

  constructor(
    private route: ActivatedRoute,
    private registryService: RegistryService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.retrieveRegistry(id);
    });
  }

  ngOnInit(): void {}

  retrieveRegistry(id: string) {
    this.registryService.retrieve(id).subscribe((res: any) => {
      this.registry = res;
      this.truck = res.truck;
      this.driver = res.driver;
      this.qr = res.driver.document;
    });
  }
}
