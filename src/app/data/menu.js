export const menus = [
    {
        id: 1,
        name: 'Users List',
        category: 'Common',
        description: 'Displays list of users using API Public from Reqres.',
        menu_path: {
            name: 'Users',
            url: '/users?page=1',
        }
    },
    {
        id: 2,
        name: 'Universities Around The World',
        category: 'Education',
        description: 'Displays list of universities using API Public from Hipo.',
        menu_path: {
            name: 'Universities',
            url: '/universities?page=1&ctr=Indonesia'
        }
    },
    {
        id: 3,
        name: 'Stranger Things Quotes',
        category: 'Quote',
        description: 'Displays some quotes of Stranger Things.',
        menu_path: {
            name: 'Stranger Things',
            url: '/quotes/stranger-things'
        }
    }
]