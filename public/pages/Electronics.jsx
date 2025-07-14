import ListContent from "../components/ListContent";
import Seo from "../components/Seo";

function Electronics() {
    const filter = { category : "electronics" }

    return (
        <>
            <Seo title="Store - Electronics" />
            <ListContent filter={filter} />
        </>        
    )
}

export default Electronics;