import {Component, Inject, LOCALE_ID, Renderer2} from '@angular/core';
import {ConfigService} from '../@vex/services/config.service';
import {Settings} from 'luxon';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {NavigationService} from '../@vex/services/navigation.service';
import {LayoutService} from '../@vex/services/layout.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SplashScreenService} from '../@vex/services/splash-screen.service';
import {Style, StyleService} from '../@vex/services/style.service';
import {ConfigName} from '../@vex/interfaces/config-name.model';
import {MenuStoreService} from './core/service/menu-store.service';
import { ColorVariable, colorVariables } from '../@vex/components/config-panel/color-variables';
@Component({
    selector: 'vex-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'HR CRM';

    constructor(
        private menuStore: MenuStoreService,
        private configService: ConfigService,
        private styleService: StyleService,
        private renderer: Renderer2,
        private platform: Platform,
        @Inject(DOCUMENT) private document: Document,
        @Inject(LOCALE_ID) private localeId: string,
        private layoutService: LayoutService,
        private route: ActivatedRoute,
        private navigationService: NavigationService,
        private splashScreenService: SplashScreenService) {
        Settings.defaultLocale = this.localeId;

        if (this.platform.BLINK) {
            this.renderer.addClass(this.document.body, 'is-blink');
        }

        /**
         * Customize the template to your needs with the ConfigService
         * Example:
         *  this.configService.updateConfig({
         *    sidenav: {
         *      title: 'Custom App',
         *      imageUrl: '//placehold.it/100x100',
         *      showCollapsePin: false
         *    },
         *    footer: {
         *      visible: false
         *    }
         *  });
         */

        /**
         * Config Related Subscriptions
         * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
         * Example: example.com/?layout=apollo&style=default
         */
        this.route.queryParamMap.pipe(
            filter(queryParamMap => queryParamMap.has('rtl')),
            map(queryParamMap => coerceBooleanProperty(queryParamMap.get('rtl'))),
        ).subscribe(isRtl => {
            this.configService.updateConfig({
                rtl: isRtl
            });
        });

        this.route.queryParamMap.pipe(
            filter(queryParamMap => queryParamMap.has('layout'))
        ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

        this.route.queryParamMap.pipe(
            filter(queryParamMap => queryParamMap.has('style'))
        ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));

        let color = colorVariables.cyan;
        if (this.document) {
            this.document.documentElement.style.setProperty('--color-primary', color.default.replace('rgb(', '').replace(')', ''));
            this.document.documentElement.style.setProperty('--color-primary-contrast', color.contrast.replace('rgb(', '').replace(')', ''));
        }

        /**
         * Add your own routes here
         */
        this.navigationService.items = this.menuStore.getMenuList();
    }
}
