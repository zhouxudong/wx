export const showModal = (modalEl=(<div></div>),handleSubmit,title) => {
    return {
        type: "SHOW_MODAL",
        modalEl,
        handleSubmit,
        title
    }
}
export const hiddenModal = () => {
    return {
        type: "HIDDEN_MODAL"
    }
}