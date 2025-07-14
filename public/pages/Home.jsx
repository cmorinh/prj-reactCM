import Carousel from '../components/Carousel';
import ListContent from '../components/ListContent';
import ListOffers from '../components/ListOffers';
import Seo from "../components/Seo";

function Home() {
    const filterFashion = { category: "clothing", top: 4 }
    const filterElectronic = { category: "electronics", top: 4 }
    const filterOffers = { category: '', top: 4 }

    return (	
        <>
            <Seo title="Store - Home" />
            <Carousel />
            <h3 className='text-center my-4 fw-bold'>Man & Women Fashion</h3>
            <ListContent filter={filterFashion} />
            <h3 className='text-center my-4 fw-bold'>Electronics</h3>
            <ListContent filter={filterElectronic} />
            <h3 className='text-center my-4 fw-bold'>Special offers - 50% discount</h3>
            <ListOffers filter={filterOffers} />
        </>
    )
}

export default Home;