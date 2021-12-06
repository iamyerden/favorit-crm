import { Component, OnInit } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { trackByRoute } from '../../../../@vex/utils/track-by';
import { Icon } from '@visurel/iconify-angular';
import icFlag from '@iconify/icons-ic/twotone-flag';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icBook from '@iconify/icons-ic/twotone-book';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';

@Component({
  selector: 'vex-help-center',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class TariffsComponent implements OnInit {

  icSearch = icSearch;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;

  links: (Link & { icon: Icon })[] = [
    {
      label: 'Pricing & Plans',
      route: 'pricing',
      icon: icAttachMoney
    },
  ];

  trackByRoute = trackByRoute;

  constructor() { }

  ngOnInit() {
  }

}
