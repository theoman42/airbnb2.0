import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editOwnerSpot } from "../../store/spots";

const SpotsForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    let newSpot = await dispatch(editOwnerSpot(payload, props.id)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    if (newSpot) {
      history.push(`/spots/${newSpot.id}`);
      props.onClose();
    }
  };

  return (
    <div>
      <form className="form-wrapper" onSubmit={handleSubmit}></form>
      <input
        type="text"
        placeholder="Address"
        required
        value={address}
        onChange={updateAddress}
      />
      <input
        type="text"
        placeholder="City"
        required
        value={city}
        onChange={updateCity}
      />
      <input
        type="text"
        placeholder="State"
        required
        value={state}
        onChange={updateState}
      />
      <input
        type="text"
        placeholder="Country"
        required
        value={country}
        onChange={updateCountry}
      />
      <input
        type="number"
        placeholder="Latitude"
        required
        value={lat}
        onChange={updateLat}
      />
      <input
        type="number"
        placeholder="Longitude"
        required
        value={lng}
        onChange={updateLng}
      />
      <input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={updateName}
      />
      <input
        type="text"
        placeholder="Description"
        required
        value={description}
        onChange={updateDescription}
      />
      <input
        type="number"
        placeholder="Price"
        required
        value={price}
        onChange={updatePrice}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit Form
      </button>
    </div>
  );
};

export default SpotsForm;
