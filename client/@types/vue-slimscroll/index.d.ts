declare module 'vue-slimscroll' {
    import jQuery from 'jquery';
    import Vue, { VueConstructor } from 'vue';

    export type SlimScrollOptions = {
        /**
         * width in pixels of the visible scroll area
         * @default auto
         */
        width?: string,

        /**
         * height in pixels of the visible scroll area
         * @default 250px
         */
        height?: string,

        /**
         * width in pixels of the scrollbar and rail
         * @default 7px
         */
        size?: string,

        /**
         * scrollbar color, accepts any hex/color value
         * @default #000
         */
        color?: string,

        /**
         * scrollbar position - left/right
         * @default right
         */
        position?: 'left' | 'right',

        /**
         * distance in pixels between the side edge and the scrollbar
         * @default 1px
         */
        distance?: string,

        /**
         * default scroll position on load - top / bottom / $('selector')
         * @default top
         */
        start?: 'top' | 'bottom' | typeof jQuery,

        /**
         * sets scrollbar opacity
         * @default 0.4
         */
        opacity?: number,

        /**
         * enables always-on mode for the scrollbar
         * @default false
         */
        alwaysVisible?: boolean,

        /**
         * check if we should hide the scrollbar when user is hovering over
         * @default false
         */
        disableFadeOut?: boolean,

        /**
         * sets visibility of the rail
         * @default false
         */
        railVisible?: boolean,

        /**
         * sets rail color
         * @default #333
         */
        railColor?: string,

        /**
         * sets rail opacity
         * @default 0.2
         */
        railOpacity?: number,

        /**
         * whether  we should use jQuery UI Draggable to enable bar dragging
         * @default true,
         */
        railDraggable?: boolean,

        /**
         * defautlt CSS class of the slimscroll rail
         * @default slimScrollRail
         */
        railClass?: string,

        /**
         * defautlt CSS class of the slimscroll bar
         * @default slimScrollBar
         */
        barClass?: string,

        /**
         * defautlt CSS class of the slimscroll wrapper
         * @default slimScrollDiv
         */
        wrapperClass?: string,

        /**
         * check if mousewheel should scroll the window if we reach top/bottom
         * @default false
         */
        allowPageScroll?: boolean,

        /**
         * scroll amount applied to each mouse wheel step
         * @default 20
         */
        wheelStep?: number,

        /**
         * scroll amount applied when user is using gestures
         * @default 200
         */
        touchScrollStep?: number,

        /**
         * sets border radius
         * @default 7px
         */
        borderRadius?: string,

        /**
         * sets border radius of the rail
         * @default 7px
         */
        railBorderRadius?: string;
    }

    export function install(Vue: VueConstructor<Vue>):void;


    export class SlimScroll {

        constructor(element: Element, options: SlimScrollOptions);

    }

}