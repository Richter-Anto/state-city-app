import { useEffect, useState } from "react";
import "./App.css";
import axiosRequest from "./api/axiosRequest";
import { Select, Button } from "antd";

function App() {
  let [states, setStates] = useState([]);
  let [AllstatesData, setAllstatesData] = useState([]);
  let [selectedState, setselectedState] = useState("");
  let [cities, setcities] = useState([]);
  let [selectedCity, setselectedCity] = useState("");
  let [isSubmit, setisSubmit] = useState(false);

  useEffect(() => {
    get_states();
  }, []);

  //get states
  let get_states = async () => {
    setisSubmit(false);
    let res = await axiosRequest.get("api/v1/states");
    setAllstatesData(res?.data);
    console.log("all states", res.data);

    let allStates = [];
    allStates = res?.data?.map(item => {
      return {
        value: item?.stateName,
        label: item?.stateName,
      };
    });
    console.log(allStates);
    setStates(allStates);
  };

  //get cities
  let onChangeState = async e => {
    setisSubmit(false);
    setselectedState(e);

    let stateId;
    AllstatesData.map(item => {
      if (item?.stateName == e) {
        stateId = item?.stateId;
      }
    });
    console.log(stateId);

    let res = await axiosRequest.get(`api/v1/states/cities/${stateId}`);
    console.log("all states", res.data);

    let allcities = [];
    allcities = res?.data?.map(item => {
      return {
        value: item?.cityName,
        label: item?.cityName,
      };
    });
    setcities(allcities);
  };

  //on submit
  let onSubmit = () => {
    if (selectedCity && selectedState) {
      setisSubmit(true);
    } else {
      window.alert("please select both city and state");
    }
    console.log(selectedState, selectedCity);
  };

  return (
    <div className="App">
      <Select
        style={{
          width: 200,
          marginRight: 50,
        }}
        allowClear
        options={states}
        onChange={onChangeState}
        placeholder={"Select Your State"}
      />
      <Select
        style={{
          width: 200,
          marginRight: 50,
        }}
        allowClear
        options={cities}
        onChange={e => {
          setisSubmit(false);
          setselectedCity(e);
        }}
        placeholder={"Select Your city"}
      />
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>

      {/* display component */}
      {isSubmit ? (
        <h1 className="result">
          You Have selected {selectedCity}, {selectedState}
        </h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
