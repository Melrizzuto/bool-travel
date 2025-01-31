import { Link } from "react-router-dom";
import travels from "../data/travel.js"
function TravelListPage() {
    return (
        <div>
            <div className="container">
                <h1>Lista dei viaggi</h1>
                {travels.map((viaggio) => (
                    <div key={viaggio.id}>
                        <h3><strong>{viaggio.destination}</strong></h3>
                        <p><strong>Andata</strong>{viaggio.startDate}</p>
                        <p><strong>Ritorno</strong>{viaggio.endDate}</p>
                        <p><strong>Passeggeri: </strong>{viaggio.participants.length}</p>
                        <div>
                            <Link to={`/travels/${viaggio.id}`}> {/*da cambiare per come si vogliono impostare le rotte*/}
                                <p>Dettagli</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TravelListPage;