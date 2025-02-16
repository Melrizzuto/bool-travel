import { useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function FormNewTrip() {
    const { travelsState, setTravelsState } = useContext(GlobalContext);
    const [numIDParticipant, setNumIDParticipant] = useState(0);
    const [isFormValid, setIsFormValid] = useState(true);
    const [errors, setErrors] = useState(false);

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
            number: "",
            taxCode: "",
        }]
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

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
                number: "",
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
            number: "",
            taxCode: ""
        };
        console.log('Aggiunto nuovo partecipante:', newParticipant);
        setFormData(prevData => ({
            ...prevData,
            participants: [...prevData.participants, newParticipant]
        }));
    };

    function validateForm() {
        let tripErrors = false;
        let participantErrors = false;

        if (!formData.destination || !formData.startDate || !formData.endDate) {
            tripErrors = true;
        }

        if (isNaN(new Date(formData.startDate)) || isNaN(new Date(formData.endDate))) {
            tripErrors = true;
        }

        if (formData.startDate.length !== 10 || formData.endDate.length !== 10) {
            tripErrors = true;
        }

        if (tripErrors) {
            setErrors("Please fix the trip details before proceeding.");
            setIsFormValid(false);
            return false;
        }

        formData.participants.forEach((participant) => {
            if (!participant.firstName || !participant.lastName || !participant.email || !participant.taxCode) {
                participantErrors = true;
            }
            if (participant.taxCode.length !== 16) {
                participantErrors = true;
            }
        });

        if (participantErrors && tripErrors === false) {
            setErrors("Please fix the participant details before proceeding.");
            setIsFormValid(false);
            return;
        }

        setIsFormValid(true);
        return true;
    }

    return (
        <>
            <form className="container-details my-5" onSubmit={handleFormSubmit}>
                <div className="text-center"><h2>Add new trip</h2></div>

                <div className="row">
                    <h3>Trip info</h3>
                    <div className="form-group col-4">
                        <label htmlFor="destination">New trip location</label>
                        <input
                            type="text"
                            className="form-control"
                            id="destination"
                            name="destination"
                            placeholder="Enter trip name"
                            value={formData.destination}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="startDate">Start date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            placeholder="Enter trip start date"
                            value={formData.startDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="endDate">End date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="endDate"
                            name="endDate"
                            placeholder="Enter trip end date"
                            value={formData.endDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <h3>Participant info</h3>
                    {formData.participants.map((participant, index) => (
                        <div key={index} className="row">
                            <div className="form-group col-2">
                                <label htmlFor={`firstName_${index}`}>First Name</label>
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
                                    placeholder="Enter first Name"
                                />
                            </div>

                            <div className="form-group col-2">
                                <label htmlFor={`lastName_${index}`}>Last Name</label>
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
                                    placeholder="Enter last Name"
                                />
                            </div>

                            <div className="form-group col-2">
                                <label htmlFor={`email_${index}`}>Email</label>
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
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group col-2">
                                <label htmlFor={`number_${index}`}>Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name={`number_${index}`}
                                    value={participant.number}
                                    onChange={(e) => {
                                        const updatedParticipants = [...formData.participants];
                                        updatedParticipants[index].number = e.target.value;
                                        setFormData({
                                            ...formData,
                                            participants: updatedParticipants,
                                        });
                                    }}
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                            <div className="form-group col-2">
                                <label htmlFor={`taxCode_${index}`}>Tax Code</label>
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
                                    placeholder="Enter Tax Code"
                                />
                            </div>
                        </div>
                    ))}

                </div>
                {!isFormValid && (
                    <div className="alert alert-danger mb-3">
                        <p>{errors}</p>
                    </div>
                )}

                <button type="button" className="btns btns-orange " onClick={handleAddParticipant}>Add Participant</button>
                <button type="submit" className="btns btns-green ">Submit</button>
            </form>
        </>
    );
}

export default FormNewTrip;
