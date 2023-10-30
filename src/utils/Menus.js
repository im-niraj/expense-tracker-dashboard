const menu = [
    {
        path: "/",
        name: "Home",
        isSubMenu: false,
        onlyAdmin: false,
        subMenu: [],
    },
    {
        path: "/user",
        name: "User",
        isSubMenu: false,
        onlyAdmin: true,
        subMenu: [],
    },
    {
        path: "/setting",
        name: "Setting",
        isSubMenu: false,
        onlyAdmin: true,
        subMenu: [],
    },
    // {
    //     name: "Setting",
    //     isSubMenu: true,
    //     onlyAdmin: false,
    //     subMenu: [
    //         {
    //             onlyAdmin: false,
    //             path: "/main-setting",
    //             name: "Main Setting",
    //         },
    //         {
    //             onlyAdmin: true,
    //             path: "/contact-setting",
    //             name: "Contact Setting",
    //         },
    //         {
    //             onlyAdmin: true,
    //             path: "/slider-image",
    //             name: "Slider Image",
    //         },
    //     ],
    // },
];

export default menu;
