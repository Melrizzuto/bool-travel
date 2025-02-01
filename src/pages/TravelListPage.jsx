import { Link } from "react-router-dom";
import FormNewTrip from "../components/FormNewTrip.jsx";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";

function TravelListPage() {
    const{travelsState} = useContext(GlobalContext);

    return (
        <div className="myContainer">

            {/* Immagine */}
            <div className="image-container debug">
                <img
                    src="../illustration.jpg"
                    alt="Viaggio"
                    className="illustration"
                />
            </div>
            <div className="container-details">
                <h1 className="text-center my-5">Planned Trips</h1>
                {travelsState.map((travel) => (
                    <div key={travel.id} className="card mb-3" style={{ maxWidth: "100%" }}>
                        <div className="d-flex row g-0">
                            <div className="col-md-12">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    {/* Card title */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="card-title"><strong>{travel.destination}</strong></h3>
                                    </div>
                                    {/* Date and participants */}
                                    <div className="d-flex justify-content-between mb-3">
                                        <p className="card-text py-4"><strong>Start Date:</strong> {travel.startDate}</p>
                                        <p className="card-text py-4"><strong>End Date:</strong> {travel.endDate}</p>
                                        <p className="card-text py-4"><strong>Participants:</strong> {travel.participants.length}</p>
                                        {/* Discover more link */}
                                        <div className="text-end">
                                            <Link
                                                to={`${travel.id}`}
                                                className="myBtn small-button"
                                            >
                                                Discover more
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <FormNewTrip />
        </div>
    );
}

export default TravelListPage;

