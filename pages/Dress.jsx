import ListContent from "../components/ListContent";

function Dress() {
    const filter = { category : "clothing" }

    return (
       <ListContent filter={filter} />
    )
}

export default Dress;