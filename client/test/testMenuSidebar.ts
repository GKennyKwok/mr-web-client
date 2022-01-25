import { SidebarMenu } from "~/@types/ui/menu";

export const Menus = <SidebarMenu>[
    { type: 'header', id: 0, title: '管理' },
    { type: "item", id: 1, title: '用户', path: '/admin/manager/user', icon: 'fa-address-book' },
    {
        type: "item", id: 2, title: '权限管理', icon: 'fa-sitemap', subMenu: [
            { type: "item", id: 0, title: '权限', path: '/admin/manager/auth/power' },
            { type: "item", id: 1, title: '角色', path: '/admin/manager/auth/role' },
            { type: "item", id: 2, title: '角色组', path: '/admin/manager/auth/rolegroup' },
            { type: "item", id: 3, title: '用户组', path: '/admin/manager/auth/usergroup' },
        ]
    },
    { type: "item", id: 3, title: '页面管理', path: '/admin/manager/page', icon: 'fa-share-alt-square' },
    { type: "item", id: 4, title: '操作管理', path: '/admin/manager/operation', icon: 'fa-check-square-o' },
    { type: "item", id: 5, title: '菜单管理', path: '/admin/manager/menu', icon: 'fa-list' },
    { type: "item", id: 6, title: '文件管理', path: '/admin/manager/file', icon: 'fa-file' },


    // { type: 'header', id: 0, title: 'Main' },
    // { type: "item", id: 1, title: 'Dashboard', path: 'index.html', icon: 'fa-dashboard' },

    // { type: 'header', id: 2, title: 'Apps' },
    // { type: "item", id: 3, title: 'Email', path: 'app-inbox.html', icon: 'fa-envelope' },
    // { type: "item", id: 4, title: 'Chat', path: 'app-chat.html', icon: 'fa-comments' },
    // { type: "item", id: 5, title: 'Calendar', path: 'app-calendar.html', icon: 'fa-calendar' },
    // { type: "item", id: 6, title: 'Todo List', path: 'app-todo.html', icon: 'fa-th-list' },
    // { type: "item", id: 7, title: 'File Manager', path: 'app-filemanager.html', icon: 'fa-folder' },
    // { type: "item", id: 8, title: 'Contacts', path: 'app-contacts.html', icon: 'fa-address-book' },
    // { type: "item", id: 9, title: 'Scrumboard', path: 'app-scrumboard.html', icon: 'fa-tasks' },
    // { type: "item", id: 10, title: 'Blog', path: 'page-news.html', icon: 'fa-globe' },
    // { type: "item", id: 11, title: 'Social', path: 'page-social.html', icon: 'fa-share-alt-square' },

    // { type: 'header', id: 12, title: 'Vendors' },
    // {
    //     type: "item", id: 13, title: 'ui Elements', path: '#uiElements', icon: 'fa-diamond', subMenu: [
    //         { type: "item", id: 0, title: 'Helper Classes', path: 'ui-helper-class.html' },
    //         { type: "item", id: 1, title: 'Bootstrap UI', path: 'ui-bootstrap.html' },
    //         { type: "item", id: 2, title: 'Typography', path: 'ui-typography.html' },
    //         { type: "item", id: 3, title: 'Tabs', path: 'ui-tabs.html' },
    //         { type: "item", id: 4, title: 'Buttons', path: 'ui-buttons.html' },
    //         { type: "item", id: 5, title: 'Icons', path: 'ui-icons.html' },
    //         { type: "item", id: 6, title: 'Notifications', path: 'ui-notifications.html' },
    //         { type: "item", id: 7, title: 'Colors', path: 'ui-colors.html' },
    //         { type: "item", id: 8, title: 'Dialogs', path: 'ui-dialogs.html' },
    //         { type: "item", id: 9, title: 'List Group', path: 'ui-list-group.html' },
    //         { type: "item", id: 10, title: 'Media Object', path: 'ui-media-object.html' },
    //         { type: "item", id: 11, title: 'Modals', path: 'ui-modals.html' },
    //         { type: "item", id: 12, title: 'Nestable', path: 'ui-nestable.html' },
    //         { type: "item", id: 13, title: 'Progress Bars', path: 'ui-progressbars.html' },
    //         { type: "item", id: 14, title: 'Range Sliders', path: 'ui-range-sliders.html' },
    //     ]
    // },
    // {
    //     type: "item", id: 14, title: 'Forms Elements', path: '#forms', icon: 'fa-pencil', subMenu: [
    //         { type: "item", id: 0, title: 'Basic Elements', path: 'forms-basic.html' },
    //         { type: "item", id: 1, title: 'Advanced Elements', path: 'forms-advanced.html' },
    //         { type: "item", id: 2, title: 'Form Validation', path: 'forms-validation.html' },
    //         { type: "item", id: 3, title: 'Form Wizard', path: 'forms-wizard.html' },
    //         { type: "item", id: 4, title: 'Drag &amp; Drop Upload', path: 'forms-dragdropupload.html' },
    //         { type: "item", id: 5, title: 'Image Cropping', path: 'forms-cropping.html' },
    //         { type: "item", id: 6, title: 'Summernote', path: 'forms-summernote.html' },
    //         { type: "item", id: 7, title: 'CKEditor', path: 'forms-editors.html' },
    //         { type: "item", id: 8, title: 'Markdown', path: 'forms-markdown.html' },
    //     ]
    // },
    // {
    //     type: "item", id: 15, title: 'Tables', path: '#Tables', icon: 'fa-table', subMenu: [
    //         { type: "item", id: 0, title: 'Normal Tables', path: 'table-normal.html' },
    //         { type: "item", id: 1, title: 'Jquery Datatables', path: 'table-jquery-datatable.html' },
    //         { type: "item", id: 2, title: 'Editable Tables', path: 'table-editable.html' },
    //         { type: "item", id: 3, title: 'Tables Color', path: 'table-color.html' },
    //         { type: "item", id: 4, title: 'Table Filter', path: 'table-filter.html' },
    //         { type: "item", id: 5, title: 'Table dragger', path: 'table-dragger.html' },
    //     ]
    // },
    // {
    //     type: "item", id: 16, title: 'Charts', path: '#Charts', icon: 'fa-pie-chart', subMenu: [
    //         { type: "item", id: 0, title: 'Apex Charts', path: 'chart-apex.html' },
    //         { type: "item", id: 1, title: 'C3 Charts', path: 'chart-c3.html' },
    //         { type: "item", id: 2, title: 'Morris Chart', path: 'chart-morris.html' },
    //         { type: "item", id: 3, title: 'Flot Chart', path: 'chart-flot.html' },
    //         { type: "item", id: 4, title: 'ChartJS', path: 'chart-chartjs.html' },
    //         { type: "item", id: 5, title: 'Jquery Knob', path: 'chart-jquery-knob.html' },
    //         { type: "item", id: 6, title: 'Sparkline Chart', path: 'chart-sparkline.html' },
    //     ]
    // },

    // { type: 'header', id: 17, title: 'More Pages' },
    // { type: "item", id: 18, title: 'Widgets', path: 'widgets.html', icon: 'fa-puzzle-piece' },
    // {
    //     type: "item", id: 19, title: 'Pages', path: '#Pages', icon: 'fa-folder', subMenu: [
    //         { type: "item", id: 0, title: 'Login', path: 'page-login.html' },
    //         { type: "item", id: 1, title: 'Register', path: 'page-register.html' },
    //         { type: "item", id: 2, title: 'Forgot Password', path: 'page-forgot-password.html' },
    //         { type: "item", id: 3, title: 'Page 404', path: 'page-404.html' },
    //         { type: "item", id: 4, title: 'Blank Page', path: 'page-blank.html' },
    //         { type: "item", id: 5, title: 'Search Results', path: 'page-search-results.html' },
    //         { type: "item", id: 6, title: 'Profile', path: 'page-profile.html' },
    //         { type: "item", id: 7, title: 'Invoices', path: 'page-invoices.html' },
    //         { type: "item", id: 8, title: 'Image Gallery', path: 'page-gallery.html' },
    //         { type: "item", id: 9, title: 'Timeline', path: 'page-timeline.html' },
    //         { type: "item", id: 10, title: 'Pricing', path: 'page-pricing.html' },
    //     ]
    // },
    // { type: "item", id: 20, title: 'jVector Maps', path: 'map-jvectormap.html', icon: 'fa-map' },

    // {
    //     type: 'widget', id: 21, subMenu: [
    //         { type: "success", id: 0, title: 'Traffic this Month ', value: 77, minValue: 0, maxValue: 100 },
    //         { type: "warning", id: 1, title: 'Server Load ', value: 50, minValue: 0, maxValue: 100 },
    //     ]
    // },
];