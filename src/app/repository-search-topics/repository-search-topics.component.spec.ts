import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorySearchTopicsComponent } from './repository-search-topics.component';

describe('RepositorySearchTopicsComponent', () => {
  let component: RepositorySearchTopicsComponent;
  let fixture: ComponentFixture<RepositorySearchTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositorySearchTopicsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RepositorySearchTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
