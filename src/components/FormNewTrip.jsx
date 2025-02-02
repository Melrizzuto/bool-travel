import { useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function FormNewTrip() {
    const { travelsState, setTravelsState } = useContext(GlobalContext);
    const [numIDParticipant, setNumIDParticipant] = useState(0);

    const autoIncrementTripID = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) return 1;

        const maxID = Math.max(...arr.map(travel => Number(travel.id) || 0));
        return maxID + 1;
    };

    const autoIncrementPartID = (arr, n) => {
        if (!Array.isArray(arr)) return 1;
        let currentPart = arr.flatMap(travel => travel.participants);
        if (currentPart.length === 0) return 1;
        return Math.max(...currentPart.map(participant => participant.id)) + 1 + n;
    };

    const [formData, setFormData] = useState({
        id: autoIncrementTripID(travelsState),
        destination: "",
        startDate: "",
        endDate: "",
        participants: [{
            id: autoIncrementPartID(travelsState),
            firstName: "",
            lastName: "",
            email: "",
            taxCode: "",
        }]
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setTravelsState([...travelsState, formData]);

        setFormData({
            id: autoIncrementTripID(travelsState),
            destination: "",
            startDate: "",
            endDate: "",
            participants: [{
                id: autoIncrementPartID(travelsState),
                firstName: "",
                lastName: "",
                email: "",
                taxCode: "",
            }]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddParticipant = () => {
        setNumIDParticipant((prevID) => prevID + 1);
        const newParticipant = {
            id: autoIncrementPartID(travelsState, numIDParticipant),
            firstName: "",
            lastName: "",
            email: "",
            taxCode: ""
        };
        console.log('Aggiunto nuovo partecipante:', newParticipant);
        setFormData(prevData => ({
            ...prevData,
            participants: [...prevData.participants, newParticipant]
        }));
    };

    return (
        <form className="container-details my-5" onSubmit={handleFormSubmit}>
            <div className="row">
                <h2>New Trip info</h2>
                <div className="form-group col-4">
                    <label htmlFor="destination">Enter new trip location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destination"
                        name="destination"
                        placeholder="Enter trip name..."
                        value={formData.destination}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="startDate">Enter start date trip</label>
                    <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        placeholder="Enter trip start date..."
                        value={formData.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="endDate">Enter start date trip</label>
                    <input
                        type="text"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        placeholder="Enter trip end date..."
                        value={formData.endDate}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div>
                <h3>Add Participants</h3>
                {formData.participants.map((participant, index) => (
                    <div key={index} className="row">
                        <div className="form-group col-3">
                            <label htmlFor={`firstName_${index}`}>Enter First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name={`firstName_${index}`}
                                value={participant.firstName}
                                onChange={(e) => {
                                    const updatedParticipants = [...formData.participants];
                                    updatedParticipants[index].firstName = e.target.value;
                                    setFormData({
                                        ...formData,
                                        participants: updatedParticipants,
                                    });
                                }}
                                placeholder="First Name"
                            />
                        </div>

                        <div className="form-group col-3">
                            <label htmlFor={`lastName_${index}`}>Enter Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name={`lastName_${index}`}
                                value={participant.lastName}
                                onChange={(e) => {
                                    const updatedParticipants = [...formData.participants];
                                    updatedParticipants[index].lastName = e.target.value;
                                    setFormData({
                                        ...formData,
                                        participants: updatedParticipants,
                                    });
                                }}
                                placeholder="Last Name"
                            />
                        </div>

                        <div className="form-group col-3">
                            <label htmlFor={`email_${index}`}>Enter Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name={`email_${index}`}
                                value={participant.email}
                                onChange={(e) => {
                                    const updatedParticipants = [...formData.participants];
                                    updatedParticipants[index].email = e.target.value;
                                    setFormData({
                                        ...formData,
                                        participants: updatedParticipants,
                                    });
                                }}
                                placeholder="Email"
                            />
                        </div>

                        <div className="form-group col-3">
                            <label htmlFor={`taxCode_${index}`}>Enter Tax Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name={`taxCode_${index}`}
                                value={participant.taxCode}
                                onChange={(e) => {
                                    const updatedParticipants = [...formData.participants];
                                    updatedParticipants[index].taxCode = e.target.value;
                                    setFormData({
                                        ...formData,
                                        participants: updatedParticipants,
                                    });
                                }}
                                placeholder="Tax Code"
                            />
                        </div>
                    </div>
                ))}

            </div>

            <button type="button" className="btn btn-warning" onClick={handleAddParticipant}>Add Participant</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default FormNewTrip;
