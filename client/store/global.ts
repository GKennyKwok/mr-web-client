import { Store } from 'vuex';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { SidebarMenu, StickyNotes } from '~/@types/ui/menu';
import { HttpVuexModule } from '~/@types/vuex';
import { Menus } from '~/test/testMenuSidebar';

@Module({
    name: 'global',
    namespaced: true,
    stateFactory: true,
})
export default class GlobalModule extends VuexModule implements HttpVuexModule {
    public store?: Store<any>;

    /** Dark Or Light Mode */
    public theme:string = 'light';
    /** Right to Left Direction Write Mode */
    public rightToLeftActive:boolean = false;
    /** Menu Sidebar Toggle */
    public toggleMenuActive:boolean =  false;
    /** Chat Sidebar Toggle */
    public toggleChatActive:boolean =  false;
    /** Theme Setting Toggle */
    public toggleThemeSettingActive:boolean =  false;
    /** Sticky Note Toggle */
    public toggleStickyNoteActive:boolean =  false;
    /** Off Canvas */
    public toggleOffcanvasActive:boolean =  false;

    /** Sidebar Menu */
    public menu:SidebarMenu = Menus;

    /** Sticky Note */
    public notes:StickyNotes = [];

    @Mutation
    private setTheme( theme = 'light') {
        this.theme = theme;
    }

    @Mutation
    private setSidebarMenu(menu:SidebarMenu) {
        this.menu = menu;
    }

    @Mutation
    private setRightToLeftActive( isActive:boolean) {
        this.rightToLeftActive = isActive;
    }

    @Mutation
    private setToggleMenuActive( isActive:boolean) {
        this.toggleMenuActive = isActive;
    }

    @Mutation
    private setToggleChatActive( isActive:boolean) {
        this.toggleChatActive = isActive;
    }

    @Mutation
    private setToggleThemeSettingActive( isActive:boolean) {
        this.toggleThemeSettingActive = isActive;
    }

    @Mutation
    private setToggleStickyNoteActive( isActive:boolean) {
        this.toggleStickyNoteActive = isActive;
    }

    @Mutation
    private setToggleOffcanvasActive( isActive:boolean) {
        this.toggleOffcanvasActive = isActive;
    }
}