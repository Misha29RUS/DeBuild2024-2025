export const users = [
    {
        tel: '+7(902)291-91-03',
        surname: 'Петров',
        name: 'Владимир',
        patronymic: 'Артёмович',
        tariff: {
            type: 'active',
            text: 'Базовый'
        },
        services: [
            {
                type: 'internet',
                text: 5
            },
        ]
    },
    {
        tel: '+7(922)321-21-07',
        surname: 'Кулешова',
        name: 'Мария',
        patronymic: 'Родионовна',
        tariff: {
            type: 'archive',
            text: 'Мой онлайн 2014'
        },
        services: [
            {
                type: 'internet',
                text: 20
            },
            {
                type: 'call',
                text: 100
            },
            {
                type: 'message',
                text: 20
            },
        ]
    },
    {
        tel: '+7(982)697-90-09',
        surname: 'Савельева',
        name: 'Мадина',
        patronymic: 'Дмитриевна',
        tariff: {
            type: 'archive',
            text: 'Мой онлайн 2017'
        },
        services: []
    },
    {
        tel: '+7(931)497-31-69',
        surname: 'Высоцкий',
        name: 'Гордей',
        patronymic: 'Александрович',
        tariff: {
            type: 'active',
            text: 'Мой онлайн 2024'
        },
        services: [
            {
                type: 'internet',
                text: 100
            },
            {
                type: 'call',
                text: 600
            },
            {
                type: 'message',
                text: 200
            },
            {
                type: 'more',
            },
        ]
    },
    {
        tel: '+7(922)721-35-66',
        surname: 'Афанасьев',
        name: 'Филипп',
        patronymic: 'Григорьевич',
        tariff: {
            type: 'archive',
            text: 'Необходимый минимум 2017'
        },
        services: [
            {
                type: 'call',
                text: 100
            },
            {
                type: 'call',
                text: 50
            },
        ]
    },
]

export const tariffs = [
    {
        type: 'active',
        text: 'Базовый'
    },
    {
        type: 'archive',
        text: 'Мой онлайн 2014'
    },
    {
        type: 'archive',
        text: 'Мой онлайн 2017'
    },
    {
        type: 'active',
        text: 'Мой онлайн 2024'
    },
    {
        type: 'archive',
        text: 'Необходимый минимум 2017'
    },
]

export const services = [
    {
        name: 'Интернет',
        type: 'internet'
    },
    {
        name: 'Минуты',
        type: 'call'
    },
    {
        name: 'СМС',
        type: 'message'
    },
    {
        name: 'СКМС',
        type: 'message'
    },
    {
        name: 'СПМС',
        type: 'message'
    },
    {
        name: 'СРМС',
        type: 'message'
    },
]