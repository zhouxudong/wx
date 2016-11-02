
export const showView = (view="",belongto,option)=> {
    return {
        type: "SHOW_VIEW",
        view,
        belongto,
        option
    }
}