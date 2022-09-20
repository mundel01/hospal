import { TestBed } from "@angular/core/testing";
import { SideNavComponent } from "./side-nav.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("SideNavComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SideNavComponent],
    }).compileComponents();
  });

  it("should create the side-nav", () => {
    const fixture = TestBed.createComponent(SideNavComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
