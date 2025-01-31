import { useState } from 'react';
import { useParams } from 'react-router-dom';

import travels from '../data/travel';
import Searchbar from '../components/SearchBar';

import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';


function TravelDetailsPage() {

    const { search } = useContext(GlobalContext);
    const { id } = useParams();
    const [isVisible, setIsVisible] = useState({});

    const travel = travels.find((travel) => travel.id === parseInt(id));

    if (!travel) {
        return <h2>Viaggio non trovato</h2>;
    }

    const toggleDetails = (participantId) => {
        setIsVisible(prevState => ({
            ...prevState,
            [participantId]: !prevState[participantId]
        }));
    }

    const filteredData = travel.participants.filter(participant =>
        participant.firstName.toLowerCase().includes(search.toLowerCase()) ||
        participant.lastName.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            <Searchbar data={travels}/>
            <h1>Partecipa alla gita a {travel.destination}</h1>
            {search == "" ? travel.participants.map((participant) => (
                <div key={participant.id}>
                    <h3>{participant.firstName} {participant.lastName}</h3>
                    <button onClick={() => toggleDetails(participant.id)}>
                        {isVisible[participant.id] ? '▼' : '▲'}
                    </button>
                    {isVisible[participant.id] && (
                        <div>
                            <h4>Email: {participant.email}</h4>
                            <h4>Codice Fiscale: {participant.taxCode}</h4>
                        </div>
                    )}
                </div>
            ))
                :
                filteredData.map((participant) => (
                    <div key={participant.id}>
                        <h3>{participant.firstName} {participant.lastName}</h3>
                        <button onClick={() => toggleDetails(participant.id)}>
                            {isVisible[participant.id] ? '▼' : '▲'}
                        </button>
                        {isVisible[participant.id] && (
                            <div>
                                <h4>Email: {participant.email}</h4>
                                <h4>Codice Fiscale: {participant.taxCode}</h4>
                            </div>
                        )}
                    </div>
                ))
            }
        </>
    );
}

export default TravelDetailsPage;