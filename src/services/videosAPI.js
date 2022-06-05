import axios from "axios";

const getVideos = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/videos"
        });

        if (response.status === 200)
            return response.data;
    } catch (error) {
        console.error(error.response);
    }
}

const getCategories = async () =>{
    try {
        const response = await axios({
            method: "GET",
            url: "/api/categories"
        });
    
        if (response.status === 200) {
        console.log("category api response", response.data);
            return response.data;}
      } catch (error) {
        console.error(error.response);
      } 
}

export { getVideos, getCategories };