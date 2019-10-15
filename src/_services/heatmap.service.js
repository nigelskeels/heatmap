import moment from 'moment'
moment.locale('en'); // set to english

export const heatmapService = {
    readfile
};

function readfile(){
    return fetch('./evezy-transactions.json').then(handleResponse); 
}


//--------------------------------------------------

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}