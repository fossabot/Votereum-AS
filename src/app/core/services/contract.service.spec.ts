import { TestBed, inject } from '@angular/core/testing';

import { ContractService } from '@app/core/services/contract.service';

describe('ContractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractService]
    });
  });

  it('should be created', inject([ContractService], (service: ContractService) => {
    expect(service).toBeTruthy();
  }));
});
