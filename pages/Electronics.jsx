import ListContent from "../components/ListContent";

function Electronics() {
    const filter = { category : "electronics" }

    return (
        <ListContent filter={filter} />
    )
}

export default Electronics;