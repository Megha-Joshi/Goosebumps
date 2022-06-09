import { createContext, useContext, useReducer } from "react";
import { useVideo } from "./videoContext";

const FilterContext = createContext();

const FilterProvider = ({children}) =>{
    const { videoState } = useVideo();
    const { videos } = videoState;

    const filterReducerFun = (filterState, action) => {
        switch(action.type){
            case "CATEGORY":
                return{
                    ...filterState,
                    filterByCategory: action.payload,
                }

            case "CLEAR_FILTER":
                return{
                    ...filterState,
                    filterByCategory: "",
                    allVideos: filterState.allVideos,
                }
        }
    }

    const [ filterState, filterDispatch ] = useReducer(filterReducerFun, {
        filterByCategory: "",
        allVideos: [...videos]
    });

    const categoryFilter = (videos, filterOnCategory) => {
        if(videos!== [] || videos!== "undefined"){
            const showVideos = [...videos];
            if(filterOnCategory !== ""){
                const filterArr = showVideos.filter((item) => item.category === filterOnCategory)
                return filterArr;
            }
            return showVideos;
        }
    }

    const filteredVideos = (videos, filterState) => {
        const { filterByCategory } = filterState;
        console.log(filterByCategory);
        const filterCat = categoryFilter(videos, filterByCategory);
        return filterCat;
    }

    return(<FilterContext.Provider value={{filterState, filterDispatch, filteredVideos}}>{children}</FilterContext.Provider>)
}

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };