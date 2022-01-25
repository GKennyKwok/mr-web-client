//// MenuItem ------------------------------------------

/**
 * 菜单基础类型
 */
 export interface BaseItem {
    type: string | "item";
    id: number;
    title: string;
    url?: string;
    path?: string;
    icon?: string;
}

/**
 * 菜单标题类型
 */
export interface ItemHeader {
    type: "header";
    id: number;
    title: string;
}

/**
 * 菜单数据类型
 */
export type SidebarMenuItem = BaseItem;

/**
 * 菜单数据类型（带二级菜单数据）
 */
export type SidebarMenuItemHasSubMenu = BaseItem & {
    subMenu?: Array<BaseItem>;
};

/**
 * 菜单部件数据
 */
export interface WidgetSubItem {
    id: number,
    title: string;
    type: string;
    value: number;
    minValue: number;
    maxValue: number;
}

/**
 * 菜单部件类型
 */
export interface WidgetItem {
    id: number;
    type: "widget";
    subMenu: Array<WidgetSubItem>;
}

/**
 * 侧边栏菜单类型
 */
export type SidebarMenu = Array<
    SidebarMenuItem | SidebarMenuItemHasSubMenu | WidgetItem | ItemHeader
>;

/**
 * 便签数据类型
 */
export interface StickyNoteItem {
    id: number;
    note: string;
    isActive: boolean;
    date: Date;
}

/**
 * 便签数据列表
 */
export type StickyNotes = Array<StickyNoteItem>;

/**
 * 用户下拉菜单数据类型
 */
export type UserMenuItem = BaseItem;

/**
 * 用户下拉菜单分割线类型
 */
export interface DividerHeader {
    type: "divider";
    id: number;
}

/**
 * 用户菜单类型
 */
export type UserMenu = Array<UserMenuItem | DividerHeader>;