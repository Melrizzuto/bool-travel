import { useParams } from 'react-router-dom';
import Searchbar from '../components/SearchBar';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function TravelDetailsPage() {
    const { search, travelsState } = useContext(GlobalContext);
    const { id } = useParams();

    const travel = travelsState.find((travel) => travel.id === parseInt(id));
    console.log(travelsState)
    if (!travel) {
        return <h2>Travel not found</h2>;
    }
    
    const filteredData = travel.participants.filter(participant =>
        participant.firstName.toLowerCase().includes(search.toLowerCase()) ||
        participant.lastName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className='searchbar'><Searchbar data={travelsState} /></div>

            <div className="myContainer travel-details">


                {/* Immagine di placeholder */}
                {search === "" && (
                    <div className="image-container debug">
                        <img
                            src="../placeholder.svg"
                            alt="Viaggio"
                            className="image-placeholder"
                        />
                    </div>
                )}

                <div className='container-details debug'>
                    <h1 className='text-center'>{travel.destination}</h1>
                    <div className='text-center text-secondary'>
                        <span className='mx-4'><strong>Start Date:</strong> {travel.startDate}</span>
                        <span><strong>End Date:</strong> {travel.endDate}</span>
                    </div>

                    {search === ""
                        ? travel.participants.map((participant) => (
                            <div key={participant.id} className="accordion" id={`accordion-${participant.id}`}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={`heading-${participant.id}`}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${participant.id}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse-${participant.id}`}
                                        >
                                            {participant.firstName} {participant.lastName}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse-${participant.id}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading-${participant.id}`}
                                        data-bs-parent={`#accordion-${participant.id}`}
                                    >
                                        <div className="accordion-body">
                                            <div className="participant-info">
                                                <span><strong>Email:</strong> {participant.email}</span>
                                                <span><strong>Tax Code:</strong> {participant.taxCode}</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        : filteredData.length > 0 ? (
                            filteredData.map((participant) => (
                                <div key={participant.id} className="accordion" id={`accordion-${participant.id}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`heading-${participant.id}`}>
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-${participant.id}`}
                                                aria-expanded="true"
                                                aria-controls={`collapse-${participant.id}`}
                                            >
                                                {participant.firstName} {participant.lastName}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse-${participant.id}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading-${participant.id}`}
                                            data-bs-parent={`#accordion-${participant.id}`}
                                        >

                                            {participant.firstName} {participant.lastName}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse-${participant.id}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading-${participant.id}`}
                                        data-bs-parent={`#accordion-${participant.id}`}
                                    >
                                        <div className="accordion-body">
                                            <div className="participant-info">
                                                <span><strong>Email:</strong> {participant.email}</span>
                                                <span><strong>Tax Code:</strong> {participant.taxCode}</span>
                                                {/* <span><strong>Phone:</strong> {participant.phone}</span> */}

                                            <div className="accordion-body">
                                                <div className="participant-info">
                                                    <span><strong>Email:</strong> {participant.email}</span>
                                                    <span><strong>Tax Code:</strong> {participant.taxCode}</span>
                                                    <span><strong>Phone:</strong> {participant.phone}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No participants found matching your search.</p>
                        )
                    }
                </div>
                <Link to="/" className="button back-button">
                    Go to back
                </Link>
            </div>
        </>
    );
}

export default TravelDetailsPage;
