import { TestBed } from '@angular/core/testing';

import { CostOfOrderService } from './cost-of-order.service';

describe('CostOfOrderService', () => {
  let service: CostOfOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostOfOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
