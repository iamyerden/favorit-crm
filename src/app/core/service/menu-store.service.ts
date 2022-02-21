import {Injectable} from '@angular/core';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import {LayoutService} from '../../../@vex/services/layout.service';
import {NavigationItem} from '../../../@vex/interfaces/navigation-item.interface';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';

@Injectable({
    providedIn: 'root'
})
export class MenuStoreService {
    constructor(private layoutService: LayoutService) {
    }

    getMenuList(): NavigationItem[] {
        return [
            {
                type: 'subheading',
                label: 'Заявления',
                children: [
                    {
                        type: 'link',
                        label: 'На турниры',
                        route: '/applications/tournament',
                        icon: icAssigment
                    },
                    {
                        type: 'link',
                        label: 'На тренерство',
                        route: '/applications/coach',
                        icon: icAssigment
                    }
                ]
            }
        ];
    }
}
