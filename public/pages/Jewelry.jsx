import ListContent from "../components/ListContent";
import Seo from "../components/Seo";

function Jewelry() {
    const filter = { category : "jewelery" }

    return (
        <>
            <Seo title="Store - Jewelry" />
            <ListContent filter={filter} />
        </>        
    )
}

export default Jewelry;