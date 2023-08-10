import Search from "./search"
import FindWay from "./findway"
import Header from "./header"
import Detail from "./detail"
import TabName from "./tabname"

function MapComponent(){
    return(
        <div className="all__map">
            <Header/>
            <div className="main__map">
                <div id="map"/>
            </div>
            <TabName/>
            <Detail/>
            <Search/>
            <FindWay/>
        </div>
    )
}
export default MapComponent