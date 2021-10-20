export class Menus {
    public static menus = [
        {
            label: 'Quản lý danh mục',
            icon: 'fas fa-bars',
            key: 'category',
            route: '/main/category',
            children: [
                {
                    label: 'Danh sách danh mục',
                    key: 'category/index',
                    route: '/main/category/index',
                },
                {
                    label: 'Thêm mới danh mục',
                    key: 'category/add',
                    route: '/main/category/create',
                }
            ]
        },
        {
            label: 'Quản lý sản phẩm',
            icon: 'fas fa-box-open',
            key: 'product',
            route: '/main/product',
            children: [
                {
                    label: 'Danh sách sản phẩm',
                    key: 'product/index',
                    route: '/main/product/index',
                },
                {
                    label: 'Thêm mới sản phẩm',
                    key: 'product/add',
                    route: '/main/product/create',
                }
            ]
        },
        {
            label: 'Quản lý người dùng',
            icon: 'fas fa-user',
            key: 'user',
            route: '/main/user',
            children: [
                {
                    label: 'Danh sách người dùng',
                    key: 'user/index',
                    route: '/main/user/index',
                },
                {
                    label: 'Thêm mới người dùng',
                    key: 'user/add',
                    route: '/main/user/create',
                }
            ]
        },
        {
            label: 'Quản lý quyền',
            icon: 'fas fa-key',
            key: 'permision',
            route: '/main/permision',
            children: [
                {
                    label: 'Danh sách quyền',
                    key: 'permision/index',
                    route: '/main/permision/index',
                },
                {
                    label: 'Thêm mới quyền',
                    key: 'permision/add',
                    route: '/main/permision/create',
                }
            ]
        },
    ]
}