import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSpot } from "../../store/spots";

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

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = (e) => {
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

    return dispatch(addSpot(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
      if (newSpot) {
        history.push(`/spot/${newSpot.id}`);
      }
    });
  };

  return (
    <div>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={updateAddress}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={updateCity}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={updateState}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
          required
        />
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={updateLat}
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={updateLng}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={updatePrice}
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default SpotsForm;
