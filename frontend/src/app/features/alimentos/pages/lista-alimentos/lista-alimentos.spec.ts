import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlimentos } from './lista-alimentos';

describe('ListaAlimentos', () => {
  let component: ListaAlimentos;
  let fixture: ComponentFixture<ListaAlimentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlimentos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlimentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
