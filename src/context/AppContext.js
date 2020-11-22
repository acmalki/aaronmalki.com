import React, {createContext, useContext} from "react"
import useBlogPosts from "./useBlogPost";
import useProvideAuth from "./use-auth";
import usePages from "./usePages";

const AppContext = createContext();


// PlaceId Finder: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
const initial = {
    isAdmin: false,
    companyName: 'Malki Real Estate',
    license: '02128632',
    address: {
        line1: "3222 25th Street",
        line2: "San Francisco, CA 94110",
        position:
            {
                lat: 37.751161,
                lng: -122.414495,
                place_id: "ChIJ6wUPakZ-j4AR1i8kOrVZqUk"
            }
    },
    phoneNumber: {
        dash: "(909) 771-6881",
        dot: "909.771.6881",
        tel: "+19097716881",
        all_dash: "909-771-6881"
    },
    email: "acmalki19@gmail.com",
    socialMedia: {
        instagram: "https://www.instagram.com/aaron.malki/",
        linkedin: "https://www.linkedin.com/in/aaron-malki-761b3165/",
        facebook: "https://www.facebook.com/aaron.malki/"
    }
};


const AppContextProvider = ({children}) => {

    const pages= usePages();
    const blogs = useBlogPosts();
    const auth = useProvideAuth();
    return <AppContext.Provider value={{ ...blogs, auth,...pages}}>{children}</AppContext.Provider>
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAdminAuth = () => {
    const {adminAuth} = useContext(AppContext);
    return adminAuth;
};


export {
    AppContext,
    AppContextProvider
}