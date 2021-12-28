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
                type: 'link',
                label: 'Dashboard',
                route: '/',
                icon: icLayers,
                routerLinkActiveOptions: {exact: true}
            },
            {
                type: 'subheading',
                label: 'news&blogs',
                children: [
                    {
                        type: 'link',
                        label: 'news&blogs',
                        route: '/nb',
                        icon: icAssigment
                    }
                ]
            },
            {
                type: 'subheading',
                label: 'users&organizations',
                children: [
                    {
                        type: 'link',
                        label: 'users',
                        route: '/uo/user',
                        icon: icAssigment
                    },
                    {
                        type: 'link',
                        label: 'organizations',
                        route: '/uo/organization',
                        icon: icAssigment
                    }
                ]
            },
            {
                type: 'subheading',
                label: 'jobs&events',
                children: [
                    {
                        type: 'link',
                        label: 'jobs',
                        route: '/je/job',
                        icon: icAssigment
                    },
                    {
                        type: 'link',
                        label: 'events',
                        route: '/je/event',
                        icon: icAssigment
                    }
                ]
            },
            {
                type: 'subheading',
                label: 'categories',
                children: [
                    {
                        type: 'link',
                        label: 'question category',
                        route: '/c/question-category',
                        icon: icAssigment
                    }
                ]
            },
            {
                type: 'subheading',
                label: 'questionnaire&category',
                children: [
                    {
                        type: 'link',
                        label: 'questionnaire',
                        route: '/q/questionnaire',
                        icon: icAssigment
                    },
                    {
                        type: 'link',
                        label: 'category',
                        route: '/q/category',
                        icon: icAssigment
                    }
                ]
            }
            ,
            {
                type: 'subheading',
                label: 'Apps',
                children: [
                    {
                        type: 'dropdown',
                        label: 'Help Center',
                        icon: icContactSupport,
                        children: [
                            {
                                type: 'link',
                                label: 'Getting Started',
                                route: '/apps/help-center/getting-started'
                            },
                            {
                                type: 'link',
                                label: 'Pricing & Plans',
                                route: '/apps/help-center/pricing'
                            },
                            {
                                type: 'link',
                                label: 'FAQ',
                                route: '/apps/help-center/faq'
                            },
                            {
                                type: 'link',
                                label: 'Guides',
                                route: '/apps/help-center/guides'
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
