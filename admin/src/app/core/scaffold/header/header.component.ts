import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GeneralService } from '@helpers/general-service';
import { END_POINTS } from '@helpers/general-service/utils';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { LayoutService } from '../services/layout.service';

const { account } = END_POINTS;

export interface User {
  name: string;
  picture: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  hideMenuOnClick: boolean = false;

  user: any = {
    name: '',
    picture:
      'https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg',
  };

  campus: any[] = [];
  sede: FormControl = this.fb.control('');
  themes = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Oscuro',
    },
    {
      value: 'cosmic',
      name: 'Cósmico',
    },
    {
      value: 'corporate',
      name: 'Corporativo',
    },
  ];

  currentTheme = 'default';
  userMenu = [
    { title: 'Perfil', icon: 'person-outline', tag: 'profile' },
    { title: 'Cerrar sesión', icon: 'power-outline', tag: 'logout' },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private generalService: GeneralService,
    private fb: FormBuilder
  ) {
    this.user.name = this.authService.getFullName;
    this.generalService
      .filtersList$(`${account}/campus`)
      .subscribe((res) => (this.campus = res));
    menuService.onItemClick().subscribe((tag: any) => {
      if (tag.item.tag === 'logout') {
        this.authService.logout();
      }
    });
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;
    const { xl, is } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint),
        takeUntil(this.destroy$)
      )
      .subscribe((currentBreakpoint) => {
        this.userPictureOnly = currentBreakpoint.width < xl;
        this.hideMenuOnClick = currentBreakpoint.width <= is;
      });

    this.menuService.onItemClick().subscribe(() => {
      if (this.hideMenuOnClick) {
        this.sidebarService.collapse('menu-sidebar');
      }
    });

    this.sede.patchValue(this.authService.user.campus);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', themeName);
    }
  }

  changeCampus(campus: string) {
    const { uid } = this.authService.user;
    this.generalService
      .updateUrl$(`${account}/${uid}/update`, { campus })
      .subscribe(() => this.refresh());
  }

  getSelectedItem() {
    this.menuService
      .getSelectedItem('menu')
      .pipe(takeUntil(this.destroy$))
      .subscribe((menuBag) => {
        // console.log(menuBag);
        // this.selectedItem = menuBag.item.title;
      });
  }

  refresh(): void {
    window.location.reload();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
