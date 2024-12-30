import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [IsLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const initialState = {
    cities: [],
    IsLoading: false,
    currentCity: {},
    error: "",
  };
  const [{ cities, IsLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          IsLoading: true,
        };
      case "cities/loaded":
        return { ...state, IsLoading: false, cities: action.payload };
      case "cities/created":
        return {
          ...state,
          IsLoading: false,
          cities: [...state.cities, action.payload],
        };
      case "city/deleted":
        return {
          ...state,
          IsLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };
      case "error":
      case "currentCity/loaded":
        return { ...state, IsLoading: false, currentCity: action.payload };
      case "rejected":
        return { ...state, IsLoading: false, error: action.payload };
      default:
    }
  }

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // console.log(data);
      } catch (error) {
        dispatch({ type: "rejected", payload: "there is an error" });
      }
    }
    fetchData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "currentCity/loaded", payload: data });
        // console.log(data);
      } catch (error) {
        dispatch({ type: "rejected", payload: "there is an error" });
      }
    },
    []
  );
  async function CreateCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "cities/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch (error) {
      dispatch({ type: "rejected", payload: "there is an error" });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setCities(cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "there is an error" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        IsLoading,
        currentCity,
        getCity,
        CreateCity,

        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("you are using the cities context out of his scope");
  }
  return context;
}
export { CitiesProvider, useCities };
