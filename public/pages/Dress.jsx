import ListContent from "../components/ListContent";
import Seo from "../components/Seo";

function Dress() {
    const filter = { category : "clothing" }

    return (
        <>
             <Seo title="Store - Fashion" />
             <ListContent filter={filter} />
        </>       
    )
}

export default Dress;