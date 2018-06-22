// Actions
const UPDATE_URL = "UPDATE_URL:";

const SORT_RATING = "SORT_RATING";
const SORT_DOWNLOAD_COUNT = "SORT_DOWNLOAD_COUNT";
const SORT_SEEDS = "SORT_SEEDS";

// Action Creators
function updateURL() {
    return {
        type: UPDATE_URL
    };
}

function sortSeeds () {
    return {
        type: SORT_RATING
    }
}

function sortDownloadCount () {
    console.log('test');
    return {
        type:SORT_DOWNLOAD_COUNT
    }
}
function sortRating () {
    return {
        type:SORT_SEEDS
    }
}


// Reducer
const initialState = {
    fetchURL: 'https://yts.am/api/v2/list_movies.json?sort_by=rating'
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case SORT_RATING:
            return applyRating (state, action);
        case SORT_DOWNLOAD_COUNT:
            return applyDownloadCount (state, action);
        case SORT_SEEDS:
            return applySeeds (state, action);
        default:
            return state;
    }
}

// Reducer Functions
function applyRating(state, action) {
    return {
        ...state,
        fetchURL: 'https://yts.am/api/v2/list_movies.json?sort_by=rating',
    };
}

function applyDownloadCount(state, action) {
    return {
        ...state,
        fetchURL: 'https://yts.am/api/v2/list_movies.json?sort_by=download_count',
    };
}

function applySeeds(state, action) {
    return {
        ...state,
        fetchURL: 'https://yts.am/api/v2/list_movies.json?sort_by=seds',
    };
}

// Exports
const actionCreators = {
    sortSeeds,
    sortDownloadCount,
    sortRating
};

export {actionCreators};

// Default

export default reducer;