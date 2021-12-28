import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomLayoutComponent} from './custom-layout/custom-layout.component';
import {VexRoutes} from '../@vex/interfaces/vex-route.interface';
import {QuicklinkModule, QuicklinkStrategy} from 'ngx-quicklink';
import {AuthGuard} from './core/guard/auth.guard';

const routes: VexRoutes = [
    {
        path: 'login',
        loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'register',
        loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule),
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./features/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    },
    {
        path: 'coming-soon',
        loadChildren: () => import('./features/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
    },
    {
        path: '',
        component: CustomLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            // {
            //     // path: 'dashboards/analytics',
            //     canActivate: [AuthGuard]
            //     // redirectTo: '/'
            // },
            {
                path: '',
                loadChildren: () => import('./features/home/home.module')
                    .then(m => m.HomeModule),
            },
            {
                path: 'nb',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./features/news-blog/news-blog.module').then(m => m.NewsBlogModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    }
                ]
            },
            {
                path: 'q',
                children: [
                    {
                        path: 'questionnaire',
                        loadChildren: () => import('./pages/apps/questionnaire/questionnaire.module').then(m => m.QuestionnaireModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'category',
                        loadChildren: () => import('./pages/apps/category/category.module').then(m => m.CategoryModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    }
                ]
            },
            {
                path: 'uo',
                children: [
                    {
                        path: 'user',
                        loadChildren: () => import('./features/users-table/user-table.module').then(m => m.UserTableModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'organization',
                        loadChildren: () => import('./features/organization/organization.module').then(m => m.OrganizationModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    }
                ]
            },
            {
                path: 'je',
                children: [
                    {
                        path: 'job',
                        loadChildren: () => import('./pages/apps/job/job.module').then(m => m.JobModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'event',
                        loadChildren: () => import('./pages/apps/event/event.module').then(m => m.EventModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    }
                ]
            },
            {
                path: 'c',
                children: [
                    {
                        path: 'question-category',
                        loadChildren: () => import('./pages/apps/question-category/question-category.module').then(m => m.QuestionCategoryModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    }
                ]
            },
            {
                path: 'apps',
                children: [
                    {
                        path: 'chat',
                        loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'mail',
                        loadChildren: () => import('./pages/apps/mail/mail.module').then(m => m.MailModule),
                        data: {
                            toolbarShadowEnabled: true,
                            scrollDisabled: true
                        }
                    },
                    {
                        path: 'social',
                        loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
                    },
                    {
                        path: 'contacts',
                        loadChildren: () => import('./pages/apps/contacts/contacts.module').then(m => m.ContactsModule)
                    },
                    {
                        path: 'calendar',
                        loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'aio-table',
                        loadChildren: () => import('./pages/apps/aio-table/aio-table.module').then(m => m.AioTableModule),
                    },
                    {
                        path: 'scrumboard',
                        loadChildren: () => import('./pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
                    },
                    {
                        path: 'editor',
                        loadChildren: () => import('./pages/apps/editor/editor.module').then(m => m.EditorModule),
                    },
                ]
            },
            {
                path: 'pages',
                children: [
                    {
                        path: 'pricing',
                        loadChildren: () => import('./features/pricing/pricing.module').then(m => m.PricingModule)
                    },
                    {
                        path: 'error-500',
                        loadChildren: () => import('./shared/errors/error-500/error-500.module').then(m => m.Error500Module)
                    }
                ]
            },
            {
                path: 'ui',
                children: [
                    {
                        path: 'components',
                        loadChildren: () => import('./pages/ui/components/components.module').then(m => m.ComponentsModule),
                    },
                    {
                        path: 'forms/form-elements',
                        loadChildren: () => import('./pages/ui/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
                        data: {
                            containerEnabled: true
                        }
                    },
                    {
                        path: 'forms/form-wizard',
                        loadChildren: () => import('./pages/ui/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
                        data: {
                            containerEnabled: true
                        }
                    },
                    {
                        path: 'icons',
                        loadChildren: () => import('./pages/ui/icons/icons.module').then(m => m.IconsModule)
                    },
                    {
                        path: 'page-layouts',
                        loadChildren: () => import('./pages/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
                    },
                ]
            },
            {
                path: 'documentation',
                loadChildren: () => import('./pages/documentation/documentation.module').then(m => m.DocumentationModule),
            },
            {
                path: '**',
                loadChildren: () => import('./shared/errors/error-404/error-404.module').then(m => m.Error404Module)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: QuicklinkStrategy,
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'corrected',
        anchorScrolling: 'enabled',
        useHash: true
    })],
    exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
