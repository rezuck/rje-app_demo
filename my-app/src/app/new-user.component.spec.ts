import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewUserComponent } from './new-user.component';

describe('NewUserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NewUserComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NewUserComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rje-app5'`, () => {
    const fixture = TestBed.createComponent(NewUserComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rje-app5');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NewUserComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('rje-app5 app is running!');
  });
});
