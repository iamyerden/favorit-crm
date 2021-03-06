export const aioTableLabels = [
    {
        text: 'New',
        textClass: 'text-green',
        bgClass: 'bg-green-light',
        previewClass: 'bg-green'
    },
    {
        text: 'Lead',
        textClass: 'text-cyan',
        bgClass: 'bg-cyan-light',
        previewClass: 'bg-cyan'
    },
    {
        text: 'In Progress',
        textClass: 'text-teal',
        bgClass: 'bg-teal-light',
        previewClass: 'bg-teal'
    },
    {
        text: 'Completed',
        textClass: 'text-purple',
        bgClass: 'bg-purple-light',
        previewClass: 'bg-purple'
    },
];

export const aioTableStatuses = [
    {
        text: 'New',
        textClass: 'text-green',
        bgClass: 'bg-green-light',
        previewClass: 'bg-green'
    },
    {
        text: 'Blocked',
        textClass: 'text-cyan',
        bgClass: 'bg-cyan-light',
        previewClass: 'bg-cyan'
    },
    {
        text: 'Block soon',
        textClass: 'text-teal',
        bgClass: 'bg-teal-light',
        previewClass: 'bg-teal'
    },
    {
        text: 'Deleted',
        textClass: 'text-purple',
        bgClass: 'bg-purple-light',
        previewClass: 'bg-purple'
    },
];

export const newsAndBlogsTableData = [
    {
        id: 1,
        title: 'China bans Namewee is viral pop song Fragile',
        description: 'A viral pop song that pokes fun at Beijing and its supporters has been banned in mainland China.',
        shortDescription: 'The BBC talks to the song’s creator, Namewee.',
        content: 'Fragile mocks so-called “little pinks” - a term which refers to young nationalists who rush to the defence of the Chinese government on the internet.',
        author: 'Magzhan Baimbet',
        imageSrc: 'assets/img/illustrations/idea.svg',
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
    {
        id: 2,
        title: 'Can UK avoid a Europe-style',
        description: 'It has triggered fears the UK could follow suit.  ',
        shortDescription: 'To understand why that could be the case',
        content: 'string',
        author: 'Magzhan Baimbet',
        imageSrc: 'assets/img/illustrations/idea.svg',
        labels: [aioTableLabels[0], aioTableLabels[1]]
    }
];

export const categoryData = [
    {
        id: 1,
        question_id : 1,
        category_id: 1
    },
    {
        id: 2,
        question_id : 2,
        category_id: 1
    }
]

export const jobsTableData = [
    {
        id: 1,
        title: 'China bans Namewee is viral pop song Fragile',
        description: 'A viral pop song that pokes fun at Beijing and its supporters has been banned in mainland China.',
        status: '',
        priceStart: 10000,
        priceEnd: 29990,
        type: '',
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
    {
        id: 2,
        title: 'China bans Namewee is viral pop song Fragile',
        description: 'A viral pop song that pokes fun at Beijing and its supporters has been banned in mainland China.',
        status: '',
        priceStart: 10000,
        priceEnd: 29990,
        type: '',
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
];

export const eventsTableData = [
    {
        id: 1,
        name: '',
        description: '',
        type: '',
        eventDate: '12.01.2021',
        condition: {},
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
    {
        id: 1,
        name: '',
        description: '',
        type: '',
        eventDate: '12.01.2021',
        condition: {},
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
];

export const organizationData = [
    {
        id: 1,
        tariff_id: 1,
        nameOrganization: 'Reself',
        description: 'It is the test description',
        contacts: '+77788746223',
        logo_id: 1,
        country: 1,
        city: 1,
        imageSrc: 'assets/img/illustrations/idea.svg',
        address: 'Almaty'
    },
    {
        id: 2,
        tariff_id: 1,
        nameOrganization: 'IITU',
        description: 'It is the test description',
        contacts: '+77788746223',
        logo_id: 1,
        country: 1,
        city: 1,
        imageSrc: 'assets/img/illustrations/idea.svg',
        address: 'Almaty'
    },
    {
        id: 3,
        tariff_id: 1,
        nameOrganization: 'Google',
        description: 'It is the test description',
        contacts: '+77788746223',
        logo_id: 1,
        country: 1,
        city: 1,
        imageSrc: 'assets/img/illustrations/idea.svg',
        address: 'Paris'
    }
];

export const categoryModelData = [
    {
        id: 1,
        parentId: 0,
        name: 'Category 1',
        logoId: 1
    },
    {
        id: 2,
        parentId: 0,
        name: 'Category 2',
        logoId: 2
    },
    {
        id: 3,
        parentId: 0,
        name: 'Category 3',
        logoId: 3
    }
];

export const aioTableData = [
    {
        id: 0,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Dejesus',
        lastName: 'Chang',
        street: '899 Raleigh Place',
        zipcode: 8057,
        city: 'Munjor',
        phoneNumber: '+32 (818) 580-3557',
        mail: 'dejesus.chang@yourcompany.biz',
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
    {
        id: 1,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Short',
        lastName: 'Lowe',
        street: '548 Cypress Avenue',
        zipcode: 5943,
        city: 'Temperanceville',
        phoneNumber: '+11 (977) 574-3636',
        mail: 'short.lowe@yourcompany.ca',
        labels: [aioTableLabels[1]]
    },
    {
        id: 2,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Antoinette',
        lastName: 'Carson',
        street: '299 Roder Avenue',
        zipcode: 7894,
        city: 'Crayne',
        phoneNumber: '+49 (969) 505-3323',
        mail: 'antoinette.carson@yourcompany.net',
        labels: [aioTableLabels[3]]
    },
    {
        id: 3,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Lynnette',
        lastName: 'Adkins',
        street: '158 Cyrus Avenue',
        zipcode: 4831,
        city: 'Coyote',
        phoneNumber: '+48 (836) 545-3237',
        mail: 'lynnette.adkins@yourcompany.info',
        labels: [aioTableLabels[3]]
    },
    {
        id: 4,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Patrica',
        lastName: 'Good',
        street: '995 Kansas Place',
        zipcode: 4679,
        city: 'Whitmer',
        phoneNumber: '+36 (955) 485-3652',
        mail: 'patrica.good@yourcompany.me',
        labels: [aioTableLabels[0]]
    },
    {
        id: 5,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Kane',
        lastName: 'Koch',
        street: '779 Lynch Street',
        zipcode: 6178,
        city: 'Newcastle',
        phoneNumber: '+35 (983) 587-3423',
        mail: 'kane.koch@yourcompany.org',
        labels: [aioTableLabels[1]]
    },
    {
        id: 6,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Donovan',
        lastName: 'Gonzalez',
        street: '781 Knickerbocker Avenue',
        zipcode: 532,
        city: 'Frizzleburg',
        phoneNumber: '+47 (914) 469-3270',
        mail: 'donovan.gonzalez@yourcompany.tv',
        labels: [aioTableLabels[2]]
    },
    {
        id: 7,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Sabrina',
        lastName: 'Logan',
        street: '112 Glen Street',
        zipcode: 4763,
        city: 'Frystown',
        phoneNumber: '+37 (896) 474-3143',
        mail: 'sabrina.logan@yourcompany.co.uk',
        labels: [aioTableLabels[0], aioTableLabels[1]]
    },
    {
        id: 8,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Estela',
        lastName: 'Jordan',
        street: '626 Stryker Court',
        zipcode: 9966,
        city: 'Blende',
        phoneNumber: '+2 (993) 445-3626',
        mail: 'estela.jordan@yourcompany.name',
        labels: [aioTableLabels[0]]
    },
    {
        id: 9,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Rosanna',
        lastName: 'Cross',
        street: '540 Fiske Place',
        zipcode: 4204,
        city: 'Bellfountain',
        phoneNumber: '+12 (877) 563-2737',
        mail: 'rosanna.cross@yourcompany.biz',
        labels: [aioTableLabels[2]]
    },
    {
        id: 10,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Mary',
        lastName: 'Jane',
        street: '233 Glen Place',
        zipcode: 4221,
        city: 'Louisville',
        phoneNumber: '+15 (877) 334-2231',
        mail: 'Mary.jane@yourcompany.biz',
        labels: [aioTableLabels[1]]
    },
    {
        id: 11,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Lane',
        lastName: 'Delaney',
        street: 'Langham Street',
        zipcode: 6411,
        city: 'Avoca',
        phoneNumber: '+1 (969) 570-2843',
        mail: 'lane.delaney@yourcompany.ca',
        labels: [aioTableLabels[3]]
    },
    {
        id: 12,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Cooper',
        lastName: 'Odom',
        street: 'Shale Street',
        zipcode: 5286,
        city: 'Joes',
        phoneNumber: '+1 (812) 535-2368',
        mail: 'cooper.odom@yourcompany.info',
        labels: [aioTableLabels[3]]
    },
    {
        id: 13,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Kirby',
        lastName: 'Hardin',
        street: 'Rodney Street',
        zipcode: 4864,
        city: 'Finzel',
        phoneNumber: '+1 (838) 519-3416',
        mail: 'kirby.hardin@yourcompany.us',
        labels: [aioTableLabels[3]]
    },
    {
        id: 14,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Marquita',
        lastName: 'Haynes',
        street: 'Townsend Street',
        zipcode: 9000,
        city: 'Walland',
        phoneNumber: '+1 (965) 482-2100',
        mail: 'marquita.haynes@yourcompany.me',
        labels: [aioTableLabels[2]]
    },
    {
        id: 15,
        imageSrc: 'assets/img/illustrations/it_support.svg',
        firstName: 'Horton',
        lastName: 'Townsend',
        street: 'Gunnison Court',
        zipcode: 9519,
        city: 'Nettie',
        phoneNumber: '+1 (941) 434-2481',
        mail: 'horton.townsend@yourcompany.biz',
        labels: [aioTableLabels[0]]
    },
    {
        id: 16,
        imageSrc: 'assets/img/avatars/16.jpg',
        firstName: 'Carrie',
        lastName: 'Bond',
        street: 'Bushwick Court',
        zipcode: 4345,
        city: 'Colton',
        phoneNumber: '+1 (854) 556-2844',
        mail: 'carrie.bond@yourcompany.biz',
        labels: [aioTableLabels[0]]
    },
    {
        id: 17,
        imageSrc: 'assets/img/avatars/17.jpg',
        firstName: 'Carroll',
        lastName: 'Pugh',
        street: 'Baltic Street',
        zipcode: 8174,
        city: 'Innsbrook',
        phoneNumber: '+1 (989) 561-2440',
        mail: 'carroll.pugh@yourcompany.tv',
        labels: [aioTableLabels[0]]
    },
    {
        id: 18,
        imageSrc: 'assets/img/avatars/18.jpg',
        firstName: 'Fuller',
        lastName: 'Espinoza',
        street: 'Dooley Street',
        zipcode: 9034,
        city: 'Maybell',
        phoneNumber: '+1 (807) 417-3508',
        mail: 'fuller.espinoza@yourcompany.name',
        labels: [aioTableLabels[1]]
    },
    {
        id: 19,
        imageSrc: 'assets/img/avatars/19.jpg',
        firstName: 'Lamb',
        lastName: 'Herring',
        street: 'Exeter Street',
        zipcode: 2246,
        city: 'Fowlerville',
        phoneNumber: '+1 (950) 429-3240',
        mail: 'lamb.herring@yourcompany.com',
        labels: [aioTableLabels[2]]
    },
    {
        id: 20,
        imageSrc: 'assets/img/avatars/20.jpg',
        firstName: 'Liza',
        lastName: 'Price',
        street: 'Homecrest Avenue',
        zipcode: 8843,
        city: 'Idledale',
        phoneNumber: '+1 (989) 483-2305',
        mail: 'liza.price@yourcompany.net',
        labels: [aioTableLabels[1]]
    },
    {
        id: 21,
        imageSrc: 'assets/img/avatars/1.jpg',
        firstName: 'Monroe',
        lastName: 'Head',
        street: 'Arlington Avenue',
        zipcode: 2792,
        city: 'Garberville',
        phoneNumber: '+1 (921) 598-2475',
        mail: 'monroe.head@yourcompany.io',
        labels: [aioTableLabels[1]]
    },
    {
        id: 22,
        imageSrc: 'assets/img/avatars/2.jpg',
        firstName: 'Lucile',
        lastName: 'Harding',
        street: 'Division Place',
        zipcode: 8572,
        city: 'Celeryville',
        phoneNumber: '+1 (823) 429-3500',
        mail: 'lucile.harding@yourcompany.org',
        labels: [aioTableLabels[0]]
    },
    {
        id: 23,
        imageSrc: 'assets/img/avatars/3.jpg',
        firstName: 'Edna',
        lastName: 'Richard',
        street: 'Harbor Lane',
        zipcode: 8323,
        city: 'Lindisfarne',
        phoneNumber: '+1 (970) 580-3162',
        mail: 'edna.richard@yourcompany.ca',
        labels: [aioTableLabels[0]]
    },
    {
        id: 24,
        imageSrc: 'assets/img/avatars/4.jpg',
        firstName: 'Avila',
        lastName: 'Lancaster',
        street: 'Kay Court',
        zipcode: 9294,
        city: 'Welch',
        phoneNumber: '+1 (817) 412-3752',
        mail: 'avila.lancaster@yourcompany.info',
        labels: [aioTableLabels[0]]
    },
    {
        id: 25,
        imageSrc: 'assets/img/avatars/5.jpg',
        firstName: 'Carlene',
        lastName: 'Newman',
        street: 'Atlantic Avenue',
        zipcode: 2230,
        city: 'Eagleville',
        phoneNumber: '+1 (953) 483-3110',
        mail: 'carlene.newman@yourcompany.us',
        labels: [aioTableLabels[3]]
    },
    {
        id: 26,
        imageSrc: 'assets/img/avatars/6.jpg',
        firstName: 'Griffith',
        lastName: 'Wise',
        street: 'Perry Terrace',
        zipcode: 9564,
        city: 'Iola',
        phoneNumber: '+1 (992) 447-3392',
        mail: 'griffith.wise@yourcompany.me',
        labels: [aioTableLabels[0]]
    },
    {
        id: 27,
        imageSrc: 'assets/img/avatars/7.jpg',
        firstName: 'Schwartz',
        lastName: 'Dodson',
        street: 'Dorset Street',
        zipcode: 4425,
        city: 'Dexter',
        phoneNumber: '+1 (923) 504-2799',
        mail: 'schwartz.dodson@yourcompany.biz',
        labels: [aioTableLabels[1]]
    },
    {
        id: 28,
        imageSrc: 'assets/img/avatars/8.jpg',
        firstName: 'Susanna',
        lastName: 'Kidd',
        street: 'Loring Avenue',
        zipcode: 6432,
        city: 'Cascades',
        phoneNumber: '+1 (854) 456-2734',
        mail: 'susanna.kidd@yourcompany.biz',
        labels: [aioTableLabels[1]]
    },
    {
        id: 29,
        imageSrc: 'assets/img/avatars/9.jpg',
        firstName: 'Deborah',
        lastName: 'Weiss',
        street: 'Haring Street',
        zipcode: 2989,
        city: 'Barstow',
        phoneNumber: '+1 (833) 465-3036',
        mail: 'deborah.weiss@yourcompany.tv',
        labels: [aioTableLabels[2]]
    }
];
