import ListContent from "../components/ListContent";

function Jewelry() {
    const filter = { category : "jewelery" }

    return (
        <ListContent filter={filter} />
    )
}

export default Jewelry;