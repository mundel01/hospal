import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '@app/core.module';
import { FirstLetterPipe } from './first-letter.pipe';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PageNavComponent } from './page-nav/page-nav.component';

@NgModule({
  declarations: [SideNavComponent, HeaderComponent, FirstLetterPipe, PageNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  exports: [SideNavComponent, HeaderComponent, PageNavComponent],
})
export class LayoutModule {}
